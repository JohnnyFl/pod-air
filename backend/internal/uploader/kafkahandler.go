package uploader

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/johnnyfl/pod-pilot/pkg"
	"github.com/johnnyfl/pod-pilot/tools"
	"github.com/segmentio/kafka-go"
	"go.uber.org/zap"
)

type KafkaHandler struct {
	cfg                UploaderConfig
	fileUploadedWriter *kafka.Writer
	logger             *zap.Logger
}

func NewKafkaHandler(cfg UploaderConfig, logger *zap.Logger) *KafkaHandler {
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
			Value: []byte(jsonBytes),
		},
	)

	if err != nil {
		return fmt.Errorf("failed to write messages: %w", err)
	}

	return nil
}
