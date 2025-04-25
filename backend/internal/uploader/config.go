package uploader

type UploaderConfig struct {
	Port          string `env:"PORT" envDefault:":8080"`
	GCSBucketName string `env:"GCS_BUCKET_NAME" envDefault:"pod-pilot"`
	KafkaHosts    string `env:"KAFKA_HOSTS" envDefault:"localhost:9092, localhost:9093"`
}
