package main

import (
	"dr-teshome/config"
	"dr-teshome/internal/handlers"
	"dr-teshome/internal/models"
	"dr-teshome/internal/repository"
	"dr-teshome/internal/services"
	"dr-teshome/pkg/database"
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

func main() {
	// Load configuration
	cfg := config.LoadConfig()

	// Initialize database
	db, err := database.NewPostgresDB(cfg)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Auto migrate the schema
	err = db.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

	// Initialize repositories
	userRepo := repository.NewUserRepository(db)

	// Initialize services
	userService := services.NewUserService(userRepo)

	// Initialize handlers
	userHandler := handlers.NewUserHandler(userService)

	// Create router
	mux := http.NewServeMux()

	// Auth routes
	mux.HandleFunc("/api/auth/register", userHandler.Register)
	mux.HandleFunc("/api/auth/login", userHandler.Login)

	// Apply CORS middleware
	handler := corsMiddleware(mux)

	// Start server
	log.Printf("Server starting on port %s", cfg.ServerPort)
	if err := http.ListenAndServe(":"+cfg.ServerPort, handler); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
