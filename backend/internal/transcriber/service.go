package transcriber

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"os/exec"

	"cloud.google.com/go/storage"
	"github.com/JohnnyFl/pod-air/pkg"
	"github.com/JohnnyFl/pod-air/tools"
	"go.uber.org/zap"
)

type Service struct {
	cfg    Config
	repo   *Repository
	logger *zap.Logger
}

func NewService(cfg Config, repo *Repository, logger *zap.Logger) *Service {
	return &Service{
		cfg:    cfg,
		repo:   repo,
		logger: logger,
	}
}

func (s *Service) Transcribe(objectName string) ([]byte, error) {
	s.logger.Info("Transcription started...")
	err := s.downloadFileToLocal(objectName)
	if err != nil {
		return nil, fmt.Errorf("failed to download file: %w", err)
	}

	localWavPath := "./uploads/temp.wav"
	wavFile, err := os.Open(localWavPath)
	if err != nil {
		s.logger.Error("failed to open local wav file", zap.Error(err))
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
		s.logger.Error("failed to create multipart request", zap.Error(err))
		return nil, fmt.Errorf("failed to create multipart request: %w", err)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		s.logger.Error("failed to send request", zap.Error(err))
		return nil, fmt.Errorf("failed to transcribe in service: %w", err)
	}
	defer resp.Body.Close()

	s.logger.Debug("Resp:", zap.Any("Resp:", resp))
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		s.logger.Error("failed to read response", zap.Error(err))
		return nil, fmt.Errorf("failed to read response: %w", err)
	}
	s.logger.Debug("Body:", zap.Any("Body:", body))

	// file, err := os.Create("./uploads/temp.json")
	// if err != nil {
	// 	return nil, fmt.Errorf("failed to create file: %w", err)
	// }

	// _, err = file.Write(body)
	// if err != nil {
	// 	return nil, fmt.Errorf("failed to write to file: %w", err)
	// }

	s.logger.Info("Transcription completed")

	// bodyString := string(body)
	// fmt.Println("HELLLLLOOOO", bodyString)
	return body, nil

}

// func (s *TranscriberService) SavePodcastInfo(podcastID string, data pkg.TranscriptionData) error {
// 	err := s.repo.SaveTranscription(podcastID, data)
// 	if err != nil {
// 		return fmt.Errorf("failed to save podcast info: %w", err)
// 	}
// 	s.logger.Info("Podcast info saved")
// 	return nil
// }

func (s *Service) SavePodcastInfo(podcastID string, data []byte) (pkg.TranscriptionData, error) {
	// var msg pkg.VideoTranscribedData
	var transcribedData pkg.TranscriptionData

	err := json.Unmarshal(data, &transcribedData)
	if err != nil {
		return transcribedData, fmt.Errorf("failed to unmarshal VideoTranscribedData: %w", err)
	}

	err = s.repo.SaveTranscription(podcastID, transcribedData)
	if err != nil {
		return transcribedData, fmt.Errorf("failed to save podcast info: %w", err)
	}
	s.logger.Info("Podcast info saved")
	return transcribedData, nil
}

func (s *Service) downloadFile(objectID string) (*storage.Reader, error) {
	gcStorage, err := tools.NewGCStorage(s.logger)
	if err != nil {
		return nil, fmt.Errorf("failed to create gcStorage: %w", err)
	}
	bucket := gcStorage.Client.Bucket(s.cfg.GCSBucketName)

	file := bucket.Object(objectID)
	rc, err := file.NewReader(context.Background())
	if err != nil {
		return nil, fmt.Errorf("failed to create reader: %w", err)
	}

	return rc, nil

}

func (s *Service) downloadFileToLocal(objectID string) error {
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

	file, err := os.Create("./uploads/temp.webm")
	if err != nil {
		return fmt.Errorf("failed to create local file: %w", err)
	}
	defer file.Close()
	// Copy the contents of the GCS object to the local file
	if _, err := io.Copy(file, rc); err != nil {
		return fmt.Errorf("failed to copy GCS object to local file: %w", err)
	}

	cmd := exec.Command("ffmpeg", "-y", "-i", "./uploads/temp.webm", "-acodec", "pcm_s16le", "-ar", "16000", "-ac", "1", "./uploads/temp.wav")
	output, err := cmd.CombinedOutput() // Capture combined stdout and stderr
	if err != nil {
		return fmt.Errorf("ffmpeg conversion failed: %w\nOutput: %s", err, string(output))
	}
	// s.logger.Info("FFMPEG Conversion completed")
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
