package analyzer

import (
	"go.uber.org/zap"
)

type Handler struct {
	cfg     Config
	service *Service
	logger  *zap.Logger
}

func NewHandler(cfg Config, s *Service, log *zap.Logger) *Handler {
	return &Handler{
		cfg:     cfg,
		service: s,
		logger:  log,
	}

}
