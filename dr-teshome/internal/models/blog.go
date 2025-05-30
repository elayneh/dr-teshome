package models

import (
	"time"

	"github.com/google/uuid"
)

type Blog struct {
	Blog_id uuid.UUID `json:"blog_id" gorm:"type:uuid;primary_key;default:uuid_generate_v4()"`
	Title string `json:"title"`
	Content string `json:"content"`
	Author string `json:"author"`
	Created_at time.Time `json:"created_at"`
	Updated_at time.Time `json:"updated_at"`
}
