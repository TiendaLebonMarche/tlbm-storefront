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

    // ── Reveal al entrar en pantalla ──
    // El contenido NUNCA empieza oculto. Antes el CSS ponía .reveal en opacity 0
    // y este efecto era el único que lo mostraba: como la hidratación tarda
    // (~7 s medidos en carga lenta), todo lo que quedaba bajo el hero se veía
    // como un hueco blanco. Ahora se oculta SOLO lo que está fuera de pantalla
    // y solo cuando este JS puede garantizar que lo va a volver a mostrar.
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

    const armar = (el: HTMLElement) => {
      if (el.classList.contains("visible")) return
      const rect = el.getBoundingClientRect()
      // Ya se está viendo (o no tiene caja): se deja visible, nunca se oculta,
      // porque ocultarlo aquí sería un parpadeo para el usuario.
      if ((rect.top < window.innerHeight && rect.bottom > 0) || rect.height === 0) {
        el.classList.add("visible")
        return
      }
      el.classList.add("reveal-armed")
      revealObserver.observe(el)
    }

    const escanear = () => {
      document
        .querySelectorAll<HTMLElement>(".reveal:not(.visible)")
        .forEach((el) => armar(el))
    }
    escanear()

    // Los .reveal que montan DESPUÉS de este efecto (import dinámico de los
    // testimonios, suspensión, navegación cliente) no existían cuando se
    // registró el observer: sin esto se quedaban ocultos para siempre, que es
    // el hueco blanco que se veía en el home.
    let raf = 0
    const mo = new MutationObserver(() => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        escanear()
      })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    // Red de seguridad: nada puede quedar oculto para siempre.
    const safetyTimer = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>(".reveal-armed:not(.visible)")
        .forEach((el) => el.classList.add("visible"))
    }, 3000)

    return () => {
      window.removeEventListener("scroll", onScroll)
      revealObserver.disconnect()
      mo.disconnect()
      if (raf) window.cancelAnimationFrame(raf)
      window.clearTimeout(safetyTimer)
      progress.remove()
      noise.remove()
    }
  }, [])

  return null
}
