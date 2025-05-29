package services

import (
	"dr-teshome/internal/models"
	"dr-teshome/internal/repository"
	"errors"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	userRepo *repository.UserRepository
}

func NewUserService(userRepo *repository.UserRepository) *UserService {
	return &UserService{userRepo: userRepo}
}

func (s *UserService) validateRegistration(regData *models.UserRegistration) error {
	if strings.TrimSpace(regData.Email) == "" {
		return errors.New("email is required")
	}
	if !strings.Contains(regData.Email, "@") {
		return errors.New("invalid email format")
	}
	if len(regData.Password) < 6 {
		return errors.New("password must be at least 6 characters long")
	}
	if strings.TrimSpace(regData.FirstName) == "" {
		return errors.New("first name is required")
	}
	if strings.TrimSpace(regData.LastName) == "" {
		return errors.New("last name is required")
	}
	return nil
}

func (s *UserService) Register(regData *models.UserRegistration) error {
	// Validate registration data
	if err := s.validateRegistration(regData); err != nil {
		return err
	}

	// Check if user already exists
	existingUser, _ := s.userRepo.FindByEmail(regData.Email)
	if existingUser != nil {
		return errors.New("user with this email already exists")
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(regData.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	// Create new user
	user := &models.User{
		Email:       regData.Email,
		Password:    string(hashedPassword),
		FirstName:   regData.FirstName,
		LastName:    regData.LastName,
		PhoneNumber: regData.PhoneNumber,
		DateOfBirth: regData.DateOfBirth,
		Address:     regData.Address,
		LastLoginAt: time.Now(),
		IsActive:    true,
		Role:        "user",
	}

	return s.userRepo.Create(user)
}

func (s *UserService) Login(email, password string) (*models.User, error) {
	if strings.TrimSpace(email) == "" || strings.TrimSpace(password) == "" {
		return nil, errors.New("email and password are required")
	}

	user, err := s.userRepo.FindByEmail(email)
	if err != nil {
		return nil, errors.New("invalid credentials")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return nil, errors.New("invalid credentials")
	}

	// Update last login time
	user.LastLoginAt = time.Now()
	err = s.userRepo.Update(user)
	if err != nil {
		return nil, err
	}

	return user, nil
}
