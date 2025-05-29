package handlers

import (
	"encoding/json"
	"io"
	"log"
	"net/http"

	"dr-teshome/internal/models"
	"dr-teshome/internal/services"
)

type AppointmentHandler struct {
	appointmentService *services.AppointmentService
}

func NewAppointmentHandler(appointmentService *services.AppointmentService) *AppointmentHandler {
	return &AppointmentHandler{appointmentService: appointmentService}
}

func (h *AppointmentHandler) CreateAppointment(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Read and log the request body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		log.Printf("Error reading request body: %v", err)
		http.Error(w, "Error reading request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()
	log.Printf("Received request body: %s", string(body))

	var appointment models.Appointment
	if err := json.Unmarshal(body, &appointment); err != nil {
		log.Printf("Error unmarshaling request body: %v", err)
		http.Error(w, "Invalid request body format", http.StatusBadRequest)
		return
	}

	// Validate required fields
	if appointment.FirstName == "" || appointment.LastName == "" || appointment.Date == "" {
		log.Printf("Missing required fields in appointment: %+v", appointment)
		http.Error(w, "Missing required fields", http.StatusBadRequest)
		return
	}

	err = h.appointmentService.CreateAppointment(&appointment)
	if err != nil {
		log.Printf("Error creating appointment: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Appointment created successfully"})
}

func (h *AppointmentHandler) GetAppointments(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	appointments, err := h.appointmentService.GetAppointments()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(appointments)
}
