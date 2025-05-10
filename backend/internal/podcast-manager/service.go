package podcastmanager

import (
	"fmt"

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

func (s *Service) GetPodcastsByUserID(userID string) ([]UsersPodcastsInfo, error) {
	podcasts, err := s.repo.GetPodcastsByUserID(userID)
	if err != nil {
		return nil, fmt.Errorf("error getting podcasts in service: %w", err)
	}
	return podcasts, nil

}

func (s *Service) GetPodcastByID(podcastID string) (Podcast, error) {
	podcast, err := s.repo.GetPodcastByID(podcastID)
	if err != nil {
		return podcast, fmt.Errorf("error getting podcasts in service: %w", err)
	}
	return podcast, nil

}

func (s *Service) GetSummaryByPodcastID(podcastID string) (string, error) {
	summary, err := s.repo.GetSummaryByPodcastID(podcastID)
	if err != nil {
		return summary, fmt.Errorf("error getting podcasts in service: %w", err)
	}
	return summary, nil
}

func (s *Service) GetHighlightsByPodcastID(podcastID string) (string, error) {
	highlights, err := s.repo.GetHighlightsByPodcastID(podcastID)
	if err != nil {
		return highlights, fmt.Errorf("error getting highlights in service: %w", err)
	}
	return highlights, nil
}

func (s *Service) GetQuotesByPodcastID(podcastID string) (string, error) {
	quotes, err := s.repo.GetQuotesByPodcastID(podcastID)
	if err != nil {
		return quotes, fmt.Errorf("error getting quotes in service: %w", err)
	}
	return quotes, nil
}
