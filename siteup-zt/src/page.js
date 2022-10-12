import h from "./h.js"

import { sx } from "./css.js"

export default async function RootLayout({
    title,
    siteName,
    scripts,
    styles,
    children
}) {

    return h("div", {}, [
        h("section", { class: sx({ p: [3, 4], color: "text", backgroundColor: "background" }) }, [
            h("h1", { class: sx({ fontSize: 7, width: 8 }) }, "Secure LANs over the Internet")
            , h("a", { href: "https://my.zerotier.com/login", class: sx({ mt: 3, display: "inline-block", color: "primary", backgroundColor: "highlight", border: "none", borderRadius: 3, px: [3], py: [2], fontSize: 3 })}, "Build Your Network")
        ])
        , h("section", { class: sx({ py: [3,4], bg: "highlight", display: "flex", justifyContent: "center", gap: [2, 3] }) }, [
            Metric({ label: "Connected Devices", value: "3M+" })
            , Metric({ label: "Github Stars", value: "9.6K" })
            , Metric({ label: "Monthly Active Users", value: "750K+" })
            , Metric({ label: "Hosted Networks", value: "1.2M+" })
        ])
    ])

    // return render(String, html`
    //     <h1 id="hello" class=${classname}>Hello2</h1>
    // `)
}

function Metric({ label = "", value = "" }) {
    return h("dl", { css: { color: "text", justifyContent: "center", display: "flex", alignItems: "center" } }, [
        h("dd", { css: { fontSize: 2, width: 6, textAlign: "right", px: 2, fontWeight: 600 } }, label)
        , h("dt", { css: { fontSize: 6, color: "purple" } }, value)
    ])
}
