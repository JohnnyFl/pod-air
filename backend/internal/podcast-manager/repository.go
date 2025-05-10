package podcastmanager

import (
	"context"
	"fmt"
	sq "github.com/Masterminds/squirrel"
	"github.com/jackc/pgx/v5"
	"go.uber.org/zap"
)

type Repository struct {
	supabase *pgx.Conn
	logger   *zap.Logger
	psql     sq.StatementBuilderType
}

func NewRepository(supabase *pgx.Conn, logger *zap.Logger) *Repository {
	psql := sq.StatementBuilder.PlaceholderFormat(sq.Dollar)

	return &Repository{
		supabase: supabase,
		logger:   logger,
		psql:     psql,
	}
}

func (r *Repository) GetPodcastsByUserID(userID string) ([]UsersPodcastsInfo, error) {
	var userPodcast UsersPodcastsInfo
	var userPodcasts []UsersPodcastsInfo

	sql, args, err := r.psql.Select("podcasts.id, podcasts.thumbnail, podcasts.title AS podcast_title, channels.title AS channel_title, podcasts.created_at").From("users_podcasts").Join("podcasts ON users_podcasts.podcast_id = podcasts.id").Join("channels ON podcasts.channel_id = channels.id").Where("user_id = ?", userID).ToSql()
	if err != nil {
		return nil, fmt.Errorf("failed to create sql string: %w", err)
	}

	rows, err := r.supabase.Query(context.Background(), sql, args...)
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&userPodcast.PodcastID, &userPodcast.Thumbnail, &userPodcast.PodcastTitle, &userPodcast.ChannelTitle, &userPodcast.CreatedAt)
		if err != nil {
			fmt.Println("err: ", err)
			return nil, fmt.Errorf("failed to scan row: %w", err)
		}
		userPodcasts = append(userPodcasts, userPodcast)
	}

	if err != nil {
		fmt.Println("err: ", err)
		return nil, fmt.Errorf("failed to get podcasts in repository: %w", err)
	}

	return userPodcasts, nil

}

func (r *Repository) GetPodcastByID(podcastID string) (Podcast, error) {
	var podcast Podcast

	//sql, args, err := psql.Select("*").From("podcasts").Where("id = ?", podcastID).ToSql()
	sql, args, err := r.psql.Select(
		"podcasts.id",
		"podcasts.title",
		"transcription",
		"duration",
		"segments::text AS segments", // cast here
		"podcasts.created_at",
		"thumbnail",
		"categories",
		"tags",
		"heatmap",
		"upload_date",
		"channels.title",
		"podcasts.url",
	).From("podcasts").Join("channels ON channels.id = podcasts.channel_id").Where("podcasts.id = ?", podcastID).ToSql()
	if err != nil {
		return podcast, fmt.Errorf("failed to create sql string: %w", err)
	}

	err = r.supabase.QueryRow(context.Background(), sql, args...).Scan(&podcast.ID, &podcast.Title, &podcast.Transcription, &podcast.Duration, &podcast.Segments, &podcast.CreatedAt, &podcast.Thumbnail, &podcast.Categories, &podcast.Tags, &podcast.Heatmap, &podcast.UploadDate, &podcast.ChannelID, &podcast.URL)

	if err != nil {
		r.logger.Error("failed to get podcasts in repository", zap.Error(err))
		return podcast, fmt.Errorf("failed to get podcasts in repository: %w", err)
	}

	return podcast, nil

}

func (r *Repository) GetSummaryByPodcastID(podcastID string) (string, error) {
	var summary string
	sql, args, err := r.psql.Select("summary").From("summaries").Where(sq.Eq{"podcast_id": podcastID}).ToSql()
	if err != nil {
		r.logger.Error("failed to create sql string", zap.Error(err))
		return summary, fmt.Errorf("failed to create sql string: %w", err)
	}
	r.logger.Debug("SQL: ", zap.String("sql", sql), zap.Any("args", args))
	err = r.supabase.QueryRow(context.Background(), sql, args...).Scan(&summary)
	if err != nil {
		r.logger.Error("failed to get podcasts in repository", zap.Error(err))
		return summary, fmt.Errorf("failed to get podcasts in repository: %w", err)
	}
	return summary, nil
}

func (r *Repository) GetHighlightsByPodcastID(podcastID string) (string, error) {
	var highlights string
	sql, args, err := r.psql.Select("highlights").From("highlights").Where("podcast_id =?", podcastID).ToSql()
	if err != nil {
		r.logger.Error("failed to create sql string", zap.Error(err))
		return highlights, fmt.Errorf("failed to create sql string: %w", err)
	}
	err = r.supabase.QueryRow(context.Background(), sql, args...).Scan(&highlights)
	if err != nil {
		r.logger.Error("failed to get highlights in repository", zap.Error(err))
		return highlights, fmt.Errorf("failed to get highlights in repository: %w", err)
	}
	return highlights, nil
}

func (r *Repository) GetQuotesByPodcastID(podcastID string) (string, error) {
	var quotes string
	sql, args, err := r.psql.Select("quote").From("quotes").Where("podcast_id =?", podcastID).ToSql()
	if err != nil {
		r.logger.Error("failed to create sql string", zap.Error(err))
		return quotes, fmt.Errorf("failed to create sql string: %w", err)
	}
	err = r.supabase.QueryRow(context.Background(), sql, args...).Scan(&quotes)
	if err != nil {
		r.logger.Error("failed to get quotes in repository", zap.Error(err))
		return quotes, fmt.Errorf("failed to get quotes in repository: %w", err)
	}
	return quotes, nil
}
