package repository

import (
	"dr-teshome/internal/models"

	"gorm.io/gorm"
)

type BlogRepository struct {
	db *gorm.DB
}

func NewBlogRepository(db *gorm.DB) *BlogRepository {
	return &BlogRepository{db: db}
}

func (r *BlogRepository) Create(blog *models.Blog) error {
	return r.db.Create(blog).Error
}

func (r *BlogRepository) FindByID(blogId string) (*models.Blog, error) {
	var blog models.Blog
	err := r.db.Where("blog_id = ?", blogId).First(&blog).Error
	if err != nil {
		return nil, err
	}
	return &blog, nil
}

func (r *BlogRepository) Update(blog *models.Blog) error {
	return r.db.Save(blog).Error
}

func (r *BlogRepository) Delete(blogId string) error {
	return r.db.Delete(&models.Blog{}, blogId).Error
}

func (r *BlogRepository) GetBlogs() ([]models.Blog, error) {
	var blogs []models.Blog
	err := r.db.Find(&blogs).Error
	return blogs, err
}

func (r *BlogRepository) GetBlogByID(blogId string) (*models.Blog, error) {
	var blog models.Blog
	err := r.db.Where("blog_id = ?", blogId).First(&blog).Error
	return &blog, err
}
