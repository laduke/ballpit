import h from "./h.js"

import { themeProvider } from "./css.js"
import { deep as theme } from "./theme.js"

export function logo() {
    return h('div', { css: { hello: "world" }, css: { color: 'text', textTransform: "uppercase" } }, [
        h("a", { href: "https://www.zerotier.com", css: { textDecoration: "none", letterSpacing: '0.5rem', fontWeight: '600', p: 0, color: 'text', textTransform: "uppercase" } }, [
            h('span', { css: { fontSize: "54px" } }, "⏁")
            , h('span', { css: { fontSize: "42px" } }, "ZeroTier")
        ])
    ])
}
