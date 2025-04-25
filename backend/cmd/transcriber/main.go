package main

import (
	"context"
	"strings"

	"github.com/caarlos0/env"
	"github.com/johnnyfl/pod-pilot/internal/transcriber"
	"github.com/joho/godotenv"
	"github.com/segmentio/kafka-go"
	"go.uber.org/zap"
)

func main() {
	logger, _ := zap.NewDevelopment()
	defer logger.Sync()

	// Load .env file from the project root for local development
	err := godotenv.Load("../../.env")
	if err != nil {
		logger.Warn("Error loading .env file from ../../.env, relying on system environment variables", zap.Error(err))
	}

	// Configuration is loaded from environment variables (and potentially .env file).
	cfg := transcriber.TranscriberConfig{}
	if err := env.Parse(&cfg); err != nil {
		logger.Fatal("failed to parse config", zap.Error(err))
	}

	svc := transcriber.NewService(cfg, logger)

	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers:  strings.Split(cfg.KafkaHosts, ","),
		Topic:    "file.upload",
		MaxBytes: 10e6, // 10MB

	})

	logger.Info("Starting to read messages from Kafka...", zap.String("topic", "file.upload"))

	for {
		m, err := r.ReadMessage(context.Background())
		if err != nil {
			logger.Error("failed to read message", zap.Error(err))
			break
		}

		logger.Info("message at offset ", zap.Int64("offset", m.Offset), zap.String("Key", string(m.Key)), zap.String("Value", string(m.Value)))

		err = svc.Transcribe(string(m.Value))
		if err != nil {
			logger.Error("failed to transcribe main", zap.Error(err))
		}
	}
	if err := r.Close(); err != nil {
		logger.Fatal("failed to close reader", zap.Error(err))
	}

}
