PHONY: transcription
transcription:
	@echo "Running transcription service..."
	cd ./cmd/transcription && air

PARAM ?= https://www.youtube.com/watch?v=Vxq6Qc-uAmE

PHONY: download_audio
download_audio:
	@echo "Dowloading audio from... " $(PARAM) 
	yt-dlp -f ba -o './uploads/%(channel)s/%(title)s.%(ext)s' '$(PARAM)'

PHONY: get_video_info_json
get_video_info_json:
	@echo "Getting video info as JSON for: $(PARAM) and saving to video_info.json"
	yt-dlp --dump-json --skip-download '$(PARAM)' > video_info.json