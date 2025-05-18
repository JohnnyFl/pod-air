PHONY: transcriber
transcriber:
	@echo "Running transcriber service..."
	cd ./cmd/transcriber && air

PHONY: uploader
uploader:
	@echo "Running uploader service..."
	cd ./cmd/uploader && air

PHONY: analyzer
analyzer:
	@echo "Running analyzer service..."
	cd ./cmd/analyzer && air

PHONY: podcast-manager
podcast-manager:
	@echo "Running podcast manager service..."
	cd ./cmd/podcast-manager && air

PHONY: user-manager
user-manager:
	@echo "Running user manager service..."
	cd ./cmd/user-manager && air

PARAM ?= https://www.youtube.com/watch?v=Vxq6Qc-uAmE

# To test paddle webhooks use paddle cli hooks. Install via homebrew or in another way.
# Usage: hookdeck listen 4000 paddle --path /api/webhook
PHONY: webhook-server
webhook-server:
	@echo "Running paddle webhook local server ..."
	hookdeck listen 8083 paddle --path /api/webhook


PHONY: download_audio
download_audio:
	@echo "Downloading audio from... " $(PARAM)
	yt-dlp -f ba -o './uploads/%(channel)s/%(title)s.%(ext)s' '$(PARAM)'

PHONY: get_video_info_json
get_video_info_json:
	@echo "Getting video info as JSON for: $(PARAM) and saving to video_info.json"
	yt-dlp --dump-json --skip-download '$(PARAM)' > video_info.json

PHONY: recreate_kafka
recreate_kafka:
	@echo "Recreating Kafka container..."
	docker-compose down -v kafka
	docker-compose up -d kafka