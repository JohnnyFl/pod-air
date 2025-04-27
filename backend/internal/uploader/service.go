package uploader

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"

	"io"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/johnnyfl/pod-pilot/pkg"
	"github.com/johnnyfl/pod-pilot/tools"
	"github.com/segmentio/kafka-go"
	"go.uber.org/zap"
)

type UploaderService struct {
	cfg    UploaderConfig
	repo   *UploaderRepository
	logger *zap.Logger
}

func NewService(cfg UploaderConfig, repo *UploaderRepository, logger *zap.Logger) *UploaderService {
	return &UploaderService{
		repo:   repo,
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
	info, err := s.getVideoInfo(url)
	if err != nil {
		s.logger.Error("Failed to get video info", zap.Error(err))
		return fmt.Errorf("failed to get video info: %w", err)
	}

	go func(info VideoInfo) {
		err = s.saveChannelInfo(info)
		if err != nil {
			s.logger.Error("Failed to save channel info", zap.Error(err))
			return
		}

		err = s.savePodcastInfo(info)
		if err != nil {
			s.logger.Error("Failed to save podcast info", zap.Error(err))
			return
		}

		s.logger.Info("Video info saved to database")
	}(info)

	objectName := filepath.Join(info.ID + ".webm")

	err = s.performStreamToGCS(url, objectName)
	if err != nil {
		return fmt.Errorf("failed to stream to GCS: %w", err)
	}

	err = s.notifyUploadComplete(info.ID, objectName)
	if err != nil {
		return fmt.Errorf("failed to notify upload complete: %w", err)
	}

	return nil
}

func (s *UploaderService) performStreamToGCS(url, objectName string) error {
	storage, err := tools.NewGCStorage(s.logger)
	if err != nil {
		return fmt.Errorf("failed to create GCS storage: %w", err)
	}
	defer storage.Client.Close()
	ctx := context.Background()

	bucketHandler := storage.Client.Bucket(s.cfg.GCSBucketName)
	obj := bucketHandler.Object(objectName)
	gcsWriter := obj.NewWriter(ctx)

	defer gcsWriter.Close()

	cmd := exec.CommandContext(ctx, "yt-dlp",
		"-f", "ba",
		"-o", "-",
		url,
	)

	stdoutPipe, err := cmd.StdoutPipe()
	if err != nil {
		return fmt.Errorf("cmd.StdoutPipe: %w", err)
	}

	var stderrBuf bytes.Buffer
	cmd.Stderr = &stderrBuf

	if err = cmd.Start(); err != nil {
		return fmt.Errorf("failed to start yt-dlp command: %w", err)
	}

	_, err = io.Copy(gcsWriter, stdoutPipe)
	if err != nil {
		_ = cmd.Process.Kill()
		_ = cmd.Wait()
		return fmt.Errorf("io.Copy from yt-dlp stdout to GCS: %w", err)
	}

	if err = gcsWriter.Close(); err != nil {
		_ = cmd.Wait()
		return fmt.Errorf("GCS Writer.Close: %w", err)
	}

	return nil
}

func (s *UploaderService) getVideoInfo(url string) (VideoInfo, error) {
	ctx := context.Background()

	cmd := exec.CommandContext(ctx, "yt-dlp",
		"--dump-json",
		"--skip-download",
		url,
	)

	var videoInfo VideoInfo

	output, err := cmd.Output() // cmd.Output() runs the command and captures stdout
	if err != nil {
		if exitErr, ok := err.(*exec.ExitError); ok {
			return videoInfo, fmt.Errorf("yt-dlp command failed with stderr: %s: %w", string(exitErr.Stderr), err)
		}
		return videoInfo, fmt.Errorf("failed to execute yt-dlp command or capture output: %w", err)
	}

	err = json.Unmarshal(output, &videoInfo)
	if err != nil {
		return videoInfo, fmt.Errorf("failed to unmarshal video info JSON: %w", err)
	}
	s.logger.Info("Video info retrieved")
	return videoInfo, nil
}

func (s *UploaderService) saveChannelInfo(info VideoInfo) error {
	err := s.repo.SaveChannelInfo(info)
	if err != nil {
		return fmt.Errorf("failed to save channel info: %w", err)
	}

	return nil
}

func (s *UploaderService) savePodcastInfo(info VideoInfo) error {
	err := s.repo.SavePodcastInfo(info)
	if err != nil {
		return fmt.Errorf("failed to save podcast info: %w", err)
	}

	return nil
}

func (s *UploaderService) notifyUploadComplete(videoKey, objectName string) error {
	brokers := strings.Split(s.cfg.KafkaHosts, ",")

	w := &kafka.Writer{
		Addr:                   kafka.TCP(brokers...),
		AllowAutoTopicCreation: true,
		Topic:                  tools.FileUploadedTopic,
		Balancer:               &kafka.LeastBytes{},
	}

	msg := pkg.UploadCompleteData{
		VideoKey: videoKey,
		Filename: objectName,
	}

	jsonBytes, err := json.Marshal(msg)
	if err != nil {
		return fmt.Errorf("failed to marshal message: %w", err)
	}

	err = w.WriteMessages(context.Background(),
		kafka.Message{
			Value: []byte(jsonBytes),
		},
	)

	if err != nil {
		return fmt.Errorf("failed to write messages: %w", err)
	}

	defer w.Close()

	s.logger.Info("Upload complete notification sent to Kafka", zap.String("topic", "file.uploaded"), zap.Any("msg", msg))

	return nil
}
