package uploader

import (
	"fmt"

	"github.com/johnnyfl/pod-pilot/tools"
	"go.uber.org/zap"
)

type UploaderRepository struct {
	supaBase *tools.Supabase
	logger   *zap.Logger
}

func NewRepository(supabase *tools.Supabase, logger *zap.Logger) *UploaderRepository {
	return &UploaderRepository{
		supaBase: supabase,
		logger:   logger,
	}
}

func (r *UploaderRepository) SaveChannelInfo(info VideoInfo) error {
	channel := ChannelInfo{
		ID:    info.ChannelID,
		Title: info.ChannelName,
		URL:   info.ChannelURL,
	}
	_, _, err := r.supaBase.Client.From("Channels").Insert(channel, true, "id", "", "").Execute()
	if err != nil {
		return fmt.Errorf("failed to save channel info to database: %w", err)
	}
	return nil
}

func (r *UploaderRepository) SavePodcastInfo(info VideoInfo) error {
	podcast := PodcastInfo{
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
	_, _, err := r.supaBase.Client.From("Podcasts").Insert(podcast, true, "id", "", "").Execute()
	if err != nil {
		return fmt.Errorf("failed to save podcast info to database: %w", err)
	}

	return nil
}
