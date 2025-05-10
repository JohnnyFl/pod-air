package analyzer

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
	cfg               Config
	svc               *Service
	transcribedReader *kafka.Reader
	logger            *zap.Logger
}

func NewKafkaHandler(cfg Config, svc *Service, logger *zap.Logger) *KafkaHandler {
	// analyzerGroupID := "analyzer-group-v2"
	transcribedReader := kafka.NewReader(kafka.ReaderConfig{
		Brokers: strings.Split(cfg.KafkaHosts, ","),
		// GroupID: analyzerGroupID,
		Topic:       tools.VideoTransribedTopic,
		MaxBytes:    10e6, // 10MB
		StartOffset: kafka.LastOffset,
	})

	return &KafkaHandler{
		cfg:               cfg,
		svc:               svc,
		transcribedReader: transcribedReader,
		logger:            logger,
	}
}

func (c *KafkaHandler) HandleVideoTranscribed() {
	reader := c.transcribedReader
	for {

		message, err := reader.ReadMessage(context.Background())
		if err != nil {
			// Log the specific error from ReadMessage
			c.logger.Error("Failed to read message from Kafka",
				zap.String("topic", reader.Config().Topic),
				zap.Error(err),
			)
			break
		}

		var msg pkg.VideoTranscribedData
		err = json.Unmarshal(message.Value, &msg)
		if err != nil {
			c.logger.Error("failed to unmarshal message", zap.Error(err))
			continue
		}
		// videoKey := msg.VideoKey

		var transcribedData pkg.TranscriptionData
		err = json.Unmarshal(msg.Data, &transcribedData)
		if err != nil {
			c.logger.Error("failed to unmarshal message", zap.Error(err))
			continue
		}

		summary, err := c.svc.GenerateSummary(transcribedData.Text)
		if err != nil {
			c.logger.Error("failed to generate summary", zap.Error(err))
			continue
		}
		err = c.svc.saveSummary(msg.VideoKey, summary)
		if err != nil {
			c.logger.Error("failed to save summary", zap.Error(err))
			continue
		}
		_, err = c.svc.GenerateQuotes(msg.VideoKey)
		if err != nil {
			c.logger.Error("failed to generate quotes", zap.Error(err))
			continue
		}
		_, err = c.svc.GenerateHighlights(msg.VideoKey)
		if err != nil {
			c.logger.Error("failed to generate highlights", zap.Error(err))
			continue
		}

		c.logger.Info("Summary generated and saved") // This log might be premature if processing is commented out

	}

}
