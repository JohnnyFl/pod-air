package uploader

import (
	"fmt"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/tus/tusd/v2/pkg/gcsstore"
	tusd "github.com/tus/tusd/v2/pkg/handler"
	"github.com/tus/tusd/v2/pkg/memorylocker"

	"go.uber.org/zap"
)

type UploaderHandler struct {
	cfg     UploaderConfig
	service *UploaderService
	logger  *zap.Logger
}

func NewHandler(cfg UploaderConfig, s *UploaderService, log *zap.Logger) (*UploaderHandler, *tusd.Handler, error) {
	tusHandler, err := newTusHandler(cfg, log)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to create tus handler: %w", err)
	}

	handler := &UploaderHandler{
		logger:  log,
		service: s,
	}
	return handler, tusHandler, nil
}

func newTusHandler(cfg UploaderConfig, log *zap.Logger) (*tusd.Handler, error) {
	// Consider making the credentials path configurable (e.g., via env var)
	// The GCS client library automatically uses GOOGLE_APPLICATION_CREDENTIALS if set.
	// Pass an empty string to rely on this default behavior.
	gcService, err := gcsstore.NewGCSService("")
	if err != nil {
		log.Error("error creating gcs service", zap.Error(err))
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
		log.Error("error creating tus handler", zap.Error(err))
		return nil, fmt.Errorf("tusd.NewHandler: %w", err)
	}

	go func() {
		for {
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

func (h *UploaderHandler) UploadByUrl(c echo.Context) error {
	var url UploadURL

	if err := c.Bind(&url); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	go func(url string) {
		startTime := time.Now()
		h.logger.Info("Starting background download", zap.String("url", url))
		// if err := h.service.UploadByUrl(url); err != nil {
		// 	h.logger.Error("Background download failed", zap.Error(err))
		// 	return
		// }
		if err := h.service.StreamUploadByUrl(url); err != nil {
			h.logger.Error("Background download failed", zap.Error(err))
			return
		}
		h.logger.Info("Background download completed", zap.String("url", url), zap.Duration("duration", time.Since(startTime)))

	}(url.URL)

	c.JSON(http.StatusOK, map[string]string{"status": "ok", "message": "Upload started"})
	return nil

}
