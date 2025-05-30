package repository

import (
	"dr-teshome/internal/models"
	"errors"

	"github.com/golang-jwt/jwt/v4"
)

func ValidateToken(token string) (*models.User, error) {
	tokenObj, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		return []byte("secret-key"), nil
	})
	if err != nil {
		return nil, err
	}

	if claims, ok := tokenObj.Claims.(jwt.MapClaims); ok && tokenObj.Valid {
		user := &models.User{
			Email: claims["email"].(string),
			Role:  claims["role"].(string),
		}
		return user, nil
	}

	return nil, errors.New("invalid token")
}