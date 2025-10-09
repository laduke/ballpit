package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

func main() {

	rootDir := os.Getenv("ROOT")
	if rootDir == "" {
		rootDir = "testdata"
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "0"
	}

	addr := "0.0.0.0:" + port

	b := Browser{Root: rootDir}

	mux := http.NewServeMux()

	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/plain")
		w.Write([]byte(`OK`))
	})

	mux.HandleFunc("GET /api/dir", func(w http.ResponseWriter, r *http.Request) {
		// https://go.dev/blog/osroot
		queryParams := r.URL.Query()

		userPath := queryParams.Get("path")

		safePath, err := b.SafePath(userPath)
		if err != nil {
			JSONError(w, "Forbidden: "+userPath, http.StatusForbidden)
			return
		}

		dirs, err := b.List(safePath)
		if err != nil {
			if errors.Is(err, ErrNotFound) {
				JSONError(w, "Not Found: "+string(safePath), http.StatusNotFound)
			} else {
				JSONError(w, "Internal Error", http.StatusInternalServerError)
			}
			return
		}

		resp := DirResponse{
			Data:   dirs,
			Parent: filepath.Clean(string(safePath)),
		}

		w.Header().Set("Content-Type", "application/json")

		json.NewEncoder(w).Encode(resp)
	})

	server := &http.Server{
		Addr:         fmt.Sprintf(":%s", port),
		Handler:      mux,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	listener, err := net.Listen("tcp", addr)
	if err != nil {
		panic(err)
	}

	log.Println("Starting server on ", listener.Addr())

	if err := server.Serve(listener); err != nil {
		panic(err)
	}
}

// API
type DirResponse struct {
	Data   []Dir  `json:"data"`
	Parent string `json:"parent"`
}

func JSONError(w http.ResponseWriter, message string, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)

	errResponse := ErrorResponse{Message: message, Code: statusCode}
	json.NewEncoder(w).Encode(errResponse)
}

type ErrorResponse struct {
	Message string `json:"message"`
	Code    int    `json:"code,omitempty"` // Optional: for specific error types
}

// MODEL

var ErrNotFound = errors.New("Not Found")
var ErrForbidden = errors.New("Forbidden")

type StatType string

const (
	Directory StatType = "directory"
	File      StatType = "file"
)

func (s StatType) String() string {
	return string(s)
}

type Dir struct {
	Type StatType `json:"type"`
	Name string   `json:"name"`
	ID   string   `json:"id"`
}

type Browser struct {
	Root string
}

type SafePath string

func (b Browser) SafePath(userPath string) (SafePath, error) {
	// prevent traversal up past our root (?path="../../../etc")
	if userPath != "" && !filepath.IsLocal(userPath) {
		return "", ErrForbidden
	}

	userPath = filepath.Join(b.Root, userPath)
	userPath = filepath.Clean(userPath)

	var safePath SafePath = SafePath(userPath)
	return safePath, nil
}

func (b Browser) List(safePath SafePath) ([]Dir, error) {
	res := []Dir{}

	var p string
	p = string(safePath)

	entries, err := os.ReadDir(p)
	if err != nil {
		return nil, ErrNotFound
	}

	statType := File

	for _, e := range entries {
		if e.IsDir() {
			statType = Directory
		}
		id := filepath.Join(b.Root, e.Name())
		res = append(res, Dir{Name: e.Name(), Type: statType, ID: id})
	}

	return res, nil
}
