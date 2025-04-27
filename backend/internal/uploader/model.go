package uploader

type UploadURL struct {
	URL string `json:"url"`
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

type ChannelInfo struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	URL   string `json:"url"`
}
