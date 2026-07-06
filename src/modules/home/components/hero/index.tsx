"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// ── Constants ──────────────────────────────────────────────────────────────

const PARTICLES = 22
const ORBIT_RINGS = 3
const ORBIT_DOTS = 8

// ── Sub-components ─────────────────────────────────────────────────────────

/** Floating particles scattered behind content */
function BgParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLES }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      delay: Math.random() * 6,
      duration: Math.random() * 4 + 5,
      opacity: Math.random() * 0.35 + 0.08,
    }))
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.size > 2.5 ? "#D4AF37" : "rgba(255,255,255,0.5)",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

/** Radial glow gradient spots in the background */
function BgGlows() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden>
      {/* Central warm glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: "50%",
          height: "60%",
          top: "20%",
          right: "-5%",
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)",
        }}
      />
      {/* Top-right cool glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: "40%",
          height: "40%",
          top: "-5%",
          right: "10%",
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)",
        }}
      />
      {/* Bottom ambient */}
      <div
        className="absolute rounded-full"
        style={{
          width: "60%",
          height: "30%",
          bottom: "0%",
          left: "0%",
          background:
            "radial-gradient(ellipse at center, rgba(200,145,46,0.06) 0%, transparent 70%)",
        }}
      />
    </div>
  )
}

/** Grid overlay with subtle gold lines */
function BgGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[1] opacity-[0.04]"
      aria-hidden
      style={{
        backgroundImage: `
          linear-gradient(rgba(212,175,55,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }}
    />
  )
}

/** Animated orbit visual for the right column */
function OrbitVisual() {
  const rings = useMemo(() => {
    return Array.from({ length: ORBIT_RINGS }, (_, i) => ({
      radius: 60 + i * 48,
      borderDash: i % 2 === 0 ? "8 12" : "2 18",
      rotationDuration: 18 + i * 6,
      direction: i % 2 === 0 ? 1 : -1,
    }))
  }, [])

  const dots = useMemo(() => {
    return Array.from({ length: ORBIT_DOTS }, (_, i) => {
      const angle = (i / ORBIT_DOTS) * Math.PI * 2
      return {
        id: i,
        angle,
        delay: i * 0.25,
        size: i % 2 === 0 ? 6 : 4,
        orbitIndex: i % ORBIT_RINGS,
      }
    })
  }, [])

  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[380px] md:min-h-[440px]">
      {/* Center product showcase card */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="glass w-[140px] h-[140px] md:w-[170px] md:h-[170px] rounded-2xl flex flex-col items-center justify-center gap-3"
          style={{
            border: "1px solid rgba(212,175,55,0.15)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            background: "rgba(10,10,15,0.5)",
            boxShadow: "0 0 60px rgba(212,175,55,0.06)",
          }}
        >
          {/* Box icon SVG */}
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-60"
          >
            <path
              d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
              stroke="#D4AF37"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="#D4AF37"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M12 12V22"
              stroke="#D4AF37"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M7 4.5L17 9.5"
              stroke="#D4AF37"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <span
            className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase"
            style={{ color: "rgba(212,175,55,0.7)" }}
          >
            Producto<br />Destacado
          </span>
        </div>
      </motion.div>

      {/* Orbit rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {rings.map((ring, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: ring.radius * 2,
              height: ring.radius * 2,
              border: "1px dashed rgba(212,175,55,0.12)",
              borderRadius: "50%",
            }}
            animate={{ rotate: 360 * ring.direction }}
            transition={{
              duration: ring.rotationDuration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Orbiting dots */}
      {rings.map((ring, ringIdx) => {
        const dotsOnRing = Array.from(
          { length: 4 + ringIdx * 2 },
          (_, i) => ({
            id: `${ringIdx}-${i}`,
            angle: (i / (4 + ringIdx * 2)) * Math.PI * 2,
            size: ringIdx === 0 ? 5 : ringIdx === 1 ? 4 : 3,
          })
        )
        return dotsOnRing.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute rounded-full"
            style={{
              width: dot.size,
              height: dot.size,
              backgroundColor: "#D4AF37",
              boxShadow: "0 0 8px rgba(212,175,55,0.4)",
              left: `calc(50% + ${ring.radius * Math.cos(dot.angle)}px - ${dot.size / 2}px)`,
              top: `calc(50% + ${ring.radius * Math.sin(dot.angle)}px - ${dot.size / 2}px)`,
            }}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{
              duration: 2.5 + ringIdx * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: dot.id.split("-").reduce((a, b) => a + parseInt(b), 0) * 0.15,
            }}
          />
        ))
      })}
    </div>
  )
}

// ── Main Hero Component ────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      className="relative min-h-[95vh] md:min-h-screen overflow-hidden flex items-center"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      {/* ── Background layers ── */}
      <BgGrid />
      <BgGlows />
      <BgParticles />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 md:px-8 py-24 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* ══════ LEFT COLUMN ══════ */}
          <motion.div
            className="flex flex-col gap-6 md:gap-7"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span
                className="block w-10 h-[1px]"
                style={{ backgroundColor: "#D4AF37" }}
              />
              <span
                className="text-[0.7rem] md:text-[0.75rem] font-semibold tracking-[0.2em] uppercase"
                style={{ color: "#D4AF37" }}
              >
                Colección Verano 2026
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-serif text-[2.8rem] sm:text-[3.6rem] md:text-[4.2rem] lg:text-[5rem] leading-[1.05] font-bold tracking-tight"
              style={{ color: "#fff" }}
            >
              Tecnología<br />
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-[#F5D980] to-[#C8912E]"
              >
                Exclusiva
              </span>
              <br />
              para Ti
            </h1>

            {/* Description */}
            <p
              className="text-sm md:text-base leading-relaxed max-w-[480px]"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
            >
              Descubre la tecnología premium que define tu estilo. 
              Productos originales, selección curada y el mejor servicio 
              desde Bucaramanga para todo Colombia.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2">
              <LocalizedClientLink
                href="/store"
                className="btn-shine inline-flex items-center justify-center min-h-[50px] px-7 md:px-9 rounded-lg text-sm font-bold tracking-[0.06em] uppercase transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #D4AF37 0%, #C8912E 50%, #B8862B 100%)",
                  color: "#0A0A0F",
                  boxShadow: "0 12px 32px rgba(212,175,55,0.25)",
                }}
              >
                Explorar Colección
              </LocalizedClientLink>

              <LocalizedClientLink
                href="/store?q=ofertas"
                className="inline-flex items-center justify-center min-h-[50px] px-7 md:px-9 rounded-lg text-sm font-bold tracking-[0.06em] uppercase transition-all duration-300"
                style={{
                  border: "1px solid rgba(212,175,55,0.2)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  background: "rgba(10,10,15,0.3)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Ver Ofertas
              </LocalizedClientLink>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-6 md:gap-10 mt-4 pt-6 md:pt-7" style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
              {[
                { value: "30+", label: "Productos" },
                { value: "100%", label: "Originales" },
                { value: "CO", label: "Bucaramanga" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className="text-lg md:text-xl font-bold font-serif tracking-tight"
                    style={{ color: "#D4AF37" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-[0.65rem] md:text-[0.7rem] font-medium tracking-[0.12em] uppercase"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ══════ RIGHT COLUMN ══════ */}
          <motion.div
            className="hidden md:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <OrbitVisual />
          </motion.div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-16 md:mt-20 w-full h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)" }} />
      </div>
    </section>
  )
}
