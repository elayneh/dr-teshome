package handlers

import (
	"encoding/json"
	"io"
	"log"
	"net/http"

	"dr-teshome/internal/models"
	"dr-teshome/internal/services"
)

type BlogHandler struct {
	blogService *services.BlogService
}

func NewBlogHandler(blogService *services.BlogService) *BlogHandler {
	return &BlogHandler{blogService: blogService}
}

func (h *BlogHandler) CreateBlog(w http.ResponseWriter, r *http.Request) {
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

	var blog models.Blog
	if err := json.Unmarshal(body, &blog); err != nil {
		log.Printf("Error unmarshaling request body: %v", err)
		http.Error(w, "Invalid request body format", http.StatusBadRequest)
		return
	}

	// Validate required fields
	if blog.Title == "" || blog.Content == "" {
		log.Printf("Missing required fields in blog: %+v", blog)
		http.Error(w, "Missing required fields", http.StatusBadRequest)
		return
	}

	err = h.blogService.CreateBlog(&blog)
	if err != nil {
		log.Printf("Error creating blog: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Blog created successfully"})
}

func (h *BlogHandler) GetBlogs(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	blogs, err := h.blogService.GetBlogs()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(blogs)
}

func (h *BlogHandler) GetBlogByID(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	blogId := r.URL.Query().Get("blog_id")
	if blogId == "" {
		http.Error(w, "Blog ID is required", http.StatusBadRequest)
		return
	}

	blog, err := h.blogService.GetBlogByID(blogId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(blog)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Blog retrieved successfully"})
}
