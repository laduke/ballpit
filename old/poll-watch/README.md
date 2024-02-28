# Another file watcher thing

But it polls instead of trying to use OS events, with all their dependencies and flakiness.  

I read esbuild does this. I felt like giving it a try.

## 
- walk whole tree
- wait long time, walk again
- if changes, save parent dir to cache
- wait short time, poll parents
- need to clear old files that don't exist anymore
