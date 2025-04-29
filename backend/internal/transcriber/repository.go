package transcriber

import (
	"fmt"

	"github.com/johnnyfl/pod-pilot/pkg"
	"github.com/johnnyfl/pod-pilot/tools"
	"go.uber.org/zap"
)

type TranscriberRepository struct {
	cfg      TranscriberConfig
	supabase *tools.Supabase
	logger   *zap.Logger
}

func NewRepository(cfg TranscriberConfig, supabase *tools.Supabase, logger *zap.Logger) *TranscriberRepository {
	return &TranscriberRepository{
		cfg:      cfg,
		supabase: supabase,
		logger:   logger,
	}
}

func (r *TranscriberRepository) SaveTranscription(podcastID string, transcriptionData pkg.TranscriptionData) error {
	_, _, err := r.supabase.Client.From("Podcasts").Update(transcriptionData, "", "").Eq("id", podcastID).Execute()
	if err != nil {
		return fmt.Errorf("failed to save transcription: %w", err)
	}
	return nil
}
