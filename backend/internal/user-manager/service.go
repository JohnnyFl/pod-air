package usermanager

import (
	"fmt"
	"github.com/johnnyfl/pod-air/pkg"
	"go.uber.org/zap"
)

type Service struct {
	repo   *Repository
	logger *zap.Logger
}

func NewService(repo *Repository, logger *zap.Logger) *Service {
	return &Service{
		repo:   repo,
		logger: logger,
	}
}

func (s *Service) GetSubscription(userID string) (pkg.SubscriptionInfo, error) {
	subscription, err := s.repo.GetSubscription(userID)
	if err != nil {
		return subscription, fmt.Errorf("failed to get subscription: %w", err)
	}
	return subscription, nil
}
