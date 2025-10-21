package dir

import (
	"errors"
	"os"
	"path/filepath"
)

var ErrForbidden = errors.New("forbidden")

const (
	Directory string = "directory"
	File      string = "file"
)

type Dir struct {
	Type string `json:"type"`
	Name string `json:"name"`
	ID   string `json:"id"`
}

// DirService gets the contents of a directory
type DirService struct {
	// The root directory that all paths are relative to
	Root string
}

// Debatable if the type safety worth all the casting
// type SafePath string

type SafePath = string

// SafePath prevents directory traversal.
// Requesting "../../../" will fail.
// If path is empty, returns the root.
func (b DirService) SafePath(userPath string) (SafePath, error) {
	if userPath == "" {
		return b.Root, nil
	}

	// https://go.dev/blog/osroot
	if !filepath.IsLocal(userPath) {
		return "", ErrForbidden
	}

	userPath = filepath.Join(b.Root, userPath)
	userPath = filepath.Clean(userPath)

	return userPath, nil
}

// List lists the files and directories in a directory.
// Make sure you pass a trusted path. See [SafePath]
func (b DirService) List(safePath SafePath) ([]Dir, error) {
	res := []Dir{}

	entries, err := os.ReadDir(string(safePath))
	if err != nil {
		return nil, err
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
