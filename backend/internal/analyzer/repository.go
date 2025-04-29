package analyzer

import (
	// "encoding/json"
	"encoding/json"
	"fmt"

	"github.com/johnnyfl/pod-pilot/pkg"
	"github.com/johnnyfl/pod-pilot/tools"
)

type AnalyzerRepository struct {
	cfg      AnalyzerConfig
	supabase *tools.Supabase
}

func NewRepository(cfg AnalyzerConfig, supabase *tools.Supabase) *AnalyzerRepository {
	return &AnalyzerRepository{
		cfg:      cfg,
		supabase: supabase,
	}
}

func (r *AnalyzerRepository) getSummaryByID(ID string) (string, error) {
	// TODO: implement
	return "", nil
}

func (r *AnalyzerRepository) saveSummary(videoKey, summary string) error {
	summaryData := Summary{
		PodcastID: videoKey,
		Summary:   summary,
	}
	_, _, err := r.supabase.Client.From("Summaries").Upsert(summaryData, "podcast_id", "", "").Eq("podcast_id", summaryData.PodcastID).Execute()
	if err != nil {
		return fmt.Errorf("failed to insert summary: %w", err)
	}
	return nil
}

// Changed return type to []pkg.Segment
func (r *AnalyzerRepository) getSegmentsByVideoID(ID string) ([]pkg.Segment, error) {
	// Ensure you are selecting the correct column and filtering by ID
	data, _, err := r.supabase.Client.From("Podcasts").
		Select("segments", "", false). // Assuming 'segments' is the correct column name
		Eq("id", ID).                  // Assuming 'id' is the correct primary key column name
		Single().                      // Use Single() if you expect exactly one row, otherwise remove it or handle multiple rows
		Execute()

	// Declare a temporary struct to match the expected JSON object structure
	var result struct {
		Segments []pkg.Segment `json:"segments"`
	}
	// var segments []pkg.Segment // Remove this line
	if err != nil {
		// Handle Supabase query errors (e.g., row not found if using Single())
		return nil, fmt.Errorf("failed to execute query for segments: %w", err)
	}

	// Check if data is empty or null before unmarshalling
	if len(data) == 0 || string(data) == "null" {
		// Return an empty slice if segment data is missing or null
		return []pkg.Segment{}, nil
	}

	// Unmarshal into the temporary struct
	err = json.Unmarshal(data, &result)
	if err != nil {
		// Log the raw data for debugging if unmarshalling fails
		return nil, fmt.Errorf("failed to unmarshal segments object: %w", err)
	}

	// Return the extracted slice
	return result.Segments, nil
}

// Revert return type to struct containing the slice
func (r *AnalyzerRepository) getHeatmapsByVideoID(ID string) (struct {
	HeatMap []pkg.Heatmap `json:"heatmap"`
}, error) {
	// Select only the heatmap column and filter by ID
	data, _, err := r.supabase.Client.From("Podcasts").
		Select("heatmap", "", false). // Select the heatmap column
		Eq("id", ID).                 // Filter by ID
		Single().                     // Expect a single row
		Execute()

	// Declare heatmaps as the struct type
	var heatmaps struct {
		HeatMap []pkg.Heatmap `json:"heatmap"`
	}
	if err != nil {
		// Handle query errors
		// Return zero value of the struct on error
		return struct {
			HeatMap []pkg.Heatmap `json:"heatmap"`
		}{}, fmt.Errorf("failed to execute query for heatmaps: %w", err)
	}

	// Check for empty or null data - Supabase might return an empty object {} or null
	// If the query returns no rows, the error above should catch it.
	// If the row exists but heatmap is null, data might be "null" or contain `{"heatmap":null}`
	if len(data) == 0 || string(data) == "null" {
		// Return empty struct if data is missing (though query error likely catches this)
		return struct {
			HeatMap []pkg.Heatmap `json:"heatmap"`
		}{}, nil
	}

	// Unmarshal into the struct
	err = json.Unmarshal(data, &heatmaps)
	if err != nil {
		// Log the raw data for debugging if unmarshalling fails
		// Consider adding logging here if needed: r.supabase.Logger.Error(...)
		// Return zero value of the struct on unmarshal error
		return struct {
			HeatMap []pkg.Heatmap `json:"heatmap"`
		}{}, fmt.Errorf("failed to unmarshal heatmaps object: %w", err)
	}

	// Return the struct containing the slice
	return heatmaps, nil
}

func (r *AnalyzerRepository) saveHighlights(videoKey string, highlights string) error {
	highlightsData := Highlights{
		PodcastID:  videoKey,
		Highlights: highlights,
	}
	_, _, err := r.supabase.Client.From("Highlights").Upsert(highlightsData, "podcast_id", "", "").Eq("podcast_id", highlightsData.PodcastID).Execute()
	if err != nil {
		return fmt.Errorf("failed to insert highlight: %w", err)
	}
	return nil
}

func (r *AnalyzerRepository) saveQuotes(videoKey string, quotes string) error {
	quotesData := Quotes{
		PodcastID: videoKey,
		Quotes:    quotes,
	}
	_, _, err := r.supabase.Client.From("Quotes").Upsert(quotesData, "podcast_id", "", "").Eq("podcast_id", quotesData.PodcastID).Execute()
	if err != nil {
		return fmt.Errorf("failed to insert summary: %w", err)
	}
	return nil
}
