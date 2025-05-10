package usermanager

import (
	"context"
	"fmt"
	sq "github.com/Masterminds/squirrel"
	"github.com/jackc/pgx/v5"
	"github.com/johnnyfl/pod-air/pkg"
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
