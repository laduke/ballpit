import { renderStylesToString } from '@emotion/server'
import h from "./h.js"
import walk from "dom-walk"

import { sx } from "./css.js"

const globalStyle = { fontFamily: "body" }



export default async function RootLayout({
    title,
    siteName,
    scripts,
    styles,
    children
}) {


    const html = h('html', {}, [
        h('head', {}, [
            h('title', {}, `${siteName}${title ? ` | ${title}` : ''}`)
            , h('meta', { charset: "utf-8" })
            , h('meta', { name: "viewport", content: "width: device-width, initial-scale=1.0" })
            , scripts && scripts.map(script => h('script', { src: script, type: 'module' }))
            , styles && styles.map(style => h('link', { rel: "stylesheet", href: style }))
        ]),
        h('body', { class: sx(globalStyle) }, [
            nav()
            , children
        ])
    ])

    walk(html, function (node) {
        if (node.css) {
            const cx = sx(node.css)
            node.classList.add(cx)
        }
    })

    return renderStylesToString(html.outerHTML)

}

function nav() {
    return h('header', { class: sx({ bg: 'background', p: [3, 4] }) }, [
        h('div', { class: sx({ display: 'flex', "flexWrap": "wrap", "justifyContent": ["center", "center", "space-between"], "alignItems": "center" }) }, [
            // , h('img', { src: './zerotier_logo_white.png', alt: "ZeroTier logo", height: "48" })
            logo()
            , h('div', { class: sx({ color: "text", bg: "background" }) }, [
                , h('div', { class: sx({ fontSize: [3, 4], display: "flex", gap: [3, 4], "justifyContent": "flex-end", my: [2, 3] }) }, [
                    , h("div", {}, "Login")
                    , h("div", {}, "Sign up")
                ])
                , h('div', { css: { fontSize: [1, 2, 3], display: "flex", gap: [3, 4] } }, [
                    , navLink({ text: "Pricing" })
                    , navLink({ text: "Download" })
                    , navLink({ text: "Support" })
                    , navLink({ text: "About" })
                    , navLink({ text: "Contact" })
                ])
            ])
        ])
    ])
}

function navLink({ text = "" }) {
    return h("div", {}, text)
}

function logo() {
    return h('div', { css: { hello: "world" }, class: sx({ color: 'text', textTransform: "uppercase" }) }, [
        h("a", { href: "https://www.zerotier.com", class: sx({ textDecoration: "none", letterSpacing: '0.5rem', fontWeight: '600', p: 0, color: 'text', textTransform: "uppercase" }) }, [
            h('span', { class: sx({ fontSize: "54px" }) }, "⏁")
            , h('span', { class: sx({ fontSize: "42px" }) }, "ZeroTier")
        ])
    ])
}
