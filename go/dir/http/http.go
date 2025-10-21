package http

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"time"

	"example.com/dir"
)

var users = map[string]string{
	"alice": "alice",
	"bob":   "bob",
}

var expireSeconds = 16
var sessions = map[string]session{}

type session struct {
	username string
	expiry   time.Time
}

func (s session) String() string {
	return s.username
}
func (s session) isExpired() bool {
	return s.expiry.Before(time.Now())
}

func (s session) refreshDue() bool {
	half := time.Duration(expireSeconds / 2)
	return s.expiry.Before(time.Now().Add(half * time.Second))
}

type Credentials struct {
	Password string `json:"password"`
	Username string `json:"username"`
}

type Adapter func(http.Handler) http.Handler

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

	requestLogger := RequestLogger(logger)
	authRequired := AuthRequired(logger)

	app := NewApp(dirService, logger)

	mux := http.NewServeMux()
	mux.Handle("GET /api/dir", authRequired(http.HandlerFunc(app.DirList)))
	mux.HandleFunc("GET /health", app.Health)

	mux.HandleFunc("GET /login", app.Health)
	mux.HandleFunc("POST /authorize", app.Login)
	mux.HandleFunc("DELETE /authorize", app.Logout)

	listener, err := net.Listen("tcp", fmt.Sprintf("%s:%s", listenIp, port))
	if err != nil {
		panic(err)
	}

	listenAddr := listener.Addr().(*net.TCPAddr)
	logger.Info("Starting server", "address", listenAddr.IP, "port", listenAddr.Port)

	server := &http.Server{Handler: requestLogger(mux)}

	if err := server.Serve(listener); err != nil {
		panic(err)
	}
}

func RequestLogger(log *slog.Logger) Adapter {
	return func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()

			log.Info("request start", "method", r.Method, "path", r.URL.Path)

			defer func() {
				log.Info("request end", "method", r.Method, "path", r.URL.Path, "time", time.Since(start))
			}()

			h.ServeHTTP(w, r)
		})
	}
}

func AuthRequired(log *slog.Logger) Adapter {
	return func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// TODO save origin for redirect after login
			// log.Info("Previous","path", r.URL.Path, "query", r.URL.RawQuery)
			// origin := r.Header.Get("Origin")
			// log.Info("Origin","Origin", origin)

			// queryPath := r.URL.Path
			// if r.URL.RawQuery != "" {
			// 	queryPath += "?" + r.URL.RawQuery
			// }

			// log.Info("Previous","path", queryPath)

			c, err := r.Cookie("session_token")
			if err != nil {
				http.Redirect(w, r, "/login", http.StatusSeeOther)
				return
			}

			sessionToken := c.Value

			userSession, exists := sessions[sessionToken]
			if !exists {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			if userSession.isExpired() {
				delete(sessions, sessionToken)
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			// refresh cookie
			if userSession.refreshDue() {
				newSessionToken := generateSecureRandomID(16)
				expiresAt := time.Now().Add(time.Duration(expireSeconds) * time.Second)

				sessions[newSessionToken] = session{
					username: userSession.username,
					expiry:   expiresAt,
				}

				delete(sessions, sessionToken)

				http.SetCookie(w, SessionCookie(newSessionToken, expiresAt))
			}

			log.Info("ensure auth", "session", userSession.String())

			ctxWithSession := context.WithValue(r.Context(), sessionUserKey, userSession.String())
			rWithSession := r.WithContext(ctxWithSession)

			h.ServeHTTP(w, rWithSession)
		})
	}
}

func SessionCookie(sessionToken string, expiresAt time.Time) *http.Cookie {
	return &http.Cookie{
		Name:     "session_token",
		Value:    sessionToken,
		Expires:  expiresAt,
		HttpOnly: true,
		Secure:   true,
		Path:     "/",
		SameSite: http.SameSiteStrictMode,
	}
}

type contextKey int

const sessionUserKey contextKey = 1

type User struct {
	Name string
}

// APP

type App struct {
	dirService *dir.DirService
	logger     *slog.Logger
}

func NewApp(browserService *dir.DirService, logger *slog.Logger) *App {
	return &App{browserService, logger}
}

func (h *App) Static(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain")
	_, err := w.Write([]byte(`TODO`))
	if err != nil {
		h.logger.Error("Error writing response")
	}
}

func (h *App) Health(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain")
	_, err := w.Write([]byte(`OK`))
	if err != nil {
		h.logger.Error("Error writing response")
	}
}

func (h *App) Login(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	expectedPassword, ok := users[creds.Username]

	if !ok || expectedPassword != creds.Password {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	sessionToken := generateSecureRandomID(16)
	expiresAt := time.Now().Add(time.Duration(expireSeconds) * time.Second)

	sessions[sessionToken] = session{
		username: creds.Username,
		expiry:   expiresAt,
	}

	http.SetCookie(w, SessionCookie(sessionToken, expiresAt))
}

func (h *App) Logout(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain")
	_, err := w.Write([]byte(`TODO`))
	if err != nil {
		h.logger.Error("Error writing response")
	}
}

func (h *App) DirList(w http.ResponseWriter, r *http.Request) {
	// 4096
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

func generateSecureRandomID(length int) string {
	b := make([]byte, length)
	rand.Read(b) //nolint:errcheck // this probably won't fail in a demo app
	return base64.URLEncoding.EncodeToString(b)
}
