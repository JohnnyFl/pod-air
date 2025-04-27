package uploader

type UploaderConfig struct {
	Port               string `env:"PORT" envDefault:":8080"`
	GCSBucketName      string `env:"GCS_BUCKET_NAME" envDefault:"pod-pilot"`
	KafkaHosts         string `env:"KAFKA_HOSTS" envDefault:"localhost:9092, localhost:9093"`
	SupabaseURL        string `env:"SUPABASE_URL" envDefault:""`
	SupabaseAnonKey    string `env:"SUPABASE_ANON_KEY" envDefault:""`
	SupabaseServiceKey string `env:"SUPABASE_SERVICE_KEY" envDefault:""`
}
