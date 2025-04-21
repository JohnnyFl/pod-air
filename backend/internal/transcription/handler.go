package transcription

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/tus/tusd/v2/pkg/gcsstore"
	tusd "github.com/tus/tusd/v2/pkg/handler"
	"github.com/tus/tusd/v2/pkg/memorylocker"

	"go.uber.org/zap"
)

type TranscriptionHandler struct {
	logger      *zap.Logger
	service     *TranscriptionService
	tusdHandler *tusd.Handler
}

func NewHandler(s *TranscriptionService, log *zap.Logger, e *echo.Echo) *TranscriptionHandler {
	th := newTusHandler(log)
	return &TranscriptionHandler{
		logger:      log,
		service:     s,
		tusdHandler: th,
	}
}

func (h *TranscriptionHandler) Upload(c echo.Context) error {
	h.tusdHandler.ServeHTTP(c.Response().Writer, c.Request())
	return nil
}

func newTusHandler(log *zap.Logger) *tusd.Handler {
	gcService, err := gcsstore.NewGCSService("../../pod_pilot_upload.json")

	if err != nil {
		log.Error("error creating gcs service", zap.Error(err))
	}
	store := gcsstore.New("pod-pilot", gcService)

	locker := memorylocker.New()

	composer := tusd.NewStoreComposer()
	store.UseIn(composer)
	locker.UseIn(composer)

	handler, err := tusd.NewHandler(tusd.Config{
		BasePath:              "/upload/",
		StoreComposer:         composer,
		NotifyCompleteUploads: true,
	})

	if err != nil {
		log.Error("error creating tus handler", zap.Error(err))
	}

	go func() {
		for {
			event := <-handler.CompleteUploads
			log.Info("upload completed", zap.String("upload", event.Upload.ID))
		}
	}()

	http.Handle("/upload/", http.StripPrefix("/upload/", handler))
	http.Handle("/upload", http.StripPrefix("/upload", handler))
	err = http.ListenAndServe(":9090", nil)
	if err != nil {
		log.Fatal("error listening tus server", zap.Error(err))
	}

	return handler

}
