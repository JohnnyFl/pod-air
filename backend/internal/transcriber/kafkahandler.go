package transcriber

import (
	"context"
	"encoding/json"

	"strings"

	"github.com/johnnyfl/pod-pilot/pkg"
	"github.com/johnnyfl/pod-pilot/tools"
	"github.com/segmentio/kafka-go"
	"go.uber.org/zap"
)

type KafkaHandler struct {
	cfg                   Config
	svc                   *Service
	uploadCompletedReader *kafka.Reader
	// videoTranscribedReader *kafka.Reader
	transcribedWriter *kafka.Writer
	logger            *zap.Logger
}

func NewKafkaHandler(cfg Config, svc *Service, logger *zap.Logger) *KafkaHandler {
	uploadReader := kafka.NewReader(kafka.ReaderConfig{
		Brokers:     strings.Split(cfg.KafkaHosts, ","),
		Topic:       tools.FileUploadedTopic,
		MaxBytes:    10e6, // 10MB
		StartOffset: kafka.FirstOffset,
	})

	// transcribedReader := kafka.NewReader(kafka.ReaderConfig{
	// 	Brokers:     strings.Split(cfg.KafkaHosts, ","),
	// 	Topic:       tools.VideoTransribedTopic,
	// 	MaxBytes:    10e6, // 10MB
	// 	StartOffset: kafka.LastOffset,
	// })

	// transcribedWriter := kafka.NewWriter(kafka.WriterConfig{
	// 	Brokers:  strings.Split(cfg.KafkaHosts, ","),
	// 	Topic:    tools.VideoTransribedTopic,
	// 	Balancer: &kafka.LeastBytes{},
	// })

	transcribedWriter := &kafka.Writer{
		Addr:                   kafka.TCP(strings.Split(cfg.KafkaHosts, ",")...), // Specify the broker addresses
		Topic:                  tools.VideoTransribedTopic,
		AllowAutoTopicCreation: true,
		Balancer:               &kafka.LeastBytes{}, // Load Balancer (LeastBytes in this case)
		// You can optionally set other fields as needed:
		// WriteTimeout: 10 * time.Second, // Optional: Set timeout for writing messages
		// BatchTimeout: 1 * time.Second,  // Optional: How long to wait before sending messages
		// MaxAttempts:  3,               // Optional: How many retry attempts
	}
	return &KafkaHandler{
		cfg:                   cfg,
		svc:                   svc,
		uploadCompletedReader: uploadReader,
		// videoTranscribedReader: transcribedReader,
		transcribedWriter: transcribedWriter,
		logger:            logger,
	}
}

func (c *KafkaHandler) Close() {
	c.logger.Info("Closing Kafka readers...")
	if err := c.uploadCompletedReader.Close(); err != nil {
		c.logger.Error("Failed to close upload completed reader", zap.Error(err))
	}
	// if err := c.videoTranscribedReader.Close(); err != nil {
	// 	c.logger.Error("Failed to close video transcribed reader", zap.Error(err))
	// }
	if err := c.transcribedWriter.Close(); err != nil {
		c.logger.Error("Failed to close transcribed writer", zap.Error(err))
	}
	// Close writers here if managed centrally
	c.logger.Info("Kafka readers closed.")
}

func (c *KafkaHandler) HandleUploadCompleted() {
	reader := c.uploadCompletedReader

	for {
		message, err := reader.ReadMessage(context.Background())
		if err != nil {
			c.logger.Error("failed to read message", zap.Error(err))
			break

		}

		uploadEventData := pkg.UploadCompleteData{}
		err = json.Unmarshal(message.Value, &uploadEventData)
		if err != nil {
			c.logger.Error("failed to unmarshal message", zap.Error(err))
			continue
		}

		podcastKey := uploadEventData.VideoKey
		objectName := uploadEventData.Filename

		transcriptionResultBytes, err := c.svc.Transcribe(objectName)
		if err != nil {
			c.logger.Error("failed to transcribe main", zap.Error(err))
			continue
		}

		savedData, err := c.svc.SavePodcastInfo(podcastKey, transcriptionResultBytes)
		if err != nil {
			c.logger.Error("failed to save podcast info", zap.Error(err))
			continue
		}

		savedDataBytes, err := json.Marshal(savedData)
		if err != nil {
			c.logger.Error("failed to marshal saved data", zap.Error(err))
			continue
		}

		videoTranscribedData := pkg.VideoTranscribedData{
			VideoKey: podcastKey,
			Data:     savedDataBytes,
		}

		videoTranscribedDataBytes, err := json.Marshal(videoTranscribedData)
		if err != nil {
			c.logger.Error("failed to marshal video transcribed data", zap.Error(err))
			continue
		}

		err = c.transcribedWriter.WriteMessages(context.Background(), kafka.Message{
			Key:   []byte(podcastKey),
			Value: videoTranscribedDataBytes,
		})

		if err != nil {
			c.logger.Error("failed to write message to FileTranscribedTopic", zap.Error(err))
			continue
		}

		c.logger.Info("Transcription completed and saved")

	}
}

// func (c *KafkaHandler) HandleVideoTranscribed() {
// 	reader := c.videoTranscribedReader
// 	for {
// 		message, err := reader.ReadMessage(context.Background())
// 		if err != nil {
// 			c.logger.Error("failed to read message", zap.Error(err))
// 			break
// 			// continue
// 		}

// 		var msg pkg.VideoTranscribedData
// 		err = json.Unmarshal(message.Value, &msg)
// 		if err != nil {
// 			c.logger.Error("failed to unmarshal message", zap.Error(err))
// 			continue
// 		}
// 		videoKey := msg.VideoKey

// 		var transcribedData pkg.TranscriptionData
// 		err = json.Unmarshal(msg.Data, &transcribedData)
// 		if err != nil {
// 			c.logger.Error("failed to unmarshal message", zap.Error(err))
// 			continue
// 		}

// 		err = c.svc.SavePodcastInfo(videoKey, transcribedData)
// 		if err != nil {
// 			c.logger.Error("failed to save podcast info", zap.Error(err))
// 			continue
// 		}

// 	}
// }
