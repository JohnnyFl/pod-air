package podcastmanager

import (
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/johnnyfl/pod-pilot/pkg"
	"time"
)

type Podcast struct {
	ID            string        `json:"id"`
	Title         string        `json:"title"`
	Transcription pgtype.Text   `json:"transcription"`
	Duration      string        `json:"duration"`
	Segments      pgtype.Text   `json:"segments"`
	CreatedAt     time.Time     `json:"created_at"`
	Thumbnail     string        `json:"thumbnail"`
	Categories    []string      `json:"categories"`
	Tags          []string      `json:"tags"`
	Heatmap       []pkg.Heatmap `json:"heatmap"`
	UploadDate    time.Time     `json:"upload_date"`
	ChannelID     string        `json:"channel_id"`
	URL           string        `json:"url"`
}

type UsersPodcastsInfo struct {
	PodcastID    string    `json:"podcast_id"`
	Thumbnail    string    `json:"thumbnail"`
	ChannelTitle string    `json:"channel_title"`
	PodcastTitle string    `json:"podcast_title"`
	CreatedAt    time.Time `json:"created_at"`
}
