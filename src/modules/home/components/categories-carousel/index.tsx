"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const CATEGORIES = [
  {
    title: "Relojería",
    handle: "/store?q=reloj",
    img: "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=600",
  },
  {
    title: "Sonido",
    handle: "/categories/parlantes",
    img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=600",
  },
  {
    title: "Decoración",
    handle: "/store?q=decoracion",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800",
  },
  {
    title: "Fragancias",
    handle: "/store?q=fragancia",
    img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600",
  },
  {
    title: "Tecnología",
    handle: "/store?q=tecnologia",
    img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600",
  },
  {
    title: "Hogar",
    handle: "/store?q=hogar",
    img: "https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=600",
  },
]

const INTERVAL_MS = 5000

export default function CategoriesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Advance to next index (cycles through 0 → CATEGORIES.length-1)
  const advance = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % CATEGORIES.length)
  }, [])

  const goTo = (idx: number) => setCurrentIndex(idx)

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return
    timerRef.current = setInterval(advance, INTERVAL_MS)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [advance, isPaused])

  // Scroll the track so a card-sized slot is in view.
  // We use scrollLeft + smooth behavior — the browser handles
  // the animation natively on the compositor thread (no JS per frame).
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const card = track.children[currentIndex] as HTMLElement
    if (!card) return

    // Center the active card within the visible area
    const trackScrollLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2
    track.scrollTo({ left: Math.max(0, trackScrollLeft), behavior: "smooth" })
  }, [currentIndex])

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Scrollable track — native smooth scroll driven by JS (compositor-only) */}
      <div
        ref={trackRef}
        className="no-scrollbar flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 px-4"
        style={{
          scrollbarWidth: "none",         // Firefox
          msOverflowStyle: "none",        // IE/Edge
          WebkitOverflowScrolling: "touch",
        }}
      >
        {CATEGORIES.map((cat, idx) => {
          const isActive = idx === currentIndex
          return (
            <div
              key={cat.title}
              className="flex-shrink-0 snap-center transition-all duration-500"
              style={{
                width: "clamp(220px, 28vw, 320px)",
                opacity: isActive ? 1 : 0.65,
                transform: isActive ? "scale(1)" : "scale(0.97)",
                transition: "opacity 600ms ease, transform 600ms ease",
              }}
            >
              <LocalizedClientLink href={cat.handle} className="group block">
                <div className="aspect-[3/4] overflow-hidden relative bg-gray-50">
                  <Image
                    src={cat.img}
                    fill
                    sizes="(max-width: 640px) 75vw, (max-width: 1024px) 30vw, 22vw"
                    className="w-full h-full object-cover"
                    style={{
                      transition: "transform 700ms cubic-bezier(0.33, 1, 0.68, 1)",
                    }}
                    alt={cat.title}
                  />
                  {/* Hover zoom via CSS group */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${cat.img})`, backgroundSize: "cover", backgroundPosition: "center" }}
                  />
                  {/* Active indicator line at bottom */}
                  <div
                    className="absolute bottom-0 left-0 h-[2px] bg-black transition-all duration-500"
                    style={{ width: isActive ? "100%" : "0%" }}
                  />
                </div>
                <div className="text-center pt-4">
                  <h3
                    className="text-[11px] uppercase tracking-[0.3em] transition-all duration-300"
                    style={{
                      fontWeight: isActive ? 500 : 300,
                      color: isActive ? "#000" : "#777",
                    }}
                  >
                    {cat.title}
                  </h3>
                </div>
              </LocalizedClientLink>
            </div>
          )
        })}
      </div>

      {/* Dots progress indicator */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {CATEGORIES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Categoría ${CATEGORIES[idx].title}`}
            className="transition-all duration-500 rounded-full focus:outline-none"
            style={{
              width: idx === currentIndex ? "24px" : "6px",
              height: "6px",
              backgroundColor: idx === currentIndex ? "#000" : "rgba(0,0,0,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  )
}
