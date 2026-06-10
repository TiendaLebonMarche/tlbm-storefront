"use client"

import Script from "next/script"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  const pathname = usePathname()

  // Default GTM ID as fallback for production
  const gtmId = gaId || "GTM-P7ZD7RQP"

  if (!gtmId) return null

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      ;(window as any).dataLayer.push({
        event: "page_view",
        page_path: pathname,
      })
    }
  }, [pathname])

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-head"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  )
}
