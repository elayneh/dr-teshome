package supabase

import (
	"fmt"
	"io"
	"net/http"
)

type Client struct {
	ProjectURL string
	APIKey     string
}

func NewClient(projectURL, apiKey string) *Client {
	return &Client{ProjectURL: projectURL, APIKey: apiKey}
}

func (c *Client) Request(method, path string, body io.Reader) (*http.Response, error) {
	url := fmt.Sprintf("%s/rest/v1/%s", c.ProjectURL, path)

	req, err := http.NewRequest(method, url, body)
	if err != nil {
		return nil, err
	}

	req.Header.Set("apikey", c.APIKey)
	req.Header.Set("Authorization", "Bearer "+c.APIKey)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")

	return http.DefaultClient.Do(req)
}
