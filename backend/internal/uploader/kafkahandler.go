package uploader

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/JohnnyFl/pod-air/pkg"
	"github.com/JohnnyFl/pod-air/tools"
	"github.com/segmentio/kafka-go"
	"go.uber.org/zap"
)

type KafkaHandler struct {
	cfg                Config
	fileUploadedWriter *kafka.Writer
	logger             *zap.Logger
}

func NewKafkaHandler(cfg Config, logger *zap.Logger) *KafkaHandler {
	brokers := strings.Split(cfg.KafkaHosts, ",")

	writer := &kafka.Writer{
		Addr:                   kafka.TCP(brokers...),
		Topic:                  tools.FileUploadedTopic,
		Balancer:               &kafka.LeastBytes{},
		AllowAutoTopicCreation: true,
	}
	return &KafkaHandler{
		cfg:                cfg,
		fileUploadedWriter: writer,
		logger:             logger,
	}
}

func (k *KafkaHandler) SendFileUploaded(videoKey string, objectName string) error {
	msg := pkg.UploadCompleteData{
		VideoKey: videoKey,
		Filename: objectName,
	}

	jsonBytes, err := json.Marshal(msg)
	if err != nil {
		return fmt.Errorf("failed to marshal message: %w", err)
	}

	err = k.fileUploadedWriter.WriteMessages(context.Background(),
		kafka.Message{
			// Topic: tools.FileUploadedTopic,
			Value: jsonBytes,
		},
	)

	if err != nil {
		return fmt.Errorf("failed to write messages: %w", err)
	}

	return nil
}
