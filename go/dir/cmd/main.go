package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

func main() {
	rootDir := "testdata"

	port := os.Getenv("PORT")
	if port == "" {
		port = "0"
	}

	addr := "0.0.0.0:" + port

	mux := http.NewServeMux()

	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/plain")
		w.Write([]byte(`OK`))
	})

	mux.HandleFunc("GET /api/dir", func(w http.ResponseWriter, r *http.Request) {
		queryParams := r.URL.Query()

		path := queryParams.Get("path")

		path = filepath.Join(rootDir, path)

		res, err := List(path)
		if err != nil {
			panic(err)
		}

		w.Header().Set("Content-Type", "application/json")

		json.NewEncoder(w).Encode(res)
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

type Dir struct {
	Name  string `json:"name"`
	IsDir bool   `json:"isDir"`
}

func List(path string) ([]Dir, error) {

	res := []Dir{}

	entries, err := os.ReadDir(path)
	if err != nil {
		return nil, err
	}

	for _, e := range entries {
		res = append(res, Dir{Name: e.Name(), IsDir: e.IsDir()})
	}

	return res, nil
}
