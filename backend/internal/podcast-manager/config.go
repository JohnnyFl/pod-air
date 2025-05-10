package podcastmanager

type Config struct {
	Port               string `env:"PORT" envDefault:":8082"`
	SupabaseURL        string `env:"SUPABASE_URL" envDefault:""`
	SupabaseAnonKey    string `env:"SUPABASE_ANON_KEY" envDefault:""`
	SupabaseServiceKey string `env:"SUPABASE_SERVICE_KEY" envDefault:""`
	JWTSecret          string `env:"JWT_SECRET" envDefault:""`
	DatabaseUrl        string `env:"DATABASE_URL" envDefault:""`
}
