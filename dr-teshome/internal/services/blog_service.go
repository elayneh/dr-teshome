package services

import (
	"dr-teshome/internal/models"
	"dr-teshome/internal/repository"
)

type BlogService struct {
	blogRepo *repository.BlogRepository
}

func NewBlogService(blogRepo *repository.BlogRepository) *BlogService {
	return &BlogService{blogRepo: blogRepo}
}

func (s *BlogService) CreateBlog(blog *models.Blog) error {
	return s.blogRepo.Create(blog)
}

func (s *BlogService) GetBlogs() ([]models.Blog, error) {
	return s.blogRepo.GetBlogs()
}

func (s *BlogService) GetBlogByID(blogId string) (*models.Blog, error) {
	return s.blogRepo.GetBlogByID(blogId)
}

