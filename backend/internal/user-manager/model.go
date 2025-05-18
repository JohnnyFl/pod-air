package usermanager

import (
	"encoding/json"
	"time"
)

type TrialDates struct {
	StartsAt time.Time `json:"starts_at"`
	EndsAt   time.Time `json:"ends_at"`
}

type BillingCycle struct {
	Frequency string `json:"frequency"`
	Interval  string `json:"interval"`
}

type TrialPeriod struct {
	Frequency string `json:"frequency"`
	Interval  string `json:"interval"`
}

type UnitPrice struct {
	Amount       string `json:"amount"`
	CurrencyCode string `json:"currency_code"`
}

type UnitPriceOverrides struct {
	CountryCodes []string  `json:"country_codes"`
	UnitPrice    UnitPrice `json:"unit_price"`
}

type Quantity struct {
	Minimum int `json:"minimum"`
	Maximum int `json:"maximum"`
}

type ImportMeta struct {
	ImportedFrom string `json:"imported_from"`
	ExternalID   string `json:"external_id"`
}

type Price struct {
	ID                 string               `json:"id"`
	ProductID          string               `json:"product_id"`
	Description        string               `json:"description"`
	Type               string               `json:"type"`
	Name               string               `json:"name"`
	BillingCycle       BillingCycle         `json:"billing_cycle"`
	TrialPeriod        TrialPeriod          `json:"trial_period"`
	TaxMode            string               `json:"tax_mode"`
	UnitPrice          UnitPrice            `json:"unit_price"`
	UnitPriceOverrides []UnitPriceOverrides `json:"unit_price_overrides"`
	Quantity           Quantity             `json:"quantity"`
	Status             string               `json:"status"`
	CustomData         map[string]string    `json:"custom_data"`
	ImportMeta         ImportMeta           `json:"import_meta"`
	CreatedAt          time.Time            `json:"created_at"`
	UpdatedAt          time.Time            `json:"updated_at"`
}

type Product struct {
	ID          string            `json:"id"`
	Name        string            `json:"name"`
	Description string            `json:"description"`
	Type        string            `json:"type"`
	TaxCategory string            `json:"tax_category"`
	ImageURL    string            `json:"image_url"`
	CustomData  map[string]string `json:"custom_data"`
	Status      string            `json:"status"`
	ImportMeta  ImportMeta        `json:"import_meta"`
	CreatedAt   time.Time         `json:"created_at"`
	UpdatedAt   time.Time         `json:"updated_at"`
}

type Item struct {
	Status             string            `json:"status"`
	Quantity           int               `json:"quantity"`
	Recurring          bool              `json:"recurring"`
	CreatedAt          time.Time         `json:"created_at"`
	UpdatedAt          time.Time         `json:"updated_at"`
	PreviouslyBilledAt time.Time         `json:"previously_billed_at"`
	NextBilledAt       time.Time         `json:"next_billed_at"`
	TrialDates         TrialDates        `json:"trial_dates"`
	Price              Price             `json:"price"`
	Product            Product           `json:"product"`
	CustomData         map[string]string `json:"custom_data"`
	ImportMeta         ImportMeta        `json:"import_meta"`
}
type CustomData struct {
	UserID string `json:"user_id"`
}

type SubscriptionActivatedData struct {
	ID           string     `json:"id"`
	Status       string     `json:"status"`
	CustomerID   string     `json:"customer_id"`
	StartedAt    time.Time  `json:"started_at"`
	NextBilledAt time.Time  `json:"next_billed_at"`
	CanceledAt   time.Time  `json:"canceled_at"`
	CustomData   CustomData `json:"custom_data"`
	//Items        []Item    `json:"items"`
}

type PaddleEvent struct {
	EventID        string          `json:"event_id"`
	EventType      string          `json:"event_type"`
	OccurredAt     time.Time       `json:"occurred_at"`
	Data           json.RawMessage `json:"data"`
	NotificationID string          `json:"notification_id"`
}
