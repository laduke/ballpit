package dir

import "fmt"

// mkdir -p testdata/{a,b,c}/{d,e,f}
// touch testdata/{a,b,c}/{d,e,f}/{1,2,3}


func Hello(name string) string {
    message := fmt.Sprintf("Hi, %v. Welcome!", name)
    return message
}
