package tools

import (
	"context"

	"cloud.google.com/go/storage"
	"go.uber.org/zap"
	"google.golang.org/api/option"
)

type GCStorage struct {
	*storage.Client
	*zap.Logger
}

func NewGCStorage(logger *zap.Logger) (*GCStorage, error) {
	client, err := storage.NewClient(context.Background(), option.WithCredentialsFile("../../pod_pilot_upload.json"))
	if err != nil {
		logger.Error("error creating gcs client", zap.Error(err))
		return nil, err
	}

	return &GCStorage{
		client,
		logger,
	}, nil
}
