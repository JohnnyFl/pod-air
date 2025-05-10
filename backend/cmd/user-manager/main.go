package main

import (
	"context"
	"github.com/caarlos0/env"
	"github.com/jackc/pgx/v5"
	usermanager "github.com/johnnyfl/pod-pilot/internal/user-manager"
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

	// Load .env file from the project root for local development
	err := godotenv.Load("../../.env")
	if err != nil {
		logger.Warn("Error loading .env file from ../../.env, relying on system environment variables", zap.Error(err))
	}

	// Configuration is loaded from environment variables (and potentially .env file).
	cfg := usermanager.Config{}
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
	//defer conn.Close(context.Background())

	repo := usermanager.NewRepository(conn, logger)

	svc := usermanager.NewService(repo, logger)

	handler := usermanager.NewHandler(svc, logger)

	usermanager.InitRoutes(e, cfg, handler)

	// Start the main Echo server
	logger.Info("Starting user manager server...", zap.String("port", cfg.Port))
	if err := e.Start(cfg.Port); err != nil {
		logger.Fatal("failed to start server", zap.Error(err))
	}
}
