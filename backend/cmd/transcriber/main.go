package main

import (
	"context"
	"github.com/caarlos0/env"
	"github.com/jackc/pgx/v5"
	"github.com/johnnyfl/pod-pilot/internal/transcriber"
	"github.com/johnnyfl/pod-pilot/tools"
	"github.com/joho/godotenv"
	"go.uber.org/zap"
	"log"
)

func main() {
	logger := tools.NewLogger()
	defer logger.Sync()

	err := godotenv.Load("../../.env")
	if err != nil {
		logger.Warn("Error loading .env file from ../../.env, relying on system environment variables", zap.Error(err))
	}

	cfg := transcriber.Config{}
	if err := env.Parse(&cfg); err != nil {
		logger.Fatal("failed to parse config", zap.Error(err))
	}

	conn, err := pgx.Connect(context.Background(), cfg.DatabaseUrl)
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}
	defer conn.Close(context.Background())

	repo := transcriber.NewRepository(cfg, conn, logger)

	svc := transcriber.NewService(cfg, repo, logger)

	logger.Info("Transcriber service started...")

	kafkaHandler := transcriber.NewKafkaHandler(cfg, svc, logger)

	go kafkaHandler.HandleUploadCompleted()
	// go kafkaHandler.HandleVideoTranscribed()
	select {}

}
