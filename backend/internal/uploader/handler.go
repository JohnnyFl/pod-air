package uploader

import (
	"fmt"
	tusd "github.com/tus/tusd/v2/pkg/handler"
	"net/http"
	"resty.dev/v3"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"github.com/tus/tusd/v2/pkg/gcsstore"

	"github.com/tus/tusd/v2/pkg/memorylocker"
	"go.uber.org/zap"
)

type Handler struct {
	cfg     Config
	service *Service
	logger  *zap.Logger
}

func NewHandler(cfg Config, s *Service, log *zap.Logger) (*Handler, *tusd.Handler, error) {
	tusHandler, err := newTusHandler(cfg, log)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to create tus handler: %w", err)
	}

	handler := &Handler{
		logger:  log,
		service: s,
	}
	return handler, tusHandler, nil
}

func newTusHandler(cfg Config, log *zap.Logger) (*tusd.Handler, error) {
	// Consider making the credentials path configurable (e.g., via env var)
	// The GCS client library automatically uses GOOGLE_APPLICATION_CREDENTIALS if set.
	// Pass an empty string to rely on this default behavior.
	gcService, err := gcsstore.NewGCSService("")
	if err != nil {
		return nil, fmt.Errorf("gcsstore.NewGCSService: %w", err)
	}
	store := gcsstore.New(cfg.GCSBucketName, gcService)

	locker := memorylocker.New() // For single-instance deployments, memory locker is fine. For HA, use a distributed locker (e.g., Redis, etcd).

	composer := tusd.NewStoreComposer()
	store.UseIn(composer)
	locker.UseIn(composer)

	config := tusd.Config{
		BasePath:              "/uploads/", // This should match the path used in Echo routes
		StoreComposer:         composer,
		NotifyCompleteUploads: true,
	}

	handler, err := tusd.NewHandler(config)
	if err != nil {
		return nil, fmt.Errorf("tusd.NewHandler: %w", err)
	}

	go func() {
		for {
			//TODO: handle while added as file via tus
			event := <-handler.CompleteUploads
			log.Info("upload completed",
				zap.String("uploadID", event.Upload.ID),
				zap.Int64("size", event.Upload.Size),
				zap.Any("metadata", event.Upload.MetaData),
			)
		}
	}()

	return handler, nil
}

func (h *Handler) StreamUploadByUrl(c echo.Context) error {

	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userID := claims["sub"].(string)

	client := resty.New()
	res, err := client.R().SetAuthToken(user.Raw).Get("http://localhost:8083/api/subscription")
	if err != nil {
		h.logger.Error("failed to get subscription", zap.Error(err))
		//c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return err
	}
	h.logger.Info("Subscription", zap.Any("subscription", res))

	var url UploadURL

	if err := c.Bind(&url); err != nil {
		return err
		//return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	go func(url string) {
		if err := h.service.StreamUploadByUrl(userID, url); err != nil {
			h.logger.Error("Background download failed", zap.Error(err))
			return
		}

	}(url.URL)

	return c.JSON(http.StatusOK, map[string]string{"status": "ok", "message": "Upload started"})

}
