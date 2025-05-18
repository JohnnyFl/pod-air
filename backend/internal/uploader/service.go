package uploader

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"

	"io"
	"os/exec"
	"path/filepath"

	"github.com/JohnnyFl/pod-air/pkg"
	"github.com/JohnnyFl/pod-air/tools"
	"go.uber.org/zap"
)

type Service struct {
	cfg          Config
	repo         *Repository
	kafkaHandler *KafkaHandler
	logger       *zap.Logger
}

func NewService(cfg Config, repo *Repository, kafkaHandler *KafkaHandler, logger *zap.Logger) *Service {
	return &Service{
		repo:         repo,
		cfg:          cfg,
		kafkaHandler: kafkaHandler,
		logger:       logger,
	}
}

func (s *Service) UploadByUrl(url string) error {
	cmd := exec.Command("yt-dlp", "-f", "ba", "-o", "./uploads/%(channel)s/%(title)s.%(ext)s", "--audio-format", "wav", url)
	err := cmd.Run()
	if err != nil {
		return fmt.Errorf("failed to upload by url: %w", err)
	}
	return nil
}

func (s *Service) StreamUploadByUrl(userID, url string) error {
	info, err := s.getVideoInfo(url)
	if err != nil {
		s.logger.Error("Failed to get video info", zap.Error(err))
		return fmt.Errorf("failed to get video info: %w", err)
	}
	s.logger.Debug("Podcast INFO:", zap.Any("Info", info))

	go func(info pkg.VideoInfo) {
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

		err = s.saveUsersPodcastsRelation(userID, info.ID)
		if err != nil {
			s.logger.Error("Failed to save users podcasts relation", zap.Error(err))
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

func (s *Service) performStreamToGCS(url, objectName string) error {
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

func (s *Service) getVideoInfo(url string) (pkg.VideoInfo, error) {
	s.logger.Info("Getting video info...")
	ctx := context.Background()

	cmd := exec.CommandContext(ctx, "yt-dlp",
		"--dump-json",
		"--skip-download",
		url,
	)

	var videoInfo pkg.VideoInfo

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

func (s *Service) saveChannelInfo(info pkg.VideoInfo) error {
	err := s.repo.SaveChannelInfo(info)
	if err != nil {
		return fmt.Errorf("failed to save channel info: %w", err)
	}

	return nil
}

func (s *Service) savePodcastInfo(info pkg.VideoInfo) error {
	err := s.repo.SavePodcastInfo(info)
	if err != nil {
		return fmt.Errorf("failed to save podcast info: %w", err)
	}

	return nil
}

func (s *Service) saveUsersPodcastsRelation(userID, podcastID string) error {
	err := s.repo.SaveUsersPodcastsRelation(userID, podcastID)
	if err != nil {
		return fmt.Errorf("failed to get podcast info: %w", err)
	}
	return nil
}

func (s *Service) notifyUploadComplete(videoKey, objectName string) error {
	err := s.kafkaHandler.SendFileUploaded(videoKey, objectName)
	if err != nil {
		return fmt.Errorf("failed to notify upload complete: %w", err)
	}
	s.logger.Info("Notification 'file.uploaded' sent")
	return nil
}
