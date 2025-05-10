package uploader

import (
	"net/http"

	"github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	tusd "github.com/tus/tusd/v2/pkg/handler"
)

func InitRoutes(e *echo.Echo, cfg Config, h *Handler, tusHandler *tusd.Handler) {
	uploadUrl := e.Group("/api")
	uploadUrl.Use(echojwt.JWT([]byte(cfg.JWTSecret)))

	uploadUrl.POST("/uploads/url", h.StreamUploadByUrl)

	// ================ TUS ======================
	tusHTTPHandler := http.StripPrefix("/uploads/", tusHandler)
	tusEchoHandler := echo.WrapHandler(tusHTTPHandler)

	e.POST("/uploads/", tusEchoHandler)
	e.OPTIONS("/uploads/", tusEchoHandler)
	e.Any("/uploads/*", tusEchoHandler)

}
