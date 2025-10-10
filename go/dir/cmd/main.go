package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"net"
	"net/http"
	"os"

	"example.com/dir"
)

func main() {

	// config
	rootDir := os.Getenv("ROOT")
	if rootDir == "" {
		rootDir = "testdata"
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "0"
	}

	listenIp := os.Getenv("ADDR")
	if listenIp == "" {
		listenIp = "0.0.0.0"
	}

	// deps
	logger := slog.New(slog.NewJSONHandler(os.Stderr, &slog.HandlerOptions{Level: slog.LevelInfo}))
	dirService := dir.DirService{Root: rootDir}

	routeHandler := NewRouteHandler(&dirService, logger)


	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/dir", routeHandler.DirList)
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/plain")
		w.Write([]byte(`OK`))
	})


	listener, err := net.Listen("tcp", fmt.Sprintf("%s:%s", listenIp, port))
	if err != nil {
		panic(err)
	}

	listenAddr := listener.Addr().(*net.TCPAddr)
	logger.Info("Starting server", "address", listenAddr.IP, "port", listenAddr.Port)

	server := &http.Server{Handler: mux}

	if err := server.Serve(listener); err != nil {
		panic(err)
	}
}

// HTTP

type RouteHandler struct {
	browserService *dir.DirService
	logger         *slog.Logger
}

func NewRouteHandler(browserService *dir.DirService, logger *slog.Logger) *RouteHandler {
	return &RouteHandler{browserService, logger}
}

func (h *RouteHandler) DirList(w http.ResponseWriter, r *http.Request) {
	queryParams := r.URL.Query()

	userPath := queryParams.Get("path")

	safePath, err := h.browserService.SafePath(userPath)
	if err != nil {
		h.logger.Warn("Forbidden path requested", "path", userPath)
		JSONError(w, "Forbidden: "+userPath, http.StatusForbidden)
		return
	}

	dirs, err := h.browserService.List(safePath)
	if err != nil {
		if errors.Is(err, dir.ErrNotFound) {
			h.logger.Info("Path not found", "path", string(safePath))
			JSONError(w, "Not Found: "+string(safePath), http.StatusNotFound)
		} else {
			h.logger.Error("Unknown Error", "path", string(safePath))
			JSONError(w, "Internal Error", http.StatusInternalServerError)
		}
		return
	}

	resp := DirListResponse{
		Data:   dirs,
		Parent: string(safePath),
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(resp)
}

// API RESPONSES
type DirListResponse struct {
	Data   []dir.Dir `json:"data"`
	Parent string    `json:"parent"`
}

// ERRORS
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
