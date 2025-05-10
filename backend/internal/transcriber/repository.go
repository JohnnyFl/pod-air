package transcriber

import (
	"context"
	"fmt"
	sq "github.com/Masterminds/squirrel"
	"github.com/jackc/pgx/v5"

	"github.com/johnnyfl/pod-pilot/pkg"
	"go.uber.org/zap"
)

type Repository struct {
	cfg      Config
	supabase *pgx.Conn
	psql     sq.StatementBuilderType
	logger   *zap.Logger
}

func NewRepository(cfg Config, supabase *pgx.Conn, logger *zap.Logger) *Repository {
	psql := sq.StatementBuilder.PlaceholderFormat(sq.Dollar)
	return &Repository{
		cfg:      cfg,
		supabase: supabase,
		psql:     psql,
		logger:   logger,
	}
}

func (r *Repository) SaveTranscription(podcastID string, transcriptionData pkg.TranscriptionData) error {
	r.logger.Debug("Transcription saving...", zap.String("podcastID", podcastID), zap.Any("data", transcriptionData))
	sql, args, err := r.psql.Update("podcasts").Where("id = ?", podcastID).Set("transcription", transcriptionData.Text).Set("segments", transcriptionData.Segments).ToSql()
	if err != nil {
		r.logger.Error("failed to create sql string", zap.Error(err))
		return fmt.Errorf("failed to create sql string: %w", err)
	}
	_, err = r.supabase.Exec(context.Background(), sql, args...)
	if err != nil {
		r.logger.Error("failed to execute sql", zap.Error(err))
		return fmt.Errorf("failed to execute sql: %w", err)
	}

	//_, _, err := r.supabase.Client.From("podcasts").Update(transcriptionData, "", "").Eq("id", podcastID).Execute()
	//if err != nil {
	//	return fmt.Errorf("failed to save transcription: %w", err)
	//}
	return nil
}
