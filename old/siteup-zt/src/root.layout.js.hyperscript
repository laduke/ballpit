import { renderStylesToString } from '@emotion/server'
import h from "./h.js"

import { themeProvider } from "./css.js"
import { deep as theme } from "./theme.js"

const globalStyle = { fontFamily: "body" }


const css = themeProvider(theme)

export default async function RootLayout({
    title,
    siteName,
    scripts,
    styles,
    children
}) {


    const html = h('html', { lang: "en"}, [
        h('head', {}, [
            h('title', {}, `${siteName}${title ? ` | ${title}` : ''}`)
            , h('meta', { charset: "utf-8" })
            , h('meta', { name: "viewport", content: "width: device-width, initial-scale=1.0" })
            , h("meta", { name: "description", content: "ZeroTier marketing website" })
            , scripts && scripts.map(script => h('script', { src: script, type: 'module' }))
            , styles && styles.map(style => h('link', { rel: "stylesheet", href: style }))
        ]),
        h('body', { css: globalStyle }, [
            nav()
            , children
        ])
    ])

    css(html)

    return "<!DOCTYPE html>" + renderStylesToString(html.outerHTML)

}

function nav() {
    return h('header', { css: { bg: 'background', p: [3, 4] } }, [
        h('div', { css: { display: 'flex', "flexWrap": "wrap", "justifyContent": ["center", "center", "space-between"], "alignItems": "center" } }, [
            // , h('img', { src: './zerotier_logo_white.png', alt: "ZeroTier logo", height: "48" })
            logo()
            , h('div', { css: { color: "text", bg: "background" } }, [
                , h('div', { css: { fontSize: [3, 4], display: "flex", gap: [3, 4], "justifyContent": "flex-end", my: [2, 3] } }, [
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
    return h('div', { css: { hello: "world" }, css: { color: 'text', textTransform: "uppercase" } }, [
        h("a", { href: "https://www.zerotier.com", css: { textDecoration: "none", letterSpacing: '0.5rem', fontWeight: '600', p: 0, color: 'text', textTransform: "uppercase" } }, [
            h('span', { css: { fontSize: "54px" } }, "⏁")
            , h('span', { css: { fontSize: "42px" } }, "ZeroTier")
        ])
    ])
}
