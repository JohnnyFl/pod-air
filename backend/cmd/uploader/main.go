package main

import (
	"github.com/caarlos0/env/v11"
	"github.com/johnnyfl/pod-pilot/internal/uploader"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.uber.org/zap"
)

func main() {
	logger, _ := zap.NewDevelopment()
	defer logger.Sync()

	// Load .env relative to the executable location might be fragile.
	// Consider absolute paths or embedding.
	err := godotenv.Load("../../.env")
	if err != nil {
		// Log as warning or info, as .env might be optional
		logger.Warn("error loading .env file (continuing without)", zap.Error(err))
	}
	cfg := uploader.UploaderConfig{}
	if err = env.Parse(&cfg); err != nil {
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

	svc := uploader.NewService(cfg, logger)

	uphandler, tusHandler, err := uploader.NewHandler(cfg, svc, logger)
	if err != nil {
		logger.Fatal("failed to initialize uploader handler", zap.Error(err))
	}

	uploader.InitRoutes(e, uphandler, tusHandler)

	// Start the main Echo server
	logger.Info("Starting server", zap.String("port", cfg.Port))
	if err := e.Start(cfg.Port); err != nil {
		logger.Fatal("failed to start server", zap.Error(err))
	}
}
