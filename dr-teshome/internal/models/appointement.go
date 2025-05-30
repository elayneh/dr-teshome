package models

import "time"


type Appointment struct {
	ID           uint     `json:"id" gorm:"primaryKey autoIncrement:true"`
	FirstName   string    `json:"firstName"`
	LastName    string    `json:"lastName"`
	Email       string    `json:"email"`
	Date        string    `json:"date"`
	Reason      string    `json:"reason"`
	PhoneNumber string    `json:"phoneNumber"`
	Status      string    `json:"status" gorm:"default:pending"`
	CreatedAt   time.Time `json:"createdAt" gorm:"autoCreateTime"`
	UpdatedAt   time.Time `json:"updatedAt" gorm:"autoUpdateTime"`

	// Foreign key to User
	PatientID uint `json:"patientId"` // FK field
	Patient   User `gorm:"foreignKey:PatientID;references:ID" json:"patient"`
}
