# PodPilot: AI Podcast Summaries - Project Plan & Roadmap

## Overview

PodPilot aims to automatically download, transcribe, and summarize podcast episodes from video links (e.g., YouTube). This document outlines the project phases, sprint plan, and technical stack.

## Core Workflow (Phases)

1.  **Video Acquisition & Preparation:**
    - [x] Input video link (User).
    - [x] Download audio (`yt-dlp`). (Partially implemented in `Makefile`: `download_audio`, `get_video_info_json`)
    - [x] Upload audio to GCS (`backend/cmd/uploader`, `backend/tools/gcstorage.go`). (Implementation in progress)
    - [x] Notify system (e.g., message queue) of upload completion.
2.  **Transcription:**
    - [x] Trigger transcription service (`backend/cmd/transcriber`) via notification.
    - [x] Download audio from GCS.
    - [x] Transcribe using Whisper (`backend/internal/whisper`). (Integration needed, potentially Docker)
    - [ ] Save transcription (text, timestamps) to Database (e.g., PostgreSQL).
    - [ ] Notify system of transcription completion.
3.  **Post-Processing & Analysis:**
    - [ ] Trigger AI analysis service via notification.
    - [ ] Send transcription text for analysis (summarization, quotes).
    - [ ] Save analysis output to Database.
    - [ ] (Optional) Cleanup: Delete original audio from GCS.

## Sprint Plan & Progress (MVP Focus)

---

### 📅 Week 1: Project Setup & Basic UI (Completed ✅)

- **Goals:** Next.js/React setup, TailwindCSS, Sidebar/Top bar, Home page layout (placeholders for Trending, Recently Played, Most Popular), Reusable components (`PodcastCard`, `PodcastList`, `PodcastPlayer` placeholder).
- **Deliverables:** Responsive Home page (placeholders), Sidebar, Light/dark toggle, Initial commit.
- **Status:** [] Done

---

### 📅 Week 2: Upload & Podcast Management (In Progress ⏳)

- **Goals:**
  - Frontend: [x] Build Upload page (file/URL input, title/description).
  - Backend: [x] File upload endpoint (`backend/cmd/uploader` - Exists ✅),
  - [ ] Store metadata (PostgreSQL - ToDo 📝),
  - [x] Upload audio to GCS (Implementation in progress ⏳).
  - [ ] Podcast detail page skeleton (ToDo 📝).
- **Deliverables:**
  [ ] Podcast upload (Partially Implemented 🛠️),
  [ ] Metadata saving (ToDo 📝),
  [ ] Detail page accessible (ToDo 📝).
- **Status:**
  [ ] In Progress

---

### 📅 Week 3: Transcription + AI Summary Automation (ToDo 📝)

- **Goals:**
  [ ] Integrate Whisper (`backend/cmd/transcriber` - Exists ✅, Integration ToDo 📝),
  [ ] Summarize transcripts (GPT/Claude/Mistral),
  [ ] Generate 3–5 quotes w/ timestamps,
  [ ] Link data to podcast in DB.
- **Deliverables:**
  [ ] Auto-transcription post-upload,
  [ ] AI summary/quotes in UI,
  [ ] Data saved to DB.
- **Status:**
  [ ] ToDo

---

### 📅 Week 4: Real Data on Home Page + Search (ToDo 📝)

- **Goals:**
  [ ] Populate Home page with real data,
  [ ] Implement search (title/content),
  [ ] Add filters (category, duration, popularity),
  [ ] Pagination/Infinite scroll.
- **Deliverables:**
  [ ] Dynamic Home feed,
  [ ] Functional search/filters.
- **Status:**
  [ ] ToDo

---

### 📅 Week 5: User Accounts & Favorites (Optional for MVP) (ToDo 📝)

- **Goals:**
  [ ] Authentication (JWT/NextAuth/etc.),
  [ ] Save favorites,
  [ ] User profile page (uploads, favorites).
- **Deliverables:**
  [ ] Login/Signup,
  [ ] Favorites feature,
  [ ] Profile pages.
- **Status:**
  [ ] ToDo

---

### 📅 Week 6: Polish, Testing, Deployment (ToDo 📝)

