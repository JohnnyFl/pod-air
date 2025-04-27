package transcriber

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

type TopicConsumer struct {
	cfg    TranscriberConfig
	svc    *TranscriberService
	logger *zap.Logger
}

func NewTopicConsumer(cfg TranscriberConfig, svc *TranscriberService, logger *zap.Logger) *TopicConsumer {
	return &TopicConsumer{
		cfg:    cfg,
		svc:    svc,
		logger: logger,
	}
}

func (c *TopicConsumer) UploadCompleted() {
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers:     strings.Split(c.cfg.KafkaHosts, ","),
		Topic:       tools.FileUploadedTopic,
		MaxBytes:    10e6, // 10MB
		StartOffset: kafka.LastOffset,
	})

	defer r.Close()

	for {
		m, err := r.ReadMessage(context.Background())
		if err != nil {
			c.logger.Error("failed to read message", zap.Error(err))
			break
		}

		// test := string(m.Value)
		// fmt.Printf("Test %s\n", test)
		data := pkg.UploadCompleteData{}
		err = json.Unmarshal(m.Value, &data)
		if err != nil {
			c.logger.Error("failed to unmarshal message", zap.Error(err))
			continue
		}

		videoKey := data.VideoKey
		filename := data.Filename

		bytesData, err := c.svc.Transcribe(filename)
		if err != nil {
			c.logger.Error("failed to transcribe main", zap.Error(err))
			continue
		}
		w := kafka.NewWriter(kafka.WriterConfig{
			Brokers:  strings.Split(c.cfg.KafkaHosts, ","),
			Topic:    tools.VideoTransribedTopic,
			Balancer: &kafka.LeastBytes{},
		})

		defer w.Close()

		msg := pkg.VideoTranscribedData{
			VideoKey: videoKey,
			Data:     bytesData,
		}

		bytesDataMsg, err := json.Marshal(msg)
		if err != nil {
			c.logger.Error("failed to marshal message VideoTranscribed", zap.Error(err))
			continue
		}

		err = w.WriteMessages(context.Background(),
			kafka.Message{
				Value: bytesDataMsg,
			},
		)
		if err != nil {
			c.logger.Error("failed to write message VideoTranscribed", zap.Error(err))
			continue
		}

		c.logger.Info("message sent to VideoTranscribed topic")

	}
}

func (c *TopicConsumer) VideoTranscribed() {
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers:     strings.Split(c.cfg.KafkaHosts, ","),
		Topic:       tools.VideoTransribedTopic,
		MaxBytes:    10e6, // 10MB
		StartOffset: kafka.LastOffset,
	})
	defer r.Close()
	for {
		m, err := r.ReadMessage(context.Background())
		if err != nil {
			c.logger.Error("failed to read message", zap.Error(err))
			break
		}

		test := string(m.Value)
		fmt.Printf("Test %s\n", test)

		var msg pkg.VideoTranscribedData
		err = json.Unmarshal(m.Value, &msg)
		if err != nil {
			c.logger.Error("failed to unmarshal message", zap.Error(err))
			continue
		}
		videoKey := msg.VideoKey

		var transcribedData TranscriptionData
		err = json.Unmarshal(msg.Data, &transcribedData)
		if err != nil {
			c.logger.Error("failed to unmarshal message", zap.Error(err))
			continue
		}

		fmt.Printf("Key: %s\n", videoKey)
		fmt.Printf("Text: %s\n", transcribedData.Text)
		fmt.Printf("Transcribed data: %+v\n", transcribedData)

		c.svc.SavePodcastInfo(videoKey, transcribedData)
	}
}
