package services

import (
	"dr-teshome/internal/models"
	"dr-teshome/internal/repository"
)

type AppointmentService struct {
	appointmentRepo *repository.AppointmentRepository
}

func NewAppointmentService(appointmentRepo *repository.AppointmentRepository) *AppointmentService {
	return &AppointmentService{appointmentRepo: appointmentRepo}
}

func (s *AppointmentService) CreateAppointment(appointment *models.Appointment) error {
	return s.appointmentRepo.Create(appointment)
}

func (s *AppointmentService) GetAppointments() ([]models.Appointment, error) {
	return s.appointmentRepo.GetAppointments()
}

func (s *AppointmentService) GetUserAppointments(userID uint) ([]models.Appointment, error) {
	return s.appointmentRepo.GetUserAppointments(userID)
}
