package transcription

type TranscriptionService struct{}

func NewService() *TranscriptionService {
	return &TranscriptionService{}
}

func (s *TranscriptionService) Upload() string {
	return "transcription"
}
