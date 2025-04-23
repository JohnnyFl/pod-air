package tools

import (
	"context"

	"cloud.google.com/go/storage"
	"go.uber.org/zap"
)

type GCStorage struct {
	*storage.Client
	*zap.Logger
}

func NewGCStorage(logger *zap.Logger) (*GCStorage, error) {
	// The client automatically uses GOOGLE_APPLICATION_CREDENTIALS if set.
	client, err := storage.NewClient(context.Background())
	if err != nil {
		logger.Error("error creating gcs client", zap.Error(err))
		return nil, err
	}

	return &GCStorage{
		client,
		logger,
	}, nil
}
