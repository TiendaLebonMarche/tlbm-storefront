"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Exponer Lenis globalmente para poder destruirlo si es necesario
    ;(window as any).__lenis = lenis

    return () => {
      lenis.destroy()
      ;(window as any).__lenis = undefined
    }
  }, [])

  return <>{children}</>
}
