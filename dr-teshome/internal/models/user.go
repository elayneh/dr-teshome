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
	ID           uint      `json:"id" gorm:"primaryKey autoIncrement:true"`
}

type Staff struct {
	gorm.Model
	Email        string    `gorm:"uniqueIndex;not null" json:"email"`
	Password     string    `gorm:"not null" json:"-"`
	FirstName    string    `gorm:"not null" json:"firstName"`
	LastName     string    `gorm:"not null" json:"lastName"`
	PhoneNumber string    `json:"phoneNumber"`
	LastLoginAt time.Time `json:"lastLoginAt"`
	IsActive    bool      `gorm:"default:true" json:"isActive"`
	Role        string    `gorm:"default:staff" json:"role"`
	ID          uint      `json:"id" gorm:"primaryKey autoIncrement:true"`
}

type UserRegistration struct {
	Email       string    `json:"email"`
	Password    string    `json:"password"`
	FirstName   string    `json:"firstName" gorm:"not null"`
	LastName    string    `json:"lastName" gorm:"not null"`	
	PhoneNumber string    `json:"phoneNumber"`
	DateOfBirth time.Time `json:"dateOfBirth"`
	Address     string    `json:"address"`
	ID          uint      `json:"id" gorm:"primaryKey autoIncrement:true"`
}

type StaffRegistration struct {
	Email       string    `json:"email" gorm:"not null"`
	Password    string    `json:"password" gorm:"not null"`
	FirstName   string    `json:"firstName" gorm:"not null"`
	LastName    string    `json:"lastName" gorm:"not null"`
	PhoneNumber string    `json:"phoneNumber" gorm:"not null"`
	Role        string    `gorm:"default:staff" json:"role"`
	ID          uint      `json:"id" gorm:"primaryKey autoIncrement:true"`
}	
