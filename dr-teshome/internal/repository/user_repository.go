package repository

import (
	"dr-teshome/internal/models"

	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) Create(user *models.User) error {
	return r.db.Create(user).Error
}

func (r *UserRepository) CreateStaff(staff *models.StaffRegistration) error {
	return r.db.Create(staff).Error
}

func (r *UserRepository) FindStaffByEmail(email string) (*models.Staff, error) {
	var staff models.Staff
	err := r.db.Where("email = ?", email).First(&staff).Error
	if err != nil {
		return nil, err
	}
	return &staff, nil
}

func (r *UserRepository) FindByEmail(email string) (*models.User, error) {
	var user models.User
	err := r.db.Where("email = ?", email).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) Update(user *models.User) error {
	return r.db.Save(user).Error
}

func (r *UserRepository) Delete(id uint) error {
	return r.db.Delete(&models.User{}, id).Error
}

func (r *UserRepository) UpdateStaff(staff *models.Staff) error {
	return r.db.Save(staff).Error
}

func (r *UserRepository) FindStaffById(id uint) (*models.Staff, error) {
	var staff models.Staff
	err := r.db.Where("id = ?", id).First(&staff).Error
	if err != nil {
		return nil, err
	}
	return &staff, nil
}

func (r *UserRepository) FindAllStaff() ([]models.Staff, error) {
	var staff []models.Staff
	err := r.db.Find(&staff).Error
	if err != nil {
		return nil, err
	}
	return staff, nil
}

func (r *UserRepository) DeleteStaff(id uint) error {
	return r.db.Delete(&models.Staff{}, id).Error
}