- **Goals:**
  [ ] Bug fixing,
  [ ] Responsiveness polish,
  [ ] SEO/OpenGraph,
  [ ] Deploy (Vercel/AWS/etc.).
- **Deliverables:**
  [ ] Live MVP,
  [ ] End-to-end testing,
  [ ] Final code.
- **Status:**
  [ ] ToDo

---

## 🛠️ Technical Stack & Tools

- **Frontend:** Next.js/React, TailwindCSS
- **Backend:** Go
- **Transcription:** Whisper (local or API via `backend/cmd/transcriber`)
- **AI Summaries:** GPT-4 Turbo, Claude, or Mistral
- **Database:** PostgreSQL ( Supabase)
- **Storage:** Google Cloud Storage (GCS) (via `backend/cmd/uploader`)
- **Authentication:** Supabase Auth
- **Message Queue:** Kafka
- **Hosting:** Vercel, AWS Amplify, Render

## ✨ Potential Future Enhancements

- Detailed progress tracking UI.
- Robust error handling & retries for all pipeline steps.
- Multiple output format options (e.g., TXT, SRT).
- Selectable Whisper model sizes.
- Alternative storage support (e.g., S3, local).
- Enhanced security for API keys and credentials.

# Dashboard page

### 1. Upload/Import Section

- Podcast Upload:
  - A drag-and-drop area or a button to upload audio files (e.g., MP3, WAV).
  - Clear instructions about supported formats and file size limits.
- YouTube Link Input:
  - A text input field where users can paste a YouTube URL.
  - A button to "Import" or "Analyze" the link.

### 2. Processing Status

- Show a progress bar or spinner while the podcast is being uploaded or the YouTube link is being processed.
- Display status messages (e.g., "Uploading...", "Analyzing...", "Generating summary...").

### 3. Results/Output Section

- Summary:
  - Display a concise summary of the podcast or video.
- Highlights:
  - List key highlights or timestamps with short descriptions.
- Transcription (optional):
  - Show a full or partial transcript of the audio/video.
- Download/Copy Options:
  - Buttons to download the summary, highlights, or transcript as text files or copy to clipboard.

### 4. History/Tracking Section

- Recent Uploads/Analyses:
  - List of previously uploaded podcasts or analyzed YouTube links.
  - Show summary, highlights, and date/time for each entry.
  - Option to revisit, re-download, or delete past entries.

### 5. User Guidance

- Tooltips or help text explaining each feature.
- Example links or demo files for first-time users.

### 6. Optional Enhancements

- User Authentication:
  - Allow users to log in and save their history across sessions.
- Sharing:
  - Option to share summaries/highlights via social media or email.
- Customization:

  - Let users choose summary length or highlight count.
    Example Layout:

- Header: "Upload Podcast or Paste YouTube Link"
- Main Area:
  - [Upload Button] [Paste Link Field + Import Button]
- Processing Indicator
- Results:
  - [Summary] [Highlights] [Transcript]
- History:
  - [List of previous analyses]
- Footer/Help:
  - [Help text, contact, etc.]

## PodPilot Dashboard Wireframe

### Header

- Logo (PodPilot)
- Navigation: Home | Upload | My Podcasts | Account/Profile

### Main Content Area 1. Upload/Import Section

- Title: "Upload a Podcast or Paste a YouTube Link"
- Tabs or Side-by-Side:
  - [Upload Audio File]
    - Drag & Drop area or "Choose File" button
    - Supported formats note (e.g., MP3, WAV)
  - [Paste YouTube Link]
    - Input field for YouTube URL
    - "Import" button 2. Podcast Details (Optional, after upload/link)
- Title (auto-filled or editable)
- Description (optional)
- Category/Tags (optional) 3. Processing Status
- Progress bar or spinner ("Uploading...", "Transcribing...", "Analyzing...")
- Status messages 4. Results Section (After Processing)
- Summary: Short AI-generated summary
- Highlights: List of key moments/quotes with timestamps
- Transcript: (optional, expandable/collapsible)
- Download/Copy Buttons: For summary, highlights, transcript

### Sidebar or Section: My Podcasts/History

- List of previously uploaded/analyzed podcasts/videos
  - Title, date, status (complete/in progress)
  - Quick actions: View details, download, delete

### Footer

- Copyright
- Links: About, Contact, Privacy
