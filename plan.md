# PodPilot: AI Podcast Summaries - Project Plan & Roadmap

## Overview
PodPilot aims to automatically download, transcribe, and summarize podcast episodes from video links (e.g., YouTube). This document outlines the project phases, sprint plan, and technical stack.

## Core Workflow (Phases)
1.  **Video Acquisition & Preparation:**
    *   [x] Input video link (User).
    *   [x] Download audio (`yt-dlp`). (Partially implemented in `Makefile`: `download_audio`, `get_video_info_json`)
    *   [ ] Upload audio to GCS (`backend/cmd/uploader`, `backend/tools/gcstorage.go`). (Implementation in progress)
    *   [ ] Notify system (e.g., message queue) of upload completion.
2.  **Transcription:**
    *   [ ] Trigger transcription service (`backend/cmd/transcriber`) via notification.
    *   [ ] Download audio from GCS.
    *   [ ] Transcribe using Whisper (`backend/internal/whisper`). (Integration needed, potentially Docker)
    *   [ ] Save transcription (text, timestamps) to Database (e.g., PostgreSQL).
    *   [ ] Notify system of transcription completion.
3.  **Post-Processing & Analysis:**
    *   [ ] Trigger AI analysis service via notification.
    *   [ ] Send transcription text for analysis (summarization, quotes).
    *   [ ] Save analysis output to Database.
    *   [ ] (Optional) Cleanup: Delete original audio from GCS.

## Sprint Plan & Progress (MVP Focus)

---

### 📅 Week 1: Project Setup & Basic UI (Completed ✅)
*   **Goals:** Next.js/React setup, TailwindCSS, Sidebar/Top bar, Home page layout (placeholders for Trending, Recently Played, Most Popular), Reusable components (`PodcastCard`, `PodcastList`, `PodcastPlayer` placeholder).
*   **Deliverables:** Responsive Home page (placeholders), Sidebar, Light/dark toggle, Initial commit.
*   **Status:** [x] Done

---

### 📅 Week 2: Upload & Podcast Management (In Progress ⏳)
*   **Goals:**
    *   Frontend: [x] Build Upload page (file/URL input, title/description).
    *   Backend: [x] File upload endpoint (`backend/cmd/uploader` - Exists ✅), 
    *   [ ] Store metadata (PostgreSQL - ToDo 📝), 
    *   [ ] Upload audio to GCS (Implementation in progress ⏳).
    *   [ ] Podcast detail page skeleton (ToDo 📝).
*   **Deliverables:** 
        [ ] Podcast upload (Partially Implemented 🛠️), 
        [ ] Metadata saving (ToDo 📝), 
        [ ] Detail page accessible (ToDo 📝).
*   **Status:** 
        [ ] In Progress

---

### 📅 Week 3: Transcription + AI Summary Automation (ToDo 📝)
*   **Goals:** 
        [ ] Integrate Whisper (`backend/cmd/transcriber` - Exists ✅, Integration ToDo 📝), 
        [ ] Summarize transcripts (GPT/Claude/Mistral), 
        [ ] Generate 3–5 quotes w/ timestamps, 
        [ ] Link data to podcast in DB.
*   **Deliverables:** 
        [ ] Auto-transcription post-upload, 
        [ ] AI summary/quotes in UI, 
        [ ] Data saved to DB.
*   **Status:** 
        [ ] ToDo

---

### 📅 Week 4: Real Data on Home Page + Search (ToDo 📝)
*   **Goals:** 
        [ ] Populate Home page with real data, 
        [ ] Implement search (title/content), 
        [ ] Add filters (category, duration, popularity), 
        [ ] Pagination/Infinite scroll.
*   **Deliverables:** 
        [ ] Dynamic Home feed, 
        [ ] Functional search/filters.
*   **Status:** 
        [ ] ToDo

---

### 📅 Week 5: User Accounts & Favorites (Optional for MVP) (ToDo 📝)
*   **Goals:** 
        [ ] Authentication (JWT/NextAuth/etc.), 
        [ ] Save favorites, 
        [ ] User profile page (uploads, favorites).
*   **Deliverables:** 
        [ ] Login/Signup, 
        [ ] Favorites feature, 
        [ ] Profile pages.
*   **Status:** 
        [ ] ToDo

---

### 📅 Week 6: Polish, Testing, Deployment (ToDo 📝)
*   **Goals:** 
        [ ] Bug fixing, 
        [ ] Responsiveness polish, 
        [ ] SEO/OpenGraph, 
        [ ] Deploy (Vercel/AWS/etc.).
*   **Deliverables:** 
        [ ] Live MVP, 
        [ ] End-to-end testing, 
        [ ] Final code.
*   **Status:** 
        [ ] ToDo

---

## 🛠️ Technical Stack & Tools
*   **Frontend:** Next.js/React, TailwindCSS
*   **Backend:** Go
*   **Transcription:** Whisper (local or API via `backend/cmd/transcriber`)
*   **AI Summaries:** GPT-4 Turbo, Claude, or Mistral
*   **Database:** PostgreSQL ( Supabase)
*   **Storage:** Google Cloud Storage (GCS) (via `backend/cmd/uploader`)
*   **Authentication:** Supabase Auth
*   **Message Queue:** Kafka 
*   **Hosting:** Vercel, AWS Amplify, Render

## ✨ Potential Future Enhancements
*   Detailed progress tracking UI.
*   Robust error handling & retries for all pipeline steps.
*   Multiple output format options (e.g., TXT, SRT).
*   Selectable Whisper model sizes.
*   Alternative storage support (e.g., S3, local).
*   Enhanced security for API keys and credentials.
