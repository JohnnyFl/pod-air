package uploader

import (
	"fmt"

	"github.com/JohnnyFl/pod-air/pkg"
	"github.com/JohnnyFl/pod-air/tools"
	"go.uber.org/zap"
)

type Repository struct {
	supabase *tools.Supabase
	logger   *zap.Logger
}

func NewRepository(supabase *tools.Supabase, logger *zap.Logger) *Repository {
	return &Repository{
		supabase: supabase,
		logger:   logger,
	}
}

func (r *Repository) SaveChannelInfo(info pkg.VideoInfo) error {
	channel := ChannelInfo{
		ID:    info.ChannelID,
		Title: info.ChannelName,
		URL:   info.ChannelURL,
	}
	_, _, err := r.supabase.Client.From("channels").Insert(channel, true, "id", "", "").Execute()
	if err != nil {
		return fmt.Errorf("failed to save channel info to database: %w", err)
	}
	return nil
}

func (r *Repository) SavePodcastInfo(info pkg.VideoInfo) error {
	podcast := pkg.PodcastInfo{
		ID:          info.ID,
		Title:       info.Title,
		Thumbnail:   info.Thumbnail,
		URL:         info.VideoURL,
		Categories:  info.Categories,
		Tags:        info.Tags,
		Heatmap:     info.Heatmap,
		UploadDate:  info.UploadDate,
		DurationStr: info.DurationStr,
		ChannelID:   info.ChannelID,
	}
	_, _, err := r.supabase.Client.From("podcasts").Insert(podcast, true, "id", "", "").Execute()
	if err != nil {
		return fmt.Errorf("failed to save podcast info to database: %w", err)
	}

	return nil
}

func (r *Repository) SaveUsersPodcastsRelation(userID, podcastID string) error {
	info := pkg.UsersPodcasts{
		UserID:    userID,
		PodcastID: podcastID,
	}
	_, _, err := r.supabase.Client.From("users_podcasts").Insert(info, true, "podcast_id", "", "").Execute()
	if err != nil {
		return fmt.Errorf("failed to save podcast info to database: %w", err)
	}
	return nil

}
