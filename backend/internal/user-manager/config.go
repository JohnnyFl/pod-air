package usermanager

type Config struct {
	Port        string `env:"PORT" envDefault:":8083"`
	JWTSecret   string `env:"JWT_SECRET" envDefault:""`
	DatabaseUrl string `env:"DATABASE_URL" envDefault:""`
}
