package transcriber

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
