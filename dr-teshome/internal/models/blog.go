package models

import (
	"time"
)

type Blog struct {
	Blog_id uint `json:"blog_id" gorm:"primary_key;autoIncrement:true"`
	Blog Staff `gorm:"foreignKey:Blog_id"`
	Title string `json:"title"`
	Content string `json:"content"`
	Author string `json:"author"`
	Created_at time.Time `json:"created_at"`
	Updated_at time.Time `json:"updated_at"`
}
