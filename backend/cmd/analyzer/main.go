package main

import (
	"context"
	"github.com/caarlos0/env"
	"github.com/jackc/pgx/v5"
	"github.com/johnnyfl/pod-pilot/internal/analyzer"
	"github.com/johnnyfl/pod-pilot/tools"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
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

	cfg := analyzer.Config{}
	if err := env.Parse(&cfg); err != nil {
		logger.Fatal("failed to parse config", zap.Error(err))
	}

	e := echo.New()

	e.Use(middleware.CORS())
	e.Use(middleware.Recover())                                              // Add recovery middleware
	e.Use(middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{ // Add request logging
		LogURI:     true,
		LogStatus:  true,
		LogLatency: true,
		LogHost:    true,
		LogMethod:  true,
		LogValuesFunc: func(c echo.Context, v middleware.RequestLoggerValues) error {
			logger.Info("",
				zap.String("method", v.Method),
				zap.String("host", v.Host),
				zap.String("URI", v.URI),

				zap.Int("status", v.Status),
				zap.Duration("latency", v.Latency),
			)
			return nil
		},
	}))

	conn, err := pgx.Connect(context.Background(), cfg.DatabaseUrl)
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}
	defer conn.Close(context.Background())

	repo := analyzer.NewRepository(cfg, logger, conn)

	svc := analyzer.NewService(cfg, repo, logger)
	handler := analyzer.NewHandler(cfg, svc, logger)

	analyzer.InitRoutes(e, handler)

	kafkaHandler := analyzer.NewKafkaHandler(cfg, svc, logger)
	//TODO: add adapt for multiple platforms x/twitter/ blog post / treads, facebook

	go kafkaHandler.HandleVideoTranscribed()

	logger.Info("Starting analyzer server...", zap.String("port", cfg.Port))
	if err := e.Start(cfg.Port); err != nil {
		logger.Fatal("failed to start server", zap.Error(err))
	}
}
