package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email        string    `gorm:"uniqueIndex;not null" json:"email"`
	Password     string    `gorm:"not null" json:"-"`
	FirstName    string    `gorm:"not null" json:"firstName"`
	LastName     string    `gorm:"not null" json:"lastName"`
	PhoneNumber  string    `json:"phoneNumber"`
	DateOfBirth  time.Time `json:"dateOfBirth"`
	Address      string    `json:"address"`
	LastLoginAt  time.Time `json:"lastLoginAt"`
	IsActive     bool      `gorm:"default:true" json:"isActive"`
	Role         string    `gorm:"default:user" json:"role"`
}

type UserRegistration struct {
	Email       string    `json:"email"`
	Password    string    `json:"password"`
	FirstName   string    `json:"firstName"`
	LastName    string    `json:"lastName"`	
	PhoneNumber string    `json:"phoneNumber"`
	DateOfBirth time.Time `json:"dateOfBirth"`
	Address     string    `json:"address"`
}

type Doctor struct {
	Email       string    `json:"email"`
	Password    string    `json:"password"`
	FirstName   string    `json:"firstName"`
	LastName    string    `json:"lastName"`
	PhoneNumber string    `json:"phoneNumber"`
	Specialty   string    `json:"specialty"`
}	
