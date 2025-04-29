package main

import (
	"github.com/caarlos0/env/v11"
	"github.com/johnnyfl/pod-pilot/internal/uploader"
	"github.com/johnnyfl/pod-pilot/tools"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.uber.org/zap"
)

func main() {
	logger := tools.NewLogger()
	defer logger.Sync()

	// Load .env file from the project root for local development
	err := godotenv.Load("../../.env")
	if err != nil {
		logger.Warn("Error loading .env file from ../../.env, relying on system environment variables", zap.Error(err))
	}

	// Configuration is loaded from environment variables (and potentially .env file).
	cfg := uploader.UploaderConfig{}
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

	client := tools.NewSupabase(cfg.SupabaseURL, cfg.SupabaseServiceKey)

	repo := uploader.NewRepository(client, logger)

	kafkaHandler := uploader.NewKafkaHandler(cfg, logger)

	svc := uploader.NewService(cfg, repo, kafkaHandler, logger)

	uphandler, tusHandler, err := uploader.NewHandler(cfg, svc, logger)
	if err != nil {
		logger.Fatal("failed to initialize uploader handler", zap.Error(err))
	}

	uploader.InitRoutes(e, uphandler, tusHandler)

	// Start the main Echo server
	logger.Info("Starting uploader server...", zap.String("port", cfg.Port))
	if err := e.Start(cfg.Port); err != nil {
		logger.Fatal("failed to start server", zap.Error(err))
	}
}
