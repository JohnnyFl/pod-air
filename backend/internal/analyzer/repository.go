package analyzer

import (
	"context"
	"go.uber.org/zap"

	"fmt"
	sq "github.com/Masterminds/squirrel"
	"github.com/jackc/pgx/v5"

	"github.com/JohnnyFl/pod-air/pkg"
)

type Repository struct {
	cfg      Config
	logger   *zap.Logger
	supabase *pgx.Conn
	psql     sq.StatementBuilderType
}

func NewRepository(cfg Config, logger *zap.Logger, supabase *pgx.Conn) *Repository {
	psql := sq.StatementBuilder.PlaceholderFormat(sq.Dollar)

	return &Repository{
		cfg:      cfg,
		logger:   logger,
		supabase: supabase,
		psql:     psql,
	}
}

func (r *Repository) getSummaryByPodcastID(ID string) (string, error) {
	var summary string

	sql, args, err := r.psql.Select("summary").
		From("summaries").
		Where(sq.Eq{"podcast_id": ID}).ToSql()
	if err != nil {
		return summary, fmt.Errorf("failed to build query: %w", err)
	}
	err = r.supabase.QueryRow(context.Background(), sql, args...).Scan(&summary)
	if err != nil {
		return summary, fmt.Errorf("failed to execute query for summary: %w", err)
	}
	return summary, nil
}

func (r *Repository) saveSummary(videoKey, summary string) error {
	//summaryData := Summary{
	//	PodcastID: videoKey,
	//	Summary:   summary,
	//}

	// Build the upsert query
	query, args, err := r.psql.Insert("summaries").
		Columns("podcast_id", "summary").
		Values(videoKey, summary).
		Suffix("ON CONFLICT (podcast_id) DO UPDATE SET summary = EXCLUDED.summary").
		ToSql()

	if err != nil {
		r.logger.Error("failed to build upsert query", zap.Error(err))
		return fmt.Errorf("failed to build upsert query: %w", err)
	}

	_, err = r.supabase.Exec(context.Background(), query, args...)
	if err != nil {
		r.logger.Error("failed to execute upsert query", zap.Error(err))
		return fmt.Errorf("failed to insert summary: %w", err)
	}
	//_, _, err := r.supabase.Client.From("summaries").Upsert(summaryData, "podcast_id", "", "").Eq("podcast_id", summaryData.PodcastID).Execute()
	//if err != nil {
	//	return fmt.Errorf("failed to insert summary: %w", err)
	//}
	return nil
}

// Changed return type to []pkg.Segment
func (r *Repository) getSegmentsByPodcastID(podcastID string) ([]pkg.Segment, error) {

	sql, args, err := r.psql.Select("segments").
		From("podcasts").
		Where("id = ?", podcastID).
		ToSql()

	if err != nil {
		return nil, fmt.Errorf("failed to build query: %w", err)
	}

	var segments []pkg.Segment
	err = r.supabase.QueryRow(context.Background(), sql, args...).Scan(&segments)
	if err != nil {
		return nil, fmt.Errorf("failed to execute query for segments: %w", err)
	}

	// Ensure you are selecting the correct column and filtering by ID
	//data, _, err := r.supabase.Client.From("podcasts").
	//	Select("segments", "", false). // Assuming 'segments' is the correct column name
	//	Eq("id", ID).                  // Assuming 'id' is the correct primary key column name
	//	Single().                      // Use Single() if you expect exactly one row, otherwise remove it or handle multiple rows
	//	Execute()

	// Declare a temporary struct to match the expected JSON object structure
	//var result struct {
	//	Segments []pkg.Segment `json:"segments"`
	//}
	// var segments []pkg.Segment // Remove this line
	//if err != nil {
	//	// Handle Supabase query errors (e.g., row not found if using Single())
	//	return nil, fmt.Errorf("failed to execute query for segments: %w", err)
	//}

	// Check if data is empty or null before unmarshalling
	//if len(data) == 0 || string(data) == "null" {
	//	// Return an empty slice if segment data is missing or null
	//	return []pkg.Segment{}, nil
	//}

	// Unmarshal into the temporary struct
	//err = json.Unmarshal(data, &result)
	//if err != nil {
	//	// Log the raw data for debugging if unmarshalling fails
	//	return nil, fmt.Errorf("failed to unmarshal segments object: %w", err)
	//}

	// Return the extracted slice
	//return result.Segments, nil
	return segments, nil
}

