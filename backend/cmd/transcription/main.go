package main

import (
	"github.com/johnnyfl/pod-pilot/internal/transcription"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware" // Import middleware

	"go.uber.org/zap"
)

func main() {

	logger, _ := zap.NewDevelopment()
	defer logger.Sync()

	err := godotenv.Load("../../.env")

	if err != nil {
		logger.Error("error loading .env file", zap.Error(err))
	}

	e := echo.New()
	e.Use(middleware.CORS())

	svc := transcription.NewService()

	h := transcription.NewHandler(svc, logger, e)

	transcription.InitRoutes(e, h)

	e.Logger.Fatal(e.Start(":8080"))
}
