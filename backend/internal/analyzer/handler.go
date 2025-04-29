package analyzer

import (
	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
)

type AnalyzerHandler struct {
	cfg     AnalyzerConfig
	service *AnalyzerService
	logger  *zap.Logger
}

func NewHandler(cfg AnalyzerConfig, s *AnalyzerService, log *zap.Logger) *AnalyzerHandler {
	return &AnalyzerHandler{
		cfg:     cfg,
		service: s,
		logger:  log,
	}

}

func (h *AnalyzerHandler) GetSummaryById(c echo.Context) error {
	c.Param("ID")
	return nil
}
