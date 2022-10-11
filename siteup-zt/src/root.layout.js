import { renderStylesToString } from '@emotion/server'
import { css as createClassName } from '@emotion/css'
import { css as transformStyleObject } from '@styled-system/css'
import h from "hyperscript"

import theme from "./theme.js"

const globalStyle = { fontFamily: "body"}

const style = transformStyleObject(globalStyle)(theme)
const classes = createClassName(style)

export default async function RootLayout({
    title,
    siteName,
    scripts,
    styles,
    children
}) {

    return renderStylesToString(
        h('html', {}, [
            h('head', {}, [
                h('title', {}, `${siteName}${title ? ` | ${title}` : ''}`)
                , h('meta', { charset: "utf-8" })
                , h('meta', { name: "viewport", content: "width: device-width, user-scalable: no" })
                , scripts && scripts.map(script => h('script', { src: script, type: 'module' }))
                , styles && styles.map(style => h('link', { rel: "stylesheet", href: style }))
                ]),
            h('body', {class: classes}, children)
        ]).outerHTML

    )
}
