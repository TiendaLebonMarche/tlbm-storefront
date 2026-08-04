"use client"

import { useEffect } from "react"

export default function LayoutClient() {
  useEffect(() => {
    // ── Scroll Progress ──
    const progress = document.createElement("div")
    progress.id = "scroll-progress"
    document.body.prepend(progress)

    // ── Noise Overlay ──
    const noise = document.createElement("div")
    noise.id = "noise-overlay"
    document.body.prepend(noise)

    // Scroll progress handler
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      const p = Math.min((window.scrollY / h) * 100, 100)
      const el = document.getElementById("scroll-progress")
      if (el) el.style.width = p + "%"
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    // ── Reveal Observer for .reveal elements ──
    // Robusto: si el elemento ya está en viewport al registrarse, mostrarlo de inmediato.
    // Timeout de seguridad: nada puede quedar invisible para siempre (bug intermitente del observer).
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 }
    )

    const revealEls = document.querySelectorAll<HTMLElement>(".reveal")
    revealEls.forEach((el) => {
      // Ya visible en pantalla → activar sin esperar al observer
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("visible")
      } else {
        revealObserver.observe(el)
      }
    })

    // Fallback: forzar visibilidad de TODO lo que no se activó (evita secciones invisibles)
    const safetyTimer = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.visible)").forEach((el) => {
        el.classList.add("visible")
      })
    }, 2500)

    return () => {
      window.removeEventListener("scroll", onScroll)
      revealObserver.disconnect()
      window.clearTimeout(safetyTimer)
      progress.remove()
      noise.remove()
    }
  }, [])

  return null
}
