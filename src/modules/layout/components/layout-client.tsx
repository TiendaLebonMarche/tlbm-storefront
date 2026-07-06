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

    // ── Theme Toggle Button ──
    const btn = document.createElement("button")
    btn.id = "theme-btn"
    btn.setAttribute("aria-label", "Cambiar tema")
    btn.innerHTML =
      '<svg id="t-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>'
    document.body.appendChild(btn)

    // Theme toggle logic
    btn.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark")
      document.body.classList.toggle("dark")
      const icon = document.getElementById("t-icon")
      if (icon) {
        if (document.documentElement.classList.contains("dark")) {
          icon.innerHTML =
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>'
        } else {
          icon.innerHTML =
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>'
        }
      }
    })

    // Scroll progress handler
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      const p = Math.min((window.scrollY / h) * 100, 100)
      const el = document.getElementById("scroll-progress")
      if (el) el.style.width = p + "%"
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      progress.remove()
      noise.remove()
      btn.remove()
    }
  }, [])

  return null
}
