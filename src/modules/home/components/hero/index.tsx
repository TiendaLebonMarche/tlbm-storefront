"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// ── Constants ──────────────────────────────────────────────────────────────

const PARTICLES = 22
const ORBIT_RINGS = 3

// ── Sub-components ─────────────────────────────────────────────────────────

/** Floating particles — uses deterministic positions (no Math.random) */
function BgParticles() {
  const particles = useMemo(() => {
    // seed-based deterministic positions to avoid hydration mismatch
    const seeds = [
      {x:15,y:20,s:2.5,d:5.5,dr:8,o:0.25},{x:78,y:10,s:3,d:2.0,dr:7,o:0.35},
      {x:45,y:85,s:1.8,d:3.5,dr:9,o:0.15},{x:88,y:60,s:2.2,d:1.0,dr:6,o:0.30},
      {x:5,y:50,s:3.5,d:4.0,dr:10,o:0.20},{x:60,y:30,s:1.5,d:0.5,dr:7.5,o:0.28},
      {x:30,y:70,s:2.8,d:5.5,dr:8.5,o:0.18},{x:92,y:35,s:2.0,d:3.0,dr:6.5,o:0.32},
      {x:55,y:5,s:1.6,d:1.5,dr:9.5,o:0.22},{x:20,y:45,s:3.2,d:4.5,dr:7,o:0.12},
      {x:70,y:75,s:1.4,d:2.5,dr:8,o:0.35},{x:40,y:15,s:2.6,d:0.0,dr:6,o:0.20},
      {x:82,y:80,s:1.9,d:5.0,dr:9,o:0.15},{x:10,y:90,s:2.3,d:3.0,dr:7.5,o:0.28},
      {x:65,y:55,s:3.1,d:1.0,dr:8.5,o:0.10},{x:35,y:40,s:1.7,d:4.0,dr:6.5,o:0.30},
      {x:75,y:25,s:2.4,d:2.0,dr:9,o:0.22},{x:50,y:65,s:2.9,d:5.5,dr:7,o:0.18},
      {x:25,y:10,s:1.3,d:3.5,dr:8,o:0.32},{x:85,y:45,s:2.1,d:0.5,dr:6,o:0.25},
      {x:95,y:70,s:2.7,d:4.5,dr:9.5,o:0.15},{x:12,y:30,s:1.8,d:2.5,dr:7,o:0.28},
    ]
    return seeds.map((s, i) => ({
      id: i, x: s.x, y: s.y, size: s.s,
      delay: s.d, duration: s.dr, opacity: s.o,
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
          animate={{ y: [0, -20, 0], opacity: [p.opacity, p.opacity * 2, p.opacity] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

function BgGlows() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden>
      <div className="absolute rounded-full" style={{ width: "50%", height: "60%", top: "20%", right: "-5%", background: "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)" }} />
      <div className="absolute rounded-full" style={{ width: "40%", height: "40%", top: "-5%", right: "10%", background: "radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />
      <div className="absolute rounded-full" style={{ width: "60%", height: "30%", bottom: "0%", left: "0%", background: "radial-gradient(ellipse at center, rgba(200,145,46,0.06) 0%, transparent 70%)" }} />
    </div>
  )
}

function BgGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.04]" aria-hidden
      style={{ backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }}
    />
  )
}

/** Orbit visual for the right column */
function OrbitVisual() {
  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[380px] md:min-h-[440px]">
      {/* Center card */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="glass w-[140px] h-[140px] md:w-[170px] md:h-[170px] rounded-2xl flex flex-col items-center justify-center gap-3"
          style={{
            border: "1px solid rgba(212,175,55,0.15)",
            background: "rgba(10,10,15,0.5)",
            boxShadow: "0 0 60px rgba(212,175,55,0.06)",
          }}
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className="opacity-60">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#D4AF37" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#D4AF37" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M12 12V22" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M7 4.5L17 9.5" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase" style={{ color: "rgba(212,175,55,0.7)" }}>
            Producto<br />Destacado
          </span>
        </div>
      </motion.div>

      {/* Orbit rings */}
      {[0, 1, 2].map((i) => {
        const radius = 60 + i * 48
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ width: radius * 2, height: radius * 2, border: i % 2 === 0 ? "1px dashed rgba(212,175,55,0.12)" : "1px dashed rgba(212,175,55,0.08)", borderRadius: "50%" }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 18 + i * 6, repeat: Infinity, ease: "linear" }}
          />
        )
      })}
    </div>
  )
}

// ── Main Hero ──────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      className="relative min-h-[95vh] md:min-h-screen overflow-hidden flex items-center"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      <BgGrid />
      <BgGlows />
      <BgParticles />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 md:px-8 py-24 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* LEFT COLUMN — visible from server render, animated on viewport entry */}
          <motion.div
            className="flex flex-col gap-6 md:gap-7"
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3">
              <span className="block w-10 h-[1px]" style={{ backgroundColor: "#D4AF37" }} />
              <span className="text-[0.7rem] md:text-[0.75rem] font-semibold tracking-[0.2em] uppercase" style={{ color: "#D4AF37" }}>
                Colección Verano 2026
              </span>
            </div>

            <h1 className="font-serif text-[2.8rem] sm:text-[3.6rem] md:text-[4.2rem] lg:text-[5rem] leading-[1.05] font-bold tracking-tight text-white">
              Tecnología<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5D980] to-[#C8912E]">
                Exclusiva
              </span>
              <br />
              para Ti
            </h1>

            <p className="text-sm md:text-base leading-relaxed max-w-[480px]" style={{ color: "rgba(255,255,255,0.4)" }}>
              Descubre la tecnología premium que define tu estilo.
              Productos originales, selección curada y el mejor servicio
              desde Bucaramanga para todo Colombia.
            </p>

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
                  background: "rgba(10,10,15,0.3)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Ver Ofertas
              </LocalizedClientLink>
            </div>

            <div className="flex items-center gap-6 md:gap-10 mt-4 pt-6 md:pt-7" style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
              {[
                { value: "30+", label: "Productos" },
                { value: "100%", label: "Originales" },
                { value: "CO", label: "Bucaramanga" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-lg md:text-xl font-bold font-serif tracking-tight" style={{ color: "#D4AF37" }}>
                    {stat.value}
                  </span>
                  <span className="text-[0.65rem] md:text-[0.7rem] font-medium tracking-[0.12em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div
            className="hidden md:flex items-center justify-center"
            initial={false}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <OrbitVisual />
          </motion.div>
        </div>

        <div className="mt-16 md:mt-20 w-full h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)" }} />
      </div>
    </section>
  )
}
