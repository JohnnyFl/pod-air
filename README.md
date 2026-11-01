# PodAir

Turn a YouTube video or podcast into a transcript and a short summary. Go microservices communicate through Kafka; the web app is built with Next.js.

**Live demo (frontend only):** https://pod-air.vercel.app/  — the backend is switched off to avoid idle cloud cost.

## How it works

```
 video link ──► uploader ──(Kafka: video uploaded)──► transcriber ──(Kafka: video transcribed)──► analyzer
   yt-dlp          │ audio → Google Cloud Storage        │ Whisper (CPU, whisper.cpp)              │ summary via Gemini
                                                                                                    ▼
                                                                                              PostgreSQL (Supabase)
 podcast-manager (catalog API) · user-manager (users, Paddle webhooks) · Next.js frontend
```

| Service | Responsibility |
|---|---|
| `uploader` | downloads audio with `yt-dlp`, stores it in GCS, publishes an event |
| `transcriber` | fetches audio, transcribes with self-hosted Whisper (whisper.cpp in Docker, CPU only), publishes an event |
| `analyzer` | consumes the transcript event, generates a summary with Google Gemini, saves it |
| `podcast-manager`, `user-manager` | REST APIs for podcasts and users |

## Stack
Go · Kafka (segmentio/kafka-go) · Whisper (whisper.cpp) · Google Cloud Storage · Gemini API · PostgreSQL (Supabase) · Docker Compose · Next.js, Tailwind

## Design notes
- **Event-driven pipeline:** each stage can be restarted or scaled on its own; Kafka decouples slow transcription from the upload API.
- **Cost:** Whisper runs on CPU in a container instead of a paid transcription API or a GPU instance. Several dozen hours of video were processed this way.

## Run locally
```bash
cd backend
docker compose up -d          # Kafka, Whisper, uploader
make transcriber & make analyzer & make uploader   # each runs with `air`
```
Needs a GCS service account, a Gemini API key and a PostgreSQL URL (see each service's `config.go`).

## Status
Working MVP: upload → transcript → summary. Not implemented: question answering over transcripts.
