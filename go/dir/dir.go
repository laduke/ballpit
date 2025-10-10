package dir

import (
	"errors"
	"os"
	"path/filepath"
)

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

type DirService struct {
	Root string
}

type SafePath string

func (b DirService) SafePath(userPath string) (SafePath, error) {
	// https://go.dev/blog/osroot
	// prevent traversal up past our root (?path="../../../etc")
	if userPath != "" && !filepath.IsLocal(userPath) {
		return "", ErrForbidden
	}

	userPath = filepath.Join(b.Root, userPath)
	userPath = filepath.Clean(userPath)

	var safePath SafePath = SafePath(userPath)
	return safePath, nil
}

func (b DirService) List(safePath SafePath) ([]Dir, error) {
	res := []Dir{}

	entries, err := os.ReadDir(string(safePath))
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
