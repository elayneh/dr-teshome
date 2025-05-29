package models

import "time"


type Appointment struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string    `json:"email"`
	Date      string `json:"date"`
	Reason    string    `json:"reason"`
	PhoneNumber string    `json:"phoneNumber"`
	CreatedAt time.Time `json:"createdAt" default:"time.Now()"`
	UpdatedAt time.Time `json:"updatedAt" default:"time.Now()"`
	Status    string    `json:"status" default:"pending"`
}