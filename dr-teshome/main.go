package main

import (
	"dr-teshome/config"
	"dr-teshome/internal/api"
	"dr-teshome/internal/handlers"
	"dr-teshome/internal/models"
	"dr-teshome/internal/repository"
	"dr-teshome/internal/services"
	"dr-teshome/pkg/database"
	"fmt"
	"log"
	"net/http"
)

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// func authenticateUser(next http.Handler) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		token := r.Header.Get("Authorization")
// 		if token == "" {
// 			http.Error(w, "Unauthorized", http.StatusUnauthorized)
// 			return
// 		}

// 		_, err := authService.AuthenticateUser(token)
// 		if err != nil {
// 			http.Error(w, err.Error(), http.StatusUnauthorized)
// 			return
// 		}

// 		next.ServeHTTP(w, r)
// 	})
// }

// func authenticateStaff(next http.Handler) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		token := r.Header.Get("Authorization")
// 		if token == "" {
// 			http.Error(w, "Unauthorized", http.StatusUnauthorized)
// 			return
// 		}

// 		_, err := authService.AuthenticateStaff(token)
// 		if err != nil {
// 			http.Error(w, err.Error(), http.StatusUnauthorized)
// 			return
// 		}

// 		next.ServeHTTP(w, r)
// 	})
// }

func main() {
	// Load configuration
	cfg := config.LoadConfig()

	// Initialize database
	db, err := database.NewPostgresDB(cfg)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Auto migrate the schema
	err = db.AutoMigrate(&models.User{}, &models.Appointment{}, &models.Blog{}, &models.StaffRegistration{})
	if err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

	// Initialize repositories
	userRepo := repository.NewUserRepository(db)
	appointmentRepo := repository.NewAppointmentRepository(db)
	blogRepo := repository.NewBlogRepository(db)

	// Initialize services
	userService := services.NewUserService(userRepo)
	appointmentService := services.NewAppointmentService(appointmentRepo)
	blogService := services.NewBlogService(blogRepo)

	// Initialize handlers
	userHandler := handlers.NewUserHandler(userService)
	appointmentHandler := handlers.NewAppointmentHandler(appointmentService)
	blogHandler := handlers.NewBlogHandler(blogService)

	// Setup routes
	router := api.SetupRoutes(userHandler, appointmentHandler, blogHandler)

	// Start the server
	port := cfg.ServerPort
	fmt.Printf("Server starting on port %s...\n", port)
	if err := http.ListenAndServe(":"+port, corsMiddleware(router)); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
