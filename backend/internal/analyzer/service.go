package analyzer

import (
	"context"
	// "encoding/json"
	"fmt"
	"strings"

	"go.uber.org/zap"
	"google.golang.org/genai"
)

type AnalyzerService struct {
	cfg      AnalyzerConfig
	aiClient *genai.Client
	repo     *AnalyzerRepository
	logger   *zap.Logger
}

func NewService(cfg AnalyzerConfig, repo *AnalyzerRepository, logger *zap.Logger) *AnalyzerService {
	ctx := context.Background()
	client, err := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey:  cfg.GoogleAIKey,
		Backend: genai.BackendGeminiAPI,
	})
	if err != nil {
		logger.Fatal("failed to create client", zap.Error(err))
	}

	return &AnalyzerService{
		cfg:      cfg,
		aiClient: client,
		repo:     repo,
		logger:   logger,
	}
}

func (s *AnalyzerService) GenerateSummary(text string) (string, error) {
	s.logger.Info("Generating summary...")
	// return "", nil
	contentConfig := genai.GenerateContentConfig{
		SystemInstruction: &genai.Content{
			Parts: []*genai.Part{
				{
					Text: "Generate a summary of the following text. Keep it short, just to select main topics of the podcast. Make it more personalized for the audience. Give me only summary and nothing else. I want to save it later in the database.",
				},
			},
		},
	}
	ctx := context.Background()

	result, err := s.aiClient.Models.GenerateContent(
		ctx,
		"gemini-2.5-flash-preview-04-17",
		genai.Text(text),
		&contentConfig,
	)
	if err != nil {
		return "", fmt.Errorf("failed to generate content: %w", err)
	}
	// fmt.Println(result.Text())
	s.logger.Info("Summary generated")
	return result.Text(), nil
}

func (s *AnalyzerService) GetSummaryByPodcastID(ID string) {
	// TODO: implement
	return
}

func (s *AnalyzerService) GenerateHighlights(videoID string) (string, error) {
	s.logger.Info("Getting segments and heatmaps by video ID...", zap.String("videoID", videoID))

	// 1. Fetch Data
	videoSegments, err := s.repo.getSegmentsByVideoID(videoID)
	if err != nil {
		s.logger.Error("failed to get segments by video ID", zap.Error(err), zap.String("videoID", videoID))
		return "", fmt.Errorf("failed to get segments for highlights: %w", err)
	}
	// heatmapData is now the struct { HeatMap []pkg.Heatmap ... }
	heatmapData, err := s.repo.getHeatmapsByVideoID(videoID)
	if err != nil {
		s.logger.Error("failed to get heatmaps by video ID", zap.Error(err), zap.String("videoID", videoID))
		return "", fmt.Errorf("failed to get heatmaps for highlights: %w", err)
	}

	// 2. Format Transcript Segments
	var segmentsText strings.Builder
	segmentsText.WriteString("Transcript Segments:\n")
	for _, segment := range videoSegments {
		segmentsText.WriteString(fmt.Sprintf("[%.2f-%.2f] %s\n", segment.Start, segment.End, segment.Text))
	}

	// 3. Format Heatmap Data
	var heatmapText strings.Builder
	heatmapText.WriteString("\nHeatmap Data:\n")
	// Iterate over the HeatMap field of the heatmapData struct
	for _, point := range heatmapData.HeatMap { // <-- Access .HeatMap field
		heatmapText.WriteString(fmt.Sprintf("[%.2f-%.2f] %f\n", point.StartTime, point.EndTime, point.Value))
	}

	// 4. Combine Inputs
	combinedInput := segmentsText.String() + heatmapText.String()

	// Configure AI call
	contentConfig := genai.GenerateContentConfig{
		SystemInstruction: &genai.Content{
			Parts: []*genai.Part{
				{
					Text: `You are tasked with identifying the "best moments" from a video transcript, using viewer engagement heatmap data as a guide.

You will receive two sets of data formatted below:
1.  **Transcript Segments:** Text segments from the video, each prefixed with its [start_time-end_time] in seconds.
2.  **Heatmap Data:** A list of time intervals, each with a corresponding engagement 'value'. Higher values indicate higher viewer engagement during that interval. Format: [start_time-end_time] value.

Your goal is to find the most compelling parts of the video by correlating the transcript content with periods of high viewer engagement (high heatmap values).

**Instructions:**
1.  Analyze both the transcript segments and the heatmap data provided.
2.  Identify time intervals where the heatmap 'value' is significantly high compared to other intervals in the data. These represent peaks in viewer engagement.
3.  Examine the transcript content that corresponds temporally to these high-engagement intervals.
4.  Select approximately 3-5 segments that represent the "best moments". These moments should ideally occur during high-engagement periods (high heatmap value) AND contain interesting, impactful, surprising, or key information based on the transcript content.
5.  For each selected best moment, provide the start time, end time, and the corresponding transcript text.

**Output Format:**
Provide the results as a list, with each item formatted exactly as follows on a new line:
[start_time-end_time] Transcript text of the best moment.

Do not include any other text, explanations, or introductory phrases in your output.`,
				},
			},
		},
	}
	ctx := context.Background()

	s.logger.Info("Generating highlights...", zap.String("videoID", videoID)) // <-- Changed log message slightly
	result, err := s.aiClient.Models.GenerateContent(
		ctx,
		"gemini-2.5-flash-preview-04-17",
		genai.Text(combinedInput),
		&contentConfig,
	)
	if err != nil {
		s.logger.Error("failed to generate content for highlights", zap.Error(err), zap.String("videoID", videoID)) // <-- Added logging context
		return "", fmt.Errorf("failed to generate highlights content: %w", err)                                     // <-- Return error
	}

	highlightsText := result.Text() // <-- Get text from result
	s.logger.Info("Highlights generated", zap.String("videoID", videoID), zap.String("result", highlightsText))

	// TODO: Add code to save highlightsText to the database using s.repo
	err = s.repo.saveHighlights(videoID, highlightsText)
	if err != nil {
		s.logger.Error("failed to save highlights", zap.Error(err), zap.String("videoID", videoID)) // <-- Added logging context
		return "", fmt.Errorf("failed to save highlights: %w", err)                                 // <-- Return error
	}

	return highlightsText, nil // <-- Return the generated text and nil error
}

