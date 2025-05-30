package api

import (
	"dr-teshome/internal/handlers"
	"dr-teshome/internal/middleware"
	"net/http"
)

func SetupRoutes(userHandler *handlers.UserHandler, appointmentHandler *handlers.AppointmentHandler, blogHandler *handlers.BlogHandler) http.Handler {
	mux := http.NewServeMux()

	// Auth routes
	mux.HandleFunc("/api/auth/register", userHandler.Register)
	mux.HandleFunc("/api/auth/login", userHandler.Login)

	// Staff routes
	mux.HandleFunc("/api/auth/register-staff", userHandler.RegisterStaff)
	mux.HandleFunc("/api/auth/login-staff", userHandler.LoginStaff)

	// Appointment routes
	mux.Handle("/api/create-appointment", middleware.UserAuth(http.HandlerFunc(appointmentHandler.CreateAppointment)))
	mux.Handle("/api/get-appointments", middleware.StaffAuth(http.HandlerFunc(appointmentHandler.GetAppointments)))
	mux.Handle("/api/my-appointments", middleware.UserAuth(http.HandlerFunc(appointmentHandler.GetUserAppointments)))

	// Blog routes
	mux.Handle("/api/create-blog", middleware.StaffAuth(http.HandlerFunc(blogHandler.CreateBlog)))
	mux.Handle("/api/get-blogs", http.HandlerFunc(blogHandler.GetBlogs))
	mux.Handle("/api/get-blog-by-id", http.HandlerFunc(blogHandler.GetBlogByID))

	// Health check endpoint
	mux.HandleFunc("/api/health", handlers.HealthCheck)

	return mux
} 