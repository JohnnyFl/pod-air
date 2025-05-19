package uploader

type Config struct {
	Port          string `env:"PORT" envDefault:"8080"`
	GCSBucketName string `env:"GCS_BUCKET_NAME" envDefault:"pod-pilot"`
	// KafkaHosts         string `env:"KAFKA_HOSTS" envDefault:"localhost:9092, localhost:9093"`
	KafkaHosts         string `env:"KAFKA_HOSTS" envDefault:"localhost:9094"`
	SupabaseURL        string `env:"SUPABASE_URL" envDefault:""`
	SupabaseAnonKey    string `env:"SUPABASE_ANON_KEY" envDefault:""`
	SupabaseServiceKey string `env:"SUPABASE_SERVICE_KEY" envDefault:""`
	JWTSecret          string `env:"JWT_SECRET" envDefault:""`
}
