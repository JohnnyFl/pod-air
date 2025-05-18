package usermanager

import (
	"fmt"
	"github.com/NdoleStudio/lemonsqueezy-go"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
)

type Handler struct {
	svc    *Service
	cfg    Config
	logger *zap.Logger
}

func NewHandler(svc *Service, cfg Config, logger *zap.Logger) *Handler {
	return &Handler{
		svc:    svc,
		cfg:    cfg,
		logger: logger,
	}
}

func (h *Handler) GetSubscription(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userID := claims["sub"].(string)

	subscription, err := h.svc.GetSubscription(userID)
	if err != nil {
		return c.JSON(500, map[string]string{"error": err.Error()})
	}
	return c.JSON(200, subscription)

}

func (h *Handler) HandleWebhook(c echo.Context) error {
	fmt.Println("Heelo webhook")
	//sig := c.Request().Header.Get("X-Signature")
	//c.Logger().Info("Signature: ", zap.String("sig", sig))
	//if sig != "secret" {
	//	return c.JSON(404, map[string]string{"error": "Invalid signature"})
	//}
	eventName := c.Request().Header.Get("X-Event-Name")
	switch eventName {
	case lemonsqueezy.WebhookEventSubscriptionCreated:
		var request lemonsqueezy.WebhookRequestSubscription
		err := c.Bind(&request)
		if err != nil {
			h.logger.Error("Error here: ", zap.Error(err))
			return c.JSON(500, map[string]string{"error": err.Error()})
		}
		err = h.svc.UpdateSubscription(request)
		if err != nil {
			h.logger.Error("Failed to update subscription", zap.Error(err))
			return c.JSON(500, map[string]string{"error": err.Error()})
		}
		//h.logger.Info("Req: ", zap.Any("test", request))
	case lemonsqueezy.WebhookEventSubscriptionCancelled:
		var request lemonsqueezy.WebhookRequestSubscription
		err := c.Bind(&request)
		if err != nil {
			h.logger.Error("Error here: ", zap.Error(err))
			return c.JSON(500, map[string]string{"error": err.Error()})
		}
		err = h.svc.UpdateSubscription(request)
		if err != nil {
			h.logger.Error("Failed to update subscription", zap.Error(err))
			return c.JSON(500, map[string]string{"error": err.Error()})
		}
	}

	//webhookVerifier := paddle.NewWebhookVerifier(h.cfg.PaddleSecretKey)
	//_, err := webhookVerifier.Verify(c.Request())
	//if err != nil {
	//	h.logger.Error("Failed to verify webhook", zap.Error(err))
	//	return c.JSON(500, map[string]string{"error": err.Error()})
	//}
	//
	//var event PaddleEvent
	//err = c.Bind(&event)
	//if err != nil {
	//	h.logger.Error("Failed to bind event", zap.Error(err))
	//	return c.JSON(500, map[string]string{"error": err.Error()})
	//}
	////h.logger.Info("Event: ", zap.Any("event", event))
	//var subscription SubscriptionActivatedData
	//if event.EventType == "subscription.activated" {
	//	err = json.Unmarshal(event.Data, &subscription)
	//	if err != nil {
	//		h.logger.Error("Failed to unmarshal subscription", zap.Error(err))
	//		return c.JSON(500, map[string]string{"error": err.Error()})
	//	}
	//	err = h.svc.UpdateSubscription(subscription)
	//	if err != nil {
	//		h.logger.Error("Failed to update subscription", zap.Error(err))
	//		return c.JSON(500, map[string]string{"error": err.Error()})
	//	}
	//	//h.logger.Info("Subscription activated:", zap.Any("subscription", subscription))
	//}

	return c.JSON(200, map[string]string{"message": "Webhook received"})
}
