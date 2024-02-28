const { dirname } = require("path")
const { asyncFolderWalker, allFiles } = require('async-folder-walker')

const FAST_POLL = 200
const SLOW_POLL = 2000
const FAST_TIMEOUT = 15000


const dirs = ["src"// , "/Users/travis/repos/github.com/zerotier/Central/ui"
]
const ignore = ["node_modules", ".*"]
const shaper = stat => stat

const cache = new Map()
const recentCache = new Map()

let once = false


async function iterateFiles(dirs) {
    // console.log("walk", dirs)

    let changed = new Set()

    const walker = asyncFolderWalker(dirs, { ignore, shaper })

    for await (const file of walker) {
        const { filepath, stat: { mtimeMs, size } } = file
        const value = { filepath, mtimeMs, size }

        const prev = cache.get(filepath)

        if (prev?.mtimeMs !== mtimeMs || prev?.size !== size) {
            changed.add(filepath)
        }

        cache.set(filepath, value)
    }

    if (once) {
        if (changed.size > 0) {
            console.log("changed files", [ ...changed ])
            const ts = Date.now()

            changed.forEach(key => {
                const parent = dirname(key)
                recentCache.set(parent, ts)
            })
        }
    } else {
        once = true
    }

}

iterateFiles(dirs)

let last = Date.now()

setInterval(() => {
    const now = Date.now()
    recentCache.forEach((ts, key) => {
        if (now - ts > FAST_TIMEOUT) {
            recentCache.delete(key)
        }
    })
    if (recentCache.size > 0 && (now - last)/ 2 > FAST_POLL) {
        iterateFiles([...recentCache.keys()])
    }

    if (now - last > SLOW_POLL) {
        last = Date.now()
        iterateFiles(dirs)
    }
}, FAST_POLL)
