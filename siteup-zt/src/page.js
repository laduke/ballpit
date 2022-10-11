// import { html, render } from 'uhtml-isomorphic'
import { css as createClassName } from '@emotion/css'
import { css as transformStyleObject } from '@styled-system/css'
import h from 'hyperscript'

import theme from "./theme.js"

export default async function RootLayout({
    title,
    siteName,
    scripts,
    styles,
    children
}) {

    const styles2 = transformStyleObject({ color: "text", backgroundColor: "primary", padding: ['sm', 'md'], margin: [0] })(theme)
    const classname = createClassName(styles2)


    const nest = h("h1", { class: classname }, "Hello4")
    return h("div", {}, nest)

    // return render(String, html`
    //     <h1 id="hello" class=${classname}>Hello2</h1>
    // `)
}
