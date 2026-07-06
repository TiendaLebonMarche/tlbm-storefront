"use client"

import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    // Check initial state
    const isDark = document.documentElement.classList.contains("dark")
    setDark(isDark)
  }, [])

  const toggle = () => {
    document.documentElement.classList.toggle("dark")
    document.body.classList.toggle("dark")
    setDark((prev) => !prev)
  }

  return (
    <button
      onClick={toggle}
      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
      style={{ background: dark ? "#D4AF37" : "rgba(255,255,255,0.1)" }}
      aria-label="Cambiar tema"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke={dark ? "#0A0A0F" : "white"}
        viewBox="0 0 24 24"
      >
        {dark ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        )}
      </svg>
    </button>
  )
}
