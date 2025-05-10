package usermanager

import (
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
)

func InitRoutes(e *echo.Echo, cfg Config, h *Handler) {
	users := e.Group("/api")

	users.Use(echojwt.JWT([]byte(cfg.JWTSecret)))

	users.GET("/subscription", h.GetSubscription)

}