// Revert return type to struct containing the slice
func (r *Repository) getHeatmapsByPodcastID(ID string) ([]pkg.Heatmap, error) {
	// Select only the heatmap column and filter by ID
	sql, args, err := r.psql.Select("heatmap").
		From("podcasts").
		Where(sq.Eq{"id": ID}).ToSql()
	if err != nil {
		return nil, fmt.Errorf("failed to generate sql for heatmap")
	}

	var heatmaps []pkg.Heatmap
	err = r.supabase.QueryRow(context.Background(), sql, args...).Scan(&heatmaps)
	if err != nil {
		return nil, fmt.Errorf("failed to execute query for heatmaps: %w", err)
	}

	//data, _, err := r.supabase.Client.From("podcasts").
	//	Select("heatmap", "", false). // Select the heatmap column
	//	Eq("id", ID).                 // Filter by ID
	//	Single().                     // Expect a single row
	//	Execute()

	// Declare heatmaps as the struct type
	//var heatmaps struct {
	//	HeatMap []pkg.Heatmap `json:"heatmap"`
	//}
	//if err != nil {
	//	// Handle query errors
	//	// Return zero value of the struct on error
	//	return struct {
	//		HeatMap []pkg.Heatmap `json:"heatmap"`
	//	}{}, fmt.Errorf("failed to execute query for heatmaps: %w", err)
	//}

	// Check for empty or null data - Supabase might return an empty object {} or null
	// If the query returns no rows, the error above should catch it.
	// If the row exists but heatmap is null, data might be "null" or contain `{"heatmap":null}`
	//if len(data) == 0 || string(data) == "null" {
	//	// Return empty struct if data is missing (though query error likely catches this)
	//	return struct {
	//		HeatMap []pkg.Heatmap `json:"heatmap"`
	//	}{}, nil
	//}

	// Unmarshal into the struct
	//err = json.Unmarshal(data, &heatmaps)
	//if err != nil {
	//	// Log the raw data for debugging if unmarshalling fails
	//	// Consider adding logging here if needed: r.supabase.Logger.Error(...)
	//	// Return zero value of the struct on unmarshal error
	//	return struct {
	//		HeatMap []pkg.Heatmap `json:"heatmap"`
	//	}{}, fmt.Errorf("failed to unmarshal heatmaps object: %w", err)
	//}

	// Return the struct containing the slice
	return heatmaps, nil
}

func (r *Repository) saveHighlights(videoKey string, highlights string) error {
	//highlightsData := Highlights{
	//	PodcastID:  videoKey,
	//	Highlights: highlights,
	//}
	sql, args, err := r.psql.Insert("highlights").
		Columns("podcast_id", "highlights").
		Values(videoKey, highlights).
		Suffix("ON CONFLICT (podcast_id) DO UPDATE SET highlights = EXCLUDED.highlights").ToSql()

	if err != nil {
		return fmt.Errorf("failed to build upsert query: %w", err)
	}

	_, err = r.supabase.Exec(context.Background(), sql, args...)
	if err != nil {
		return fmt.Errorf("failed to insert highlight: %w", err)
	}
	//_, _, err := r.supabase.Client.From("highlights").Upsert(highlightsData, "podcast_id", "", "").Eq("podcast_id", highlightsData.PodcastID).Execute()
	//if err != nil {
	//	return fmt.Errorf("failed to insert highlight: %w", err)
	//}
	return nil
}

func (r *Repository) saveQuotes(podcastID string, quotes string) error {
	//quotesData := Quotes{
	//	PodcastID: videoKey,
	//	Quotes:    quotes,
	//}
	sql, args, err := r.psql.Insert("quotes").
		Columns("podcast_id", "quote").
		Values(podcastID, quotes).
		Suffix("ON CONFLICT (podcast_id) DO UPDATE SET quote = EXCLUDED.quote").ToSql()
	if err != nil {
		return fmt.Errorf("failed to build upsert query: %w", err)
	}
	_, err = r.supabase.Exec(context.Background(), sql, args...)

	//_, _, err := r.supabase.Client.From("quotes").Upsert(quotesData, "podcast_id", "", "").Eq("podcast_id", quotesData.PodcastID).Execute()
	if err != nil {
		return fmt.Errorf("failed to insert quotes: %w", err)
	}
	return nil
}
