package uploader

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/google/uuid"
	"github.com/johnnyfl/pod-pilot/tools"
	"github.com/segmentio/kafka-go"
	"go.uber.org/zap"
)

type UploaderService struct {
	cfg    UploaderConfig
	logger *zap.Logger
}

func NewService(cfg UploaderConfig, logger *zap.Logger) *UploaderService {
	return &UploaderService{
		cfg:    cfg,
		logger: logger,
	}
}

func (s *UploaderService) UploadByUrl(url string) error {
	cmd := exec.Command("yt-dlp", "-f", "ba", "-o", "./uploads/%(channel)s/%(title)s.%(ext)s", "--audio-format", "wav", url)
	err := cmd.Run()
	if err != nil {
		return fmt.Errorf("failed to upload by url: %w", err)
	}
	return nil
}

func (s *UploaderService) StreamUploadByUrl(url string) error {
	s.logger.Info("Starting stream upload by URL", zap.String("url", url))

	storage, err := tools.NewGCStorage(s.logger)
	if err != nil {
		return fmt.Errorf("failed to create GCS storage: %w", err)
	}
	defer storage.Client.Close()
	ctx := context.Background()

	// Define GCS object details
	// Assuming 'ba' format often results in .m4a, adjust if needed or determine dynamically
	objectID := uuid.New().String()
	objectName := filepath.Join(objectID + ".webm")
	bucketHandler := storage.Client.Bucket(s.cfg.GCSBucketName)
	obj := bucketHandler.Object(objectName)
	gcsWriter := obj.NewWriter(ctx)
	gcsPath := fmt.Sprintf("gs://%s/%s", s.cfg.GCSBucketName, objectName)

	// Ensure writer is closed to finalize upload, even if piping fails
	defer gcsWriter.Close() // Safe to call Close multiple times

	// Command to output best audio ('ba') to standard output ('-o -')
	cmd := exec.CommandContext(ctx, "yt-dlp",
		"-f", "ba",
		"-o", "-", // Output to stdout
		url,
	)

	// Get the standard output pipe
	stdoutPipe, err := cmd.StdoutPipe()
	if err != nil {
		s.logger.Error("Failed to get stdout pipe from yt-dlp command", zap.Error(err))
		return fmt.Errorf("cmd.StdoutPipe: %w", err)
	}

	// Capture stderr separately
	var stderrBuf bytes.Buffer
	cmd.Stderr = &stderrBuf

	// --- Start Command and Stream ---
	if err = cmd.Start(); err != nil {
		return fmt.Errorf("failed to start yt-dlp command: %w", err)
	}
	s.logger.Info("Streaming data from yt-dlp to GCS...", zap.String("gcsPath", gcsPath))

	// Copy data from stdout pipe to GCS writer
	copiedBytes, err := io.Copy(gcsWriter, stdoutPipe)
	if err != nil {
		// Error during copy (network issue to GCS, pipe closed unexpectedly, etc.)
		s.logger.Error("Failed during streaming copy from yt-dlp to GCS", zap.Error(err), zap.String("gcsPath", gcsPath))
		_ = cmd.Process.Kill() // Attempt to kill the command
		_ = cmd.Wait()         // Clean up zombie process
		return fmt.Errorf("io.Copy from yt-dlp stdout to GCS: %w", err)
	}
	s.logger.Info("Finished streaming data", zap.Int64("bytesCopied", copiedBytes), zap.String("gcsPath", gcsPath))

	// --- Finalize and Check Errors ---
	// Close the GCS writer explicitly to finalize and check for errors
	if err = gcsWriter.Close(); err != nil {
		s.logger.Error("Failed to close GCS writer after copy", zap.Error(err), zap.String("gcsPath", gcsPath))
		_ = cmd.Wait() // Clean up zombie process if command finished but GCS failed
		return fmt.Errorf("GCS Writer.Close: %w", err)
	}

	if copiedBytes == 0 {
		s.logger.Warn("Successfully streamed 0 bytes. Check source URL/format.", zap.String("url", url), zap.String("gcsPath", gcsPath))
		// Depending on requirements, you might return an error here
	}

	brokers := strings.Split(s.cfg.KafkaHosts, ",")

	w := &kafka.Writer{
		Addr:                   kafka.TCP(brokers...),
		AllowAutoTopicCreation: true,
		Topic:                  "file.upload",
		Balancer:               &kafka.LeastBytes{},
	}

	err = w.WriteMessages(context.Background(),
		kafka.Message{
			Value: []byte(objectName),
		},
	)

	if err != nil {
		return fmt.Errorf("failed to write messages: %w", err)
	}

	defer w.Close()

	s.logger.Info("Stream upload completed successfully", zap.String("gcsPath", gcsPath), zap.Int64("size", copiedBytes))
	return nil
}

// func (s *UploaderService) uploadToGCS() error {
// 	storage := tools.NewGCStorage(s.logger)
// 	_ = storage.Client.Bucket(s.cfg.GCSBucketName)

// 	// bucketHandler.Object()
// 	return nil
// }
