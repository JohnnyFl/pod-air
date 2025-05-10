package pkg

import "time"

type UploadCompleteData struct {
	VideoKey string `json:"video_key"`
	Filename string `json:"filename"`
}

type VideoTranscribedData struct {
	VideoKey string `json:"video_key"`
	Data     []byte `json:"data"`
}

type Word struct {
	Word  string  `json:"word"`
	Start float32 `json:"start"`
	End   float32 `json:"end"`
}

type Segment struct {
	ID    int     `json:"id"`
	Text  string  `json:"text"`
	Start float32 `json:"start"`
	End   float32 `json:"end"`
	Words []Word  `json:"words"`
}

type TranscriptionData struct {
	Text     string    `json:"text"`
	Segments []Segment `json:"segments"`
}

type Heatmap struct {
	StartTime float64 `json:"start_time"`
	EndTime   float64 `json:"end_time"`
	Value     float64 `json:"value"`
}

type VideoInfo struct {
	ID          string    `json:"id"`
	Title       string    `json:"title"`
	Thumbnail   string    `json:"thumbnail"`
	ChannelID   string    `json:"channel_id"`
	ChannelURL  string    `json:"channel_url"`
	VideoURL    string    `json:"webpage_url"`
	Categories  []string  `json:"categories"`
	Tags        []string  `json:"tags"`
	Heatmap     []Heatmap `json:"heatmap"`
	ChannelName string    `json:"channel"`
	UploadDate  string    `json:"upload_date"`
	DurationStr string    `json:"duration_string"`
}

type PodcastInfo struct {
	ID          string    `json:"id"`
	Title       string    `json:"title"`
	Thumbnail   string    `json:"thumbnail"`
	URL         string    `json:"url"`
	Categories  []string  `json:"categories"`
	Tags        []string  `json:"tags"`
	Heatmap     []Heatmap `json:"heatmap"`
	UploadDate  string    `json:"upload_date"`
	DurationStr string    `json:"duration"`
	ChannelID   string    `json:"channel_id"`
}

type UsersPodcasts struct {
	UserID    string `json:"user_id"`
	PodcastID string `json:"podcast_id"`
}

type SubscriptionInfo struct {
	Subscription   string    `json:"subscription"`
	CreatedAt      time.Time `json:"created_at"`
	UploadsAmount  int       `json:"uploads_amount"`
	UploadsResetAt time.Time `json:"uploads_reset_at"`
}
