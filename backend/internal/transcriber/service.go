package transcriber

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"os/exec"

	// "path/filepath"
	// "strings"

	// "io"
	// "net/http"

	"cloud.google.com/go/storage"
	"github.com/johnnyfl/pod-pilot/tools"
	"go.uber.org/zap"
)

type TranscriberService struct {
	cfg    TranscriberConfig
	logger *zap.Logger
}

func NewService(cfg TranscriberConfig, logger *zap.Logger) *TranscriberService {
	return &TranscriberService{
		cfg:    cfg,
		logger: logger,
	}
}

func (s *TranscriberService) Transcribe(objectID string) error {
	s.logger.Info("Starting transcribe", zap.String("filePath", objectID))
	// rc, err := s.downloadFile(objectID)
	err := s.downloadFileToLocal(objectID)
	if err != nil {
		return fmt.Errorf("failed to download file: %w", err)
	}

	localWavPath := "./uploads/test.wav"
	wavFile, err := os.Open(localWavPath)
	if err != nil {
		return fmt.Errorf("failed to open local wav file %s: %w", localWavPath, err)
	}
	defer wavFile.Close()

	req, err := createMultipartRequest(
		"http://localhost:8079/inference",
		wavFile,
		"audio.wav",
		map[string]string{
			"response_format": "verbose_json",
		},
	)
	if err != nil {
		return fmt.Errorf("failed to create multipart request: %w", err)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return fmt.Errorf("failed to transcribe in service: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("failed to read response: %w", err)
	}

	bodyString := string(body)
	fmt.Println("HELLLLLOOOO", bodyString)
	return nil

}

func (s *TranscriberService) downloadFile(objectID string) (*storage.Reader, error) {
	storage, err := tools.NewGCStorage(s.logger)
	if err != nil {
		return nil, fmt.Errorf("failed to create storage: %w", err)
	}
	bucket := storage.Client.Bucket(s.cfg.GCSBucketName)

	file := bucket.Object(objectID)
	rc, err := file.NewReader(context.Background())
	if err != nil {
		return nil, fmt.Errorf("failed to create reader: %w", err)
	}

	return rc, nil

}

func (s *TranscriberService) downloadFileToLocal(objectID string) error {
	ctx := context.Background()
	storageClient, err := tools.NewGCStorage(s.logger)
	if err != nil {
		return fmt.Errorf("failed to create storage client: %w", err)
	}

	bucket := storageClient.Client.Bucket(s.cfg.GCSBucketName)
	obj := bucket.Object(objectID)

	// Get reader for the GCS object
	rc, err := obj.NewReader(ctx)
	if err != nil {
		return fmt.Errorf("failed to create GCS reader for %s: %w", objectID, err)
	}
	defer rc.Close() // Ensure GCS reader is closed

	file, err := os.Create("./uploads/test.webm")
	if err != nil {
		return fmt.Errorf("failed to create local file: %w", err)
	}
	defer file.Close()
	// Copy the contents of the GCS object to the local file
	if _, err := io.Copy(file, rc); err != nil {
		return fmt.Errorf("failed to copy GCS object to local file: %w", err)
	}

	cmd := exec.Command("ffmpeg", "-y", "-i", "./uploads/test.webm", "-acodec", "pcm_s16le", "-ar", "16000", "-ac", "1", "./uploads/test.wav")
	s.logger.Info("Running ffmpeg command", zap.String("command", cmd.String())) // Log the command
	output, err := cmd.CombinedOutput()                                          // Capture combined stdout and stderr
	if err != nil {
		s.logger.Error("ffmpeg command failed", zap.Error(err), zap.String("output", string(output)))
		return fmt.Errorf("ffmpeg conversion failed: %w\nOutput: %s", err, string(output))
	}
	s.logger.Info("ffmpeg command successful", zap.String("output", string(output)))
	// Return the path of the temporary file
	return nil
}

func createMultipartRequest(url string, file io.Reader, filename string, fields map[string]string) (*http.Request, error) {
	var buf bytes.Buffer
	writer := multipart.NewWriter(&buf)

	part, err := writer.CreateFormFile("file", filename)
	if err != nil {
		return nil, fmt.Errorf("failed to create form file: %w", err)
	}
	if _, err := io.Copy(part, file); err != nil {
		return nil, fmt.Errorf("failed to copy file: %w", err)
	}

	for k, v := range fields {
		_ = writer.WriteField(k, v)
	}

	if err := writer.Close(); err != nil {
		return nil, fmt.Errorf("failed to close writer: %w", err)
	}

	req, err := http.NewRequest("POST", url, &buf)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}
	req.Header.Set("Content-Type", writer.FormDataContentType())
	return req, nil
}
