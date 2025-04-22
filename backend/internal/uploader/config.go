package uploader

type UploaderConfig struct {
	Port            string `env:"PORT" envDefault:":8080"`
	CredentialsPath string `env:"GCP_CREDENTIALS_PATH" envDefault:"../../pod_pilot_upload.json"`
	GCSBucketName   string `env:"GCS_BUCKET_NAME" envDefault:"pod-pilot"`
}
