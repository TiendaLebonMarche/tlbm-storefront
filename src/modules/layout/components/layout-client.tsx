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
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el))

    return () => {
      window.removeEventListener("scroll", onScroll)
      revealObserver.disconnect()
      progress.remove()
      noise.remove()
    }
  }, [])

  return null
}
