import { css as createClassName } from '@emotion/css'
import { css as transformStyleObject } from '@styled-system/css'
import walk from "dom-walk"

// import { swiss as theme } from "./theme.js"
// import { deep as theme } from "./theme.js"
// import theme from "./theme.js"

// export const sx = styles => createClassName(transformStyleObject(styles)(theme))

export const themeProvider = (theme) => {
    const sx = styles => createClassName(transformStyleObject(styles)(theme))
    return function css(html) {
        walk(html, function (node) {
            if (node.css) {
                const cx = sx(node.css)
                node.classList.add(cx)
            }
        })
    }
}

// export const sx = styles => {
//     console.log(styles, transformStyleObject(styles)(theme))

//     return createClassName(transformStyleObject(styles)(theme))
// }
