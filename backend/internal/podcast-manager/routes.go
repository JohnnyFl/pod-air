package podcastmanager

import (
	"github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
)

func InitRoutes(e *echo.Echo, cfg Config, h *Handler) {
	podcasts := e.Group("/api")
	podcasts.Use(echojwt.JWT([]byte(cfg.JWTSecret)))

	podcasts.GET("/podcasts", h.GetPodcastsByUserID)
	podcasts.GET("/podcasts/:ID", h.GetPodcastByID)
	podcasts.GET("/podcasts/:ID/summary", h.GetSummaryByPodcastID)
	podcasts.GET("/podcasts/:ID/highlights", h.GetHighlightsByPodcastID)
	podcasts.GET("/podcasts/:ID/quotes", h.GetQuotesByPodcastID)

}
