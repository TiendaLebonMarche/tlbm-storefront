"use client"

import { useEffect } from "react"

export default function LenisInner({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    let lenis: any = null

    const initLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default
        lenis = new Lenis({
          duration: 1.8,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 0.8,
          touchMultiplier: 1.2,
          infinite: false,
        })

        function raf(time: number) {
          lenis?.raf(time)
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        // Exponer globalmente por si se necesita destruir
        ;(window as any).__lenis = lenis
      } catch (e) {
        console.warn("[Lenis] Smooth scroll no disponible:", e)
      }
    }

    initLenis()

    return () => {
      if (lenis) {
        lenis.destroy()
      }
      ;(window as any).__lenis = undefined
    }
  }, [])

  return <>{children}</>
}
