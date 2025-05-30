package repository

import (
	"dr-teshome/internal/models"

	"gorm.io/gorm"
)

type AppointmentRepository struct {
	db *gorm.DB
}

func NewAppointmentRepository(db *gorm.DB) *AppointmentRepository {
	return &AppointmentRepository{db: db}
}

func (r *AppointmentRepository) Create(appointment *models.Appointment) error {
	return r.db.Create(appointment).Error
}

func (r *AppointmentRepository) FindByEmail(patientId string) (*models.Appointment, error) {
	var appointment models.Appointment
	err := r.db.Where("patient_id = ?", patientId).First(&appointment).Error
	if err != nil {
		return nil, err
	}
	return &appointment, nil
}

func (r *AppointmentRepository) Update(appointment *models.Appointment) error {
	return r.db.Save(appointment).Error
}

func (r *AppointmentRepository) Delete(patient_id string) error {
	return r.db.Delete(&models.Appointment{}, patient_id).Error
}

func (r *AppointmentRepository) GetAppointments() ([]models.Appointment, error) {
	var appointments []models.Appointment
	err := r.db.Find(&appointments).Error
	return appointments, err
}

func (r *AppointmentRepository) GetUserAppointments(userID uint) ([]models.Appointment, error) {
	var appointments []models.Appointment
	err := r.db.Where("patient_id = ?", userID).Find(&appointments).Error
	return appointments, err
}

