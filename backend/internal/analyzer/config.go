package analyzer

type AnalyzerConfig struct {
	Port string `env:"PORT" envDefault:":8081"`
	// KafkaHosts         string `env:"KAFKA_HOSTS" envDefault:"localhost:9092, localhost:9093"`
	KafkaHosts         string `env:"KAFKA_HOSTS" envDefault:"localhost:9094"`
	GoogleAIKey        string `env:"GOOGLE_AI_KEY" envDefault:""`
	SupabaseURL        string `env:"SUPABASE_URL" envDefault:""`
	SupabaseAnonKey    string `env:"SUPABASE_ANON_KEY" envDefault:""`
	SupabaseServiceKey string `env:"SUPABASE_SERVICE_KEY" envDefault:""`
}
