package usermanager

import (
	"fmt"
	"github.com/JohnnyFl/pod-air/pkg"
	"github.com/NdoleStudio/lemonsqueezy-go"
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

func (s *Service) UpdateSubscription(subscription lemonsqueezy.WebhookRequestSubscription) error {
	err := s.repo.UpdateSubscription(subscription)
	if err != nil {
		s.logger.Error("failed to update subscription", zap.Error(err))
		return fmt.Errorf("failed to update subscription: %w", err)
	}
	return nil

}
