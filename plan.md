# PodPilot Project Plan

## Phase 1: Video Acquisition & Preparation

-   [x] **1. Input Video Link:** User provides a link to the video source (e.g., YouTube).
-   [x] **2. Download Audio:** Download the audio track from the video link using `yt-dlp`. (Partially implemented in `Makefile`: `download_audio`, `get_video_info_json`)
-   [ ] **3. Upload to Storage:** Upload the downloaded audio file to Google Cloud Storage (GCS).
    -   *Details:* Need to implement GCS upload logic. Consider service account authentication.
-   [ ] **4. Send Download Confirmation:** Send a message (e.g., via a message queue like RabbitMQ/Kafka or a simple notification system) confirming the audio is uploaded to GCS.

## Phase 2: Transcription

-   [ ] **5. Trigger Transcription Service:** The message from step 4 triggers the Whisper transcription service.
-   [ ] **6. Download from Storage:** The Whisper service downloads the audio file from GCS.
-   [ ] **7. Transcribe Audio:** Transcribe the audio to text using `whisper.cpp`. (Integration needed - potentially using Docker as per `backend/internal/whisper/whisper.cpp/README.md`)
    -   *Details:* Choose appropriate model size (e.g., base, small, medium). Handle potential transcription errors.
-   [ ] **8. Save Transcription Data:** Decide on the data structure and save the transcription text (and potentially timestamps) to a database (e.g., PostgreSQL, MongoDB).
-   [ ] **9. Send Transcription Confirmation:** Send a message indicating transcription is complete and data is saved.

## Phase 3: Post-Processing & Cleanup

-   [ ] **10. Cleanup Storage:** Handle the message from step 9 to delete the original audio file from GCS.
-   [ ] **11. Trigger AI Analysis:** Handle the message from step 9 to send the transcription text to another AI service for analysis (e.g., summarization, topic extraction).
    -   *Details:* Define the interface/API for the analysis service.
-   [ ] **12. Save Analysis Output:** Write the analyzed output from the AI service to the database.

## Potential Future Enhancements

-   **User Interface:** Develop a simple web UI for pasting links and viewing status/results.
-   **Progress Tracking:** Implement more detailed status updates throughout the pipeline.
-   **Error Handling:** Add robust error handling and retry mechanisms for each step (download, upload, transcription, etc.).
-   **Format Options:** Allow users to choose output formats (e.g., plain text, SRT subtitles).
-   **Model Selection:** Allow selection of different Whisper model sizes based on needs.
-   **Alternative Storage:** Support other storage options besides GCS (e.g., S3, local storage).
-   **Security:** Ensure secure handling of API keys and credentials.
