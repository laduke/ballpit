package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"net"
	"net/http"
	"os"
	"time"

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
	dirService := &dir.DirService{Root: rootDir}

	app := NewApp(dirService, logger)

	mux := http.NewServeMux()
	mux.Handle("GET /api/dir", NewEnsureAuth(http.HandlerFunc(app.DirList), logger))
	mux.HandleFunc("GET /health", app.Health)

	listener, err := net.Listen("tcp", fmt.Sprintf("%s:%s", listenIp, port))
	if err != nil {
		panic(err)
	}

	listenAddr := listener.Addr().(*net.TCPAddr)
	logger.Info("Starting server", "address", listenAddr.IP, "port", listenAddr.Port)

	server := &http.Server{Handler: NewLogger(mux, logger)}

	if err := server.Serve(listener); err != nil {
		panic(err)
	}
}

// HTTP

type contextKey int
const authenticatedUserKey contextKey = 0

type EnsureAuth struct {
	handler http.Handler
	logger *slog.Logger
}

func NewEnsureAuth(wrapped http.Handler, logger *slog.Logger) http.Handler {
	return &EnsureAuth{handler: wrapped, logger: logger}
}

func (l *EnsureAuth) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	user, err := GetUserFromReq(r)
	// err = errors.New("oops")
	if err != nil {
		l.logger.Info("ensure auth failed")
		http.Error(w, "please sign in", http.StatusUnauthorized)
		return
	}
	l.logger.Info("ensure auth", "user", user.Name)

	ctxWithUser := context.WithValue(r.Context(), authenticatedUserKey, user)
	rWithUser := r.WithContext(ctxWithUser)

	l.handler.ServeHTTP(w,rWithUser)
}

func GetUserFromReq(r *http.Request) (*User, error){
	return &User{ Name: "BOB" }, nil
}

type User struct {
	Name string
}

type Logger struct {
	handler http.Handler
	logger  *slog.Logger
}

func (l *Logger) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	start := time.Now()
	l.handler.ServeHTTP(w, r)
	l.logger.Info("request", "method", r.Method, "path", r.URL.Path, "time", time.Since(start))
}

func NewLogger(wrapped http.Handler, logger *slog.Logger) http.Handler {
	return &Logger{handler: wrapped, logger: logger}
}

// APP

type App struct {
	dirService *dir.DirService
	logger     *slog.Logger
}

func NewApp(browserService *dir.DirService, logger *slog.Logger) *App {
	return &App{browserService, logger}
}

func (h *App) Health(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain")
	_, err := w.Write([]byte(`OK`))
	if err != nil {
		h.logger.Error("Error writing response")
	}
}

func (h *App) DirList(w http.ResponseWriter, r *http.Request) {
    user := r.Context().Value(authenticatedUserKey).(*User)
	h.logger.Info("DirList", "user", user)

	queryParams := r.URL.Query()

	userPath := queryParams.Get("path")

	safePath, err := h.dirService.SafePath(userPath)
	if err != nil {
		h.logger.Warn("Forbidden path requested", "path", userPath)
		JSONError(w, "Forbidden: "+userPath, http.StatusForbidden, h.logger)
		return
	}

	dirs, err := h.dirService.List(safePath)
	if err != nil {

		if errors.Is(err, os.ErrNotExist) {
			h.logger.Debug("Not found", "path", safePath)
			JSONError(w, "Not Found: "+safePath, http.StatusNotFound, h.logger)
			return
		}

		h.logger.Info("Error listing directory", "path", safePath, "err", err)
		JSONError(w, "Internal Error", http.StatusInternalServerError, h.logger)
		return
	}

	resp := DirListResponse{
		Data:   dirs,
		Parent: safePath,
	}

	w.Header().Set("Content-Type", "application/json")

	err = json.NewEncoder(w).Encode(resp)
	if err != nil {
		h.logger.Error("Error marshalling json", "path", safePath)
	}
}

// API RESPONSES
type DirListResponse struct {
	Data   []dir.Dir `json:"data"`
	Parent string    `json:"parent"`
}

// ERRORS
func JSONError(w http.ResponseWriter, message string, statusCode int, logger *slog.Logger) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)

	errResponse := ErrorResponse{Message: message, Code: statusCode}
	err := json.NewEncoder(w).Encode(errResponse)
	if err != nil {
		logger.Error("Error marshalling json")
	}
}

type ErrorResponse struct {
	Message string `json:"message"`
	Code    int    `json:"code,omitempty"` // Optional: for specific error types
}