func (s *AnalyzerService) GenerateQuotes(videoID string) (string, error) {
	s.logger.Info("Getting segments by video ID...")
	// videoSegments is now directly []pkg.Segment
	videoSegments, err := s.repo.getSegmentsByVideoID(videoID)
	if err != nil {
		s.logger.Error("failed to get segments by video ID", zap.Error(err))
		// Consider returning the actual error instead of nil
		return "", fmt.Errorf("failed to get segments for quotes: %w", err)
	}

	var segmentsText strings.Builder
	// Iterate directly over videoSegments slice
	for _, segment := range videoSegments { // <-- Changed from videoSegments.Segments
		// Format: "[start-end] text"
		segmentsText.WriteString(fmt.Sprintf("[%.2f-%.2f] %s\n", segment.Start, segment.End, segment.Text))
	}

	// return "", nil
	contentConfig := genai.GenerateContentConfig{
		SystemInstruction: &genai.Content{
			Parts: []*genai.Part{
				{
					Text: `Generate several insightful or interesting quotes based on the following transcript segments. Each segment is provided with its start and end time in seconds in the format [start_time-end_time] followed by the text.

Focus on extracting concise, impactful statements that capture key ideas or opinions expressed.

Please provide only the extracted quotes with timestamps at the start, one per line, without any additional commentary or formatting.

Transcript Segments:`,
				},
			},
		},
	}
	ctx := context.Background()

	s.logger.Info("Generating quotes...")
	result, err := s.aiClient.Models.GenerateContent(
		ctx,
		"gemini-2.5-flash-preview-04-17",
		genai.Text(segmentsText.String()),
		&contentConfig,
	)
	if err != nil {
		return "", fmt.Errorf("failed to generate content: %w", err)
	}
	s.logger.Info("Quotes generated", zap.String("result", result.Text()))
	err = s.repo.saveQuotes(videoID, result.Text())
	if err != nil {
		s.logger.Error("failed to save quotes", zap.Error(err))
		// Return the actual error from saving quotes
		return "", fmt.Errorf("failed to save quotes: %w", err)
	}
	s.logger.Info("Quotes saved")

	return result.Text(), nil

}

func (s *AnalyzerService) saveSummury(videoKey, summary string) error {
	err := s.repo.saveSummary(videoKey, summary)
	if err != nil {
		return fmt.Errorf("failed to save summary", err)
	}
	s.logger.Info("Summary saved")
	return nil
}
