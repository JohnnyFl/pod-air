package analyzer

type Summary struct {
	Summary   string `json:"summary"`
	PodcastID string `json:"podcast_id"`
}

type Quotes struct {
	Quotes    string `json:"quote"`
	PodcastID string `json:"podcast_id"`
}

type Highlights struct {
	Highlights string `json:"highlights"`
	PodcastID  string `json:"podcast_id"`
}
