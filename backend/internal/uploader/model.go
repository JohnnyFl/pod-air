package uploader

type UploadURL struct {
	URL string `json:"url"`
}

type ChannelInfo struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	URL   string `json:"url"`
}
