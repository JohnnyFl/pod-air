package tools

import (
	"fmt"

	"github.com/supabase-community/supabase-go"
)

type Supabase struct {
	Client *supabase.Client
}

func NewSupabase(url, key string) *Supabase {
	client, err := supabase.NewClient(url, key, nil)
	if err != nil {
		fmt.Errorf("failed to create supabase client: %v", err)
	}
	return &Supabase{
		Client: client,
	}
}
