package uploader

import (
	"net/http"

	"github.com/labstack/echo/v4"
	tusd "github.com/tus/tusd/v2/pkg/handler"
)

func InitRoutes(e *echo.Echo, h *UploaderHandler, tusHandler *tusd.Handler) {

	e.POST("/uploads/url", h.UploadByUrl)

	// ================ TUS ======================
	tusHTTPHandler := http.StripPrefix("/uploads/", tusHandler)
	tusEchoHandler := echo.WrapHandler(tusHTTPHandler)

	e.POST("/uploads/", tusEchoHandler)
	e.OPTIONS("/uploads/", tusEchoHandler)
	e.Any("/uploads/*", tusEchoHandler)

}
