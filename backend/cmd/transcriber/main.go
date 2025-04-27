package main

import (
	"sync"

	"github.com/caarlos0/env"
	"github.com/johnnyfl/pod-pilot/internal/transcriber"
	"github.com/johnnyfl/pod-pilot/tools"
	"github.com/joho/godotenv"
	"go.uber.org/zap"
)

var transcriptionData = make(map[string][]byte)
var dataMutex sync.Mutex

func main() {
	logger := tools.NewLogger()
	defer logger.Sync()

	err := godotenv.Load("../../.env")
	if err != nil {
		logger.Warn("Error loading .env file from ../../.env, relying on system environment variables", zap.Error(err))
	}

	cfg := transcriber.TranscriberConfig{}
	if err := env.Parse(&cfg); err != nil {
		logger.Fatal("failed to parse config", zap.Error(err))
	}

	client := tools.NewSupabase(cfg.SupabaseURL, cfg.SupabaseServiceKey)

	repo := transcriber.NewRepository(cfg, client, logger)

	svc := transcriber.NewService(cfg, repo, logger)

	logger.Info("Transcriber service started...")

	consumer := transcriber.NewTopicConsumer(cfg, svc, logger)

	go consumer.UploadCompleted()
	go consumer.VideoTranscribed()
	select {}

}
