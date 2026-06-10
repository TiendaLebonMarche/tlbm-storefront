"use client"

import Script from "next/script"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  const pathname = usePathname()

  // If no GTM ID is set, render nothing
  if (!gaId || !gaId.startsWith("GTM-")) return null

  useEffect(() => {
    // Push page view to dataLayer on route change
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      ;(window as any).dataLayer.push({
        event: "page_view",
        page_path: pathname,
      })
    }
  }, [pathname])

  return (
    <>
      {/* Google Tag Manager - Head script */}
      <Script
        id="gtm-head"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gaId}');
          `,
        }}
      />

      {/* Google Tag Manager - noscript fallback (iframe) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gaId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  )
}
