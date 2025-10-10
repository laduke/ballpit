package dir

import (
	"errors"
	"testing"
)

func TestSafeDir(t *testing.T) {
	root := "root"

	var cases = []struct {
		in      string
		out     string
		isError bool
		err     *error
	}{
		{
			in:      "../..",
			out:     "",
			isError: true,
			err:     &ErrForbidden,
		},
		{
			in:      "a",
			out:     root + "/a",
			isError: false,
		},
		{
			in:      "",
			out:     root,
			isError: false,
		},
	}

	dirService := DirService{Root: root}

	for _, tt := range cases {

		t.Run(tt.in, func(t *testing.T) {
			p, err := dirService.SafePath(tt.in)

			if tt.err != nil && !errors.Is(*tt.err, err) {
				t.Errorf("Expected error for [%v] to be [%v]. Got [%v]", p, *tt.err, err)
			}

			if !tt.isError && (err != nil) {
				t.Errorf("Expected success for [%v]. Got error %v", tt.in, p)
			}

			if tt.out != string(p) {
				t.Errorf("Unexpected conversion [%v] parsed to [%v]. Expected [%v]", tt.in, p, tt.out)
			}

		})
	}

}
