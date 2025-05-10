package podcastmanager

import (
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
)

type Handler struct {
	service *Service
	logger  *zap.Logger
}

func NewHandler(service *Service, logger *zap.Logger) *Handler {
	return &Handler{
		service: service,
		logger:  logger,
	}
}

func (h *Handler) GetPodcastsByUserID(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userID := claims["sub"].(string)

	podcasts, err := h.service.GetPodcastsByUserID(userID)
	if err != nil {
		return c.JSON(500, map[string]string{"error": err.Error()})
	}
	c.JSON(200, podcasts)

	return nil
}

func (h *Handler) GetPodcastByID(c echo.Context) error {
	podcastID := c.Param("ID")

	podcast, err := h.service.GetPodcastByID(podcastID)
	if err != nil {
		return c.JSON(500, map[string]string{"error": err.Error()})
	}
	c.JSON(200, podcast)

	return nil
}

func (h *Handler) GetSummaryByPodcastID(c echo.Context) error {
	podcastID := c.Param("ID")
	summary, err := h.service.GetSummaryByPodcastID(podcastID)
	if err != nil {
		return c.JSON(500, map[string]string{"error": err.Error()})
	}
	c.JSON(200, summary)
	return nil
}

func (h *Handler) GetHighlightsByPodcastID(c echo.Context) error {
	podcastID := c.Param("ID")
	summary, err := h.service.GetHighlightsByPodcastID(podcastID)
	if err != nil {
		return c.JSON(500, map[string]string{"error": err.Error()})
	}
	c.JSON(200, summary)
	return nil
}

func (h *Handler) GetQuotesByPodcastID(c echo.Context) error {
	podcastID := c.Param("ID")
	quotes, err := h.service.GetQuotesByPodcastID(podcastID)
	if err != nil {
		return c.JSON(500, map[string]string{"error": err.Error()})
	}
	c.JSON(200, quotes)
	return nil
}
