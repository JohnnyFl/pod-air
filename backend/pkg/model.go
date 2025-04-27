package pkg

type UploadCompleteData struct {
	VideoKey string `json:"video_key"`
	Filename string `json:"filename"`
}

type VideoTranscribedData struct {
	VideoKey string `json:"video_key"`
	Data     []byte `json:"data"`
}
