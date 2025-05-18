package usermanager

import (
	"context"
	"fmt"
	"github.com/JohnnyFl/pod-air/pkg"
	sq "github.com/Masterminds/squirrel"
	"github.com/NdoleStudio/lemonsqueezy-go"
	"github.com/jackc/pgx/v5"
	"go.uber.org/zap"
)

type Repository struct {
	supabase *pgx.Conn
	logger   *zap.Logger
	psql     sq.StatementBuilderType
}

func NewRepository(supabase *pgx.Conn, logger *zap.Logger) *Repository {
	psql := sq.StatementBuilder.PlaceholderFormat(sq.Dollar)

	return &Repository{
		supabase: supabase,
		logger:   logger,
		psql:     psql,
	}
}

func (r *Repository) GetSubscription(userID string) (pkg.SubscriptionInfo, error) {
	var subscription pkg.SubscriptionInfo

	sql, args, err := r.psql.Select("subscription, uploads_amount, created_at, uploads_reset_at").From("users_subscriptions").Where(sq.Eq{"user_id": userID}).ToSql()
	if err != nil {
		r.logger.Error("failed to build sql", zap.Error(err))
		return subscription, fmt.Errorf("failed to build sql: %w", err)
	}
	err = r.supabase.QueryRow(context.Background(), sql, args...).Scan(&subscription.Subscription, &subscription.UploadsAmount, &subscription.CreatedAt, &subscription.UploadsResetAt)
	if err != nil {
		r.logger.Error("failed to get subscription", zap.Error(err))
		return subscription, fmt.Errorf("failed to get subscription: %w", err)
	}
	return subscription, nil
}

func (r *Repository) UpdateSubscription(subscription lemonsqueezy.WebhookRequestSubscription) error {
	//TODO: make it dynamic. It should also set as a free. Now it is only Pro
	//sql, args, err := r.psql.Update("users_subscriptions").
	//	Set("subscription", "pro").
	//	Set("subscription_id", subscription.ID).
	//	Set("status", subscription.Status).
	//	Set("next_billed_at", subscription.NextBilledAt).
	//	Set("started_at", subscription.StartedAt).
	//	Set("canceled_at", subscription.CanceledAt).
	//	Set("customer_id", subscription.CustomerID).
	//	Where(sq.Eq{"user_id": subscription.CustomData.UserID}).ToSql()
	r.logger.Info("subs", zap.Any("Sub", subscription))

	userID := subscription.Meta.CustomData["user_id"]
	fmt.Printf("userid %+v", userID)
	var subscriptionName string
	if subscription.Data.Attributes.Cancelled {
		subscriptionName = "Free"
	} else {
		subscriptionName = "Pro"
	}

	sql, args, err := r.psql.Insert("users_subscriptions").
		Columns(
			"user_id",
			"subscription",
			"subscription_id",
			"created_at",
			"status",
			"started_at",
			"canceled_at",
			"customer_id",
			"next_billed_at",
		).
		Values(
			userID,
			subscriptionName,
			subscription.Data.ID,
			subscription.Data.Attributes.CreatedAt,
			subscription.Data.Attributes.Status,
			subscription.Data.Attributes.CreatedAt,
			subscription.Data.Attributes.UpdatedAt,
			subscription.Data.Attributes.CustomerID,
			subscription.Data.Attributes.RenewsAt,
		).
		Suffix(`
	   ON CONFLICT (user_id) DO UPDATE SET
	       subscription = EXCLUDED.subscription,
	       subscription_id = EXCLUDED.subscription_id,
	       status = EXCLUDED.status,
	       next_billed_at = EXCLUDED.next_billed_at,
	       started_at = EXCLUDED.started_at,
	       canceled_at = EXCLUDED.canceled_at,
	       customer_id = EXCLUDED.customer_id
	`).
		PlaceholderFormat(sq.Dollar).
		ToSql()

	if err != nil {
		r.logger.Error("failed to build sql", zap.Error(err))
		return fmt.Errorf("failed to build sql: %w", err)
	}
	_, err = r.supabase.Exec(context.Background(), sql, args...)
	if err != nil {
		r.logger.Error("failed to update subscription", zap.Error(err))
		return fmt.Errorf("failed to update subscription: %w", err)
	}
	r.logger.Info("Updated subscription")
	return nil
}
