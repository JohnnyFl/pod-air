package analyzer

import (
	"github.com/labstack/echo/v4"
)

func InitRoutes(e *echo.Echo, h *AnalyzerHandler) {

	e.GET("/summary/:ID", h.GetSummaryById)

}
