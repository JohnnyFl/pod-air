package transcription

import (
	"github.com/labstack/echo/v4"
)

func InitRoutes(e *echo.Echo, h *TranscriptionHandler) {
	// e.Any("/upload/*", h.Upload)
	// e.POST("/upload", h.Upload)
	// e.HEAD("/upload", h.Upload)
	// e.PATCH("/upload", h.Upload)
	// e.OPTIONS("/upload", h.Upload) // Important for potential CORS

	// e.POST("/upload/", h.Upload)

	// // Handle HEAD and PATCH needed by Tus for operations on specific uploads (identified by path)
	// e.HEAD("/upload/*", h.Upload)
	// e.PATCH("/upload/*", h.Upload)

	// // Handle OPTIONS for CORS preflight for both the base path and wildcard paths
	// e.OPTIONS("/upload/", h.Upload)
	// e.OPTIONS("/upload/*", h.Upload)

	tusEchoHandler := echo.WrapHandler(h.tusdHandler)

	// e.Any("/upload/", h.Upload)
	e.Any("/upload/", tusEchoHandler)
	e.Any("/upload/*", tusEchoHandler)

	// e.Any("/upload/*", h.Upload)

}
