"use client"

import { useEffect, useRef, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// ── Constants ────────────────────────────────────────────────────────────────
const SLIDE_TIME = 8000
const TRANSITION_MS = 1300

const SLIDES = [
  {
    bg: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2200",
    bgPos: "center",
    bgPosMobile: "center",
    eyebrow: "Tu tienda online",
    title: "LE BON MARCHÉ",
    copy: "Tienda virtual retail en Bucaramanga. ❤️",
    btn: "Comprar ahora",
    href: "/store",
    align: "left",
    tag: "h1",
  },
  {
    bg: "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto,w_2200/v1778526049/ChatGPT_Image_11_may_2026_13_33_38_jiqtmt.png",
    bgPos: "center 42%",
    bgPosMobile: "center",
    eyebrow: "Compra inteligente",
    title: "PRODUCTOS ORIGINALES",
    copy: "Tenemos los mejores productos a los mejores precios.",
    btn: "Explorar más",
    href: "/store",
    align: "center",
    tag: "h2",
  },
  {
    bg: "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto,w_2200/v1778521762/ChatGPT_Image_11_may_2026_12_48_02_1_s1pzmt.png",
    bgPos: "center 38%",
    bgPosMobile: "center",
    eyebrow: "Ofertas detectadas",
    title: "PRECIOS DE LOCURA",
    copy: "Manejamos un ejército de bots buscando ofertas para ti.",
    btn: "Ver ofertas",
    href: "/store",
    align: "right",
    tag: "h2",
  },
] as const

const BRANDS = [
  { slug: "acer", label: "Acer" },
  { slug: "sony", label: "Sony" },
  { slug: "jbl", label: "JBL" },
  { slug: "puma", label: "PUMA" },
  { slug: "nike", label: "NIKE" },
  { slug: "adidas", label: "ADIDAS" },
  { slug: "underarmour", label: "UNDER ARMOR" },
  { slug: "xiaomi", label: "XIAOMI" },
  { slug: "samsung", label: "SAMSUNG" },
  { slug: "redmi", label: "REDMI" },
  { slug: "insta360", label: "INSTA360" },
  { slug: "dji", label: "DJI" },
  { slug: "starlink", label: "STARLINK" },
  { slug: "dell", label: "DELL" },
  { slug: "champion", label: "CHAMPIONS" },
  { slug: "passau", label: "PASSAU" },
]

// ── Component ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [incoming, setIncoming] = useState<number | null>(null)
  const [progKey, setProgKey] = useState(0)

  // Refs for timer control & transitioning guard (avoids stale closures)
  const busyRef = useRef(false)
  const slideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const transTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const currentRef = useRef(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  function clearAllTimers() {
    if (slideTimerRef.current) clearTimeout(slideTimerRef.current)
    if (transTimerRef.current) clearTimeout(transTimerRef.current)
  }

  function scheduleNext(fromIndex: number) {
    clearAllTimers()
    slideTimerRef.current = setTimeout(() => {
      goTo((fromIndex + 1) % SLIDES.length)
    }, SLIDE_TIME)
  }

  function goTo(next: number) {
    if (busyRef.current || next === currentRef.current) {
      scheduleNext(currentRef.current)
      return
    }
    clearAllTimers()
    busyRef.current = true
    setIncoming(next)

    transTimerRef.current = setTimeout(() => {
      currentRef.current = next
      setCurrent(next)
      setIncoming(null)
      setProgKey(k => k + 1)
      busyRef.current = false
      scheduleNext(next)
    }, TRANSITION_MS)
  }

  // Bootstrap autoplay
  useEffect(() => {
    setProgKey(k => k + 1)
    scheduleNext(0)
    return () => {
      clearAllTimers()
      cancelAnimationFrame(rafRef.current)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Wave canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const mobile = () => window.innerWidth <= 760
    let cW = 0, cH = 0

    function resize() {
      const pr = Math.min(window.devicePixelRatio || 1, mobile() ? 1.4 : 2)
      cW = window.innerWidth; cH = window.innerHeight
      canvas!.width = Math.floor(cW * pr)
      canvas!.height = Math.floor(cH * pr)
      canvas!.style.width = `${cW}px`
      canvas!.style.height = `${cH}px`
      ctx!.setTransform(pr, 0, 0, pr, 0, 0)
    }

    function draw(t: number = 0) {
      ctx!.clearRect(0, 0, cW, cH)
      ctx!.lineWidth = 1
      const lines = mobile() ? 16 : 28
      const pts = mobile() ? 58 : 90
      for (let l = 0; l < lines; l++) {
        ctx!.beginPath()
        ctx!.strokeStyle = `rgba(255,255,255,${0.025 + l * 0.0025})`
        for (let p = 0; p <= pts; p++) {
          const x = (p / pts) * cW
          const base = cH * 0.22 + l * 22
          const y = base
            + Math.sin(p * 0.18 + t * 0.00045 + l * 0.32) * 32
            + Math.cos(p * 0.09 + t * 0.00028 + l) * 18
          p === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y)
        }
        ctx!.stroke()
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  function handleNav(dir: number) {
    clearAllTimers()
    busyRef.current = false
    goTo((currentRef.current + dir + SLIDES.length) % SLIDES.length)
  }

  function handleDot(idx: number) {
    clearAllTimers()
    busyRef.current = false
    goTo(idx)
  }

  return (
    <>
      <style>{`
        /* ── Tokens ── */
        .tlbm-hero {
          --accent: #1f7aff;
          --accent-dk: #075ad6;
          --muted: rgba(255,255,255,0.78);
          --line: rgba(255,255,255,0.24);
          --max-w: 1120px;
          --slide-ms: ${SLIDE_TIME}ms;
          --trans-ms: ${TRANSITION_MS}ms;
        }

        /* ── Hero wrapper ── */
        .tlbm-hero {
          position: relative;
          isolation: isolate;
          min-height: 100vh;
          min-height: 100dvh;
          overflow: hidden;
          background: #090b10;
        }

        /* ── Slide backgrounds ── */
        .tlbm-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-position: var(--pos, center);
          background-size: cover;
          opacity: 0;
          transform: scale(1.08);
          transition: opacity 400ms ease, transform 1600ms ease;
          will-change: opacity, transform;
        }
        .tlbm-bg.is-active { opacity: 1; transform: scale(1); }
        .tlbm-bg.is-incoming {
          z-index: 1;
          opacity: 1;
          transform: scale(1.02);
          clip-path: inset(0 100% 0 0);
          animation: tlbm-reveal var(--trans-ms) cubic-bezier(0.12,0.76,0.34,1) forwards;
        }

        /* ── Overlays ── */
        .tlbm-overlay {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background:
            linear-gradient(90deg,rgba(4,7,13,.54) 0%,rgba(4,7,13,.28) 48%,rgba(4,7,13,.08) 100%),
            linear-gradient(0deg,rgba(4,7,13,.38) 0%,rgba(4,7,13,.04) 48%,rgba(4,7,13,.28) 100%);
        }
        .tlbm-wave {
          position: absolute; inset: 0; z-index: 3;
          width: 100%; height: 100%; opacity: .28; pointer-events: none;
        }

        /* ── Inner grid ── */
        .tlbm-inner {
          position: relative; z-index: 4;
          width: min(var(--max-w), calc(100% - 40px));
          min-height: 100vh; min-height: 100dvh;
          margin: 0 auto; display: grid; align-items: center;
          padding: clamp(88px,12vh,150px) 0 clamp(98px,14vh,150px);
        }

        /* ── Slides ── */
        .tlbm-slide {
          grid-area: 1/1; max-width: 720px;
          opacity: 0; transform: translateX(-40px); pointer-events: none;
          transition:
            opacity 800ms cubic-bezier(0.12,0.78,0.36,1),
            transform 800ms cubic-bezier(0.12,0.78,0.36,1);
        }
        /* Active slide state */
        .tlbm-slide.is-active:not(.is-leaving) { opacity: 1; transform: translateX(0); pointer-events: auto; }
        
        /* Outgoing state */
        .tlbm-slide.is-leaving {
          opacity: 0; transform: translateX(40px);
          transition: opacity 400ms ease, transform 400ms ease;
        }

        /* Incoming state - synchronized with wipe */
        .tlbm-slide.is-entering {
          opacity: 1; transform: translateX(0);
          transition: opacity 800ms ease 500ms, transform 800ms ease 500ms;
          pointer-events: auto;
        }

        .tlbm-slide.align-center { justify-self: center; text-align: center; }
        .tlbm-slide.align-center .tlbm-eyebrow { justify-content: center; }
        .tlbm-slide.align-center .tlbm-eyebrow::before { display: none; }
        .tlbm-slide.align-center .tlbm-actions { justify-content: center; }

        .tlbm-slide.align-right { justify-self: end; text-align: right; }
        .tlbm-slide.align-right .tlbm-eyebrow { justify-content: flex-end; }
        .tlbm-slide.align-right .tlbm-actions { justify-content: flex-end; }

        /* ── Eyebrow ── */
        .tlbm-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          margin: 0 0 18px; color: var(--muted);
          font-size: .78rem; font-weight: 800;
          letter-spacing: .16em; text-transform: uppercase;
        }
        .tlbm-eyebrow::before {
          content: ""; width: 42px; height: 1px; background: var(--accent);
        }

        /* ── Title ── */
        .tlbm-title {
          margin: 0; max-width: 10ch;
          font-family: var(--font-inter, Inter, ui-sans-serif, system-ui, sans-serif);
          font-size: clamp(3rem,9vw,6.8rem);
          font-weight: 900; line-height: .92;
          color: transparent;
          background: linear-gradient(104deg,#fff 0%,#fff 38%,#d9fbff 50%,#fff 62%,#fff 100%);
          background-size: 220% 100%;
          background-clip: text; -webkit-background-clip: text;
          filter: drop-shadow(0 16px 34px rgba(0,0,0,.38));
          animation: tlbm-sheen 6.8s cubic-bezier(.42,0,.2,1) infinite;
        }

        /* ── Copy ── */
        .tlbm-copy {
          max-width: 560px; margin: 24px 0 0;
          font-family: var(--font-fraunces, Georgia, serif);
          color: var(--muted);
          font-size: clamp(1.08rem,1.9vw,1.3rem);
          font-weight: 500; line-height: 1.48;
        }

        /* ── Actions ── */
        .tlbm-actions {
          display: flex; align-items: center;
          flex-wrap: wrap; gap: 14px; margin-top: 34px;
        }
        .tlbm-btn {
          display: inline-flex; align-items: center; justify-content: center;
          min-height: 52px; padding: 0 26px;
          border: 1px solid transparent; border-radius: 6px;
          color: #fff; background: var(--accent);
          box-shadow: 0 14px 34px rgba(31,122,255,.28);
          font-family: var(--font-public-sans, Inter, ui-sans-serif, system-ui, sans-serif);
          font-size: .86rem; font-weight: 800;
          letter-spacing: .08em; text-decoration: none; text-transform: uppercase;
          transition: transform 180ms ease, background 180ms ease;
        }
        .tlbm-btn:hover { background: var(--accent-dk); transform: translateY(-2px); }

        /* ── Controls ── */
        .tlbm-controls {
          position: absolute;
          right: max(20px, calc((100vw - var(--max-w)) / 2));
          bottom: 36px; z-index: 5;
          display: flex; align-items: center; gap: 12px;
        }
        .tlbm-ctrl {
          display: inline-grid; place-items: center;
          width: 42px; height: 42px;
          border: 1px solid var(--line); border-radius: 999px;
          color: #fff; background: rgba(8,10,16,.44);
          cursor: pointer; backdrop-filter: blur(12px);
          transition: background 180ms ease, border-color 180ms ease, transform 180ms ease;
        }
        .tlbm-ctrl:hover {
          border-color: rgba(255,255,255,.56);
          background: rgba(255,255,255,.16); transform: translateY(-1px); outline: none;
        }
        .tlbm-ctrl svg { width: 18px; height: 18px; }

        .tlbm-dots { display: flex; align-items: center; gap: 8px; }
        .tlbm-dot {
          display: inline-grid; place-items: center;
          width: 12px; height: 12px; padding: 0;
          border: 1px solid var(--line); border-radius: 999px;
          background: rgba(255,255,255,.36);
          cursor: pointer; transition: all 180ms ease;
        }
        .tlbm-dot:hover { border-color: rgba(255,255,255,.56); background: rgba(255,255,255,.16); }
        .tlbm-dot.is-active { width: 34px; border-color: transparent; background: #fff; }

        /* ── Progress ── */
        .tlbm-progress {
          position: absolute; left: 0; bottom: 0; z-index: 5;
          width: 100%; height: 4px; overflow: hidden;
          background: rgba(255,255,255,.16);
        }
        .tlbm-progress-bar {
          display: block; width: 100%; height: 100%;
          background: #00e5ff;
          box-shadow: 0 0 16px rgba(0,229,255,.65);
          transform-origin: left; transform: scaleX(0);
          animation: tlbm-progress var(--slide-ms) linear forwards;
        }

        /* ── Brand marquee ── */
        .tlbm-marquee {
          overflow: hidden; background: #fff;
          border-top: 1px solid rgba(10,12,18,.08);
          border-bottom: 1px solid rgba(10,12,18,.08);
          padding: 24px 0;
        }
        .tlbm-mq-inner {
          display: flex; width: max-content;
          animation: tlbm-marquee 46s linear infinite;
          will-change: transform;
        }
        .tlbm-mq-track {
          display: flex; align-items: center;
          gap: 18px; padding-right: 18px;
        }
        .tlbm-brand {
          display: inline-flex; align-items: center; justify-content: center;
          flex: 0 0 auto;
          width: clamp(132px,14vw,180px); height: 74px;
          padding: 16px 24px;
          border: 1px solid rgba(11,14,22,.08); border-radius: 8px;
          background: #fff; box-shadow: 0 12px 34px rgba(10,14,24,.06);
        }
        .tlbm-brand img { display: block; max-width: 100%; max-height: 34px; object-fit: contain; }
        .tlbm-brand span {
          color: #11151f; font-size: .82rem; font-weight: 900;
          letter-spacing: .08em; text-transform: uppercase; white-space: nowrap;
        }
        .tlbm-brand-fb { display: none; }

        /* ── Keyframes ── */
        @keyframes tlbm-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes tlbm-reveal {
          from { clip-path: inset(0 100% 0 0); transform: scale(1.035); }
          to   { clip-path: inset(0 0% 0 0);   transform: scale(1); }
        }
        @keyframes tlbm-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes tlbm-sheen {
          0%,22%   { background-position: 115% 50%; }
          56%,100% { background-position: -95% 50%; }
        }

        /* ── Mobile ── */
        @media (max-width: 760px) {
          .tlbm-inner {
            width: min(100% - 28px, var(--max-w));
            padding-top: 76px; padding-bottom: 146px; align-items: end;
          }
          .tlbm-title { max-width: 9ch; font-size: clamp(2.65rem,15vw,4.4rem); line-height: .94; }
          .tlbm-bg { background-position: var(--pos-mobile, var(--pos, center)); }

          .tlbm-slide.align-center,
          .tlbm-slide.align-right { justify-self: start; text-align: left; }
          .tlbm-slide.align-center .tlbm-eyebrow,
          .tlbm-slide.align-right  .tlbm-eyebrow { justify-content: flex-start; }
          .tlbm-slide.align-center .tlbm-eyebrow::before { display: block; }
          .tlbm-slide.align-center .tlbm-actions,
          .tlbm-slide.align-right  .tlbm-actions { justify-content: flex-start; }
          .tlbm-copy { margin-top: 18px; max-width: 22rem; font-size: clamp(1rem,4.7vw,1.14rem); }
          .tlbm-actions { flex-direction: column; align-items: stretch; }
          .tlbm-btn { width: 100%; }
          .tlbm-controls { left: 14px; right: 14px; bottom: 30px; justify-content: center; }
          .tlbm-ctrl { width: 38px; height: 38px; }
          .tlbm-dot.is-active { width: 28px; }
          .tlbm-marquee { padding: 18px 0; }
          .tlbm-mq-inner { animation-duration: 36s; }
          .tlbm-mq-track { gap: 12px; padding-right: 12px; }
          .tlbm-brand { width: 128px; height: 62px; padding: 14px 18px; }
          .tlbm-brand img { max-height: 28px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tlbm-bg,
          .tlbm-slide { transition-duration: 0.01ms !important; }
          .tlbm-bg.is-incoming { animation-duration: 0.01ms !important; }
          .tlbm-mq-inner { animation: tlbm-marquee 46s linear infinite !important; }
        }
      `}</style>

      {/* ─── HERO SECTION ─── */}
      <section className="tlbm-hero" aria-label="Promociones destacadas">

        {/* Backgrounds */}
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`tlbm-bg${i === current ? " is-active" : ""}${i === incoming ? " is-incoming" : ""}`}
            style={{
              backgroundImage: `url('${s.bg}')`,
              ["--pos" as string]: s.bgPos,
              ["--pos-mobile" as string]: s.bgPosMobile,
            }}
          />
        ))}

        <div className="tlbm-overlay" aria-hidden="true" />
        <canvas ref={canvasRef} className="tlbm-wave" aria-hidden="true" />

        {/* Slide content */}
        <div className="tlbm-inner">
          {SLIDES.map((s, i) => {
            const Tag = s.tag as "h1" | "h2"
            return (
              <article
                key={i}
                className={`tlbm-slide align-${s.align}
                  ${i === current ? " is-active" : ""}
                  ${incoming !== null && i === current ? " is-leaving" : ""}
                  ${i === incoming ? " is-entering" : ""}
                `}
              >
                <p className="tlbm-eyebrow">{s.eyebrow}</p>
                <Tag className="tlbm-title">{s.title}</Tag>
                <p className="tlbm-copy">{s.copy}</p>
                <div className="tlbm-actions">
                  <LocalizedClientLink href={s.href} className="tlbm-btn">
                    {s.btn}
                  </LocalizedClientLink>
                </div>
              </article>
            )
          })}
        </div>

        {/* Navigation controls */}
        <div className="tlbm-controls" aria-label="Controles del carrusel">
          <button
            className="tlbm-ctrl"
            type="button"
            aria-label="Slide anterior"
            onClick={() => handleNav(-1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="tlbm-dots" role="tablist" aria-label="Elegir promoción">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`tlbm-dot${i === current ? " is-active" : ""}`}
                type="button"
                role="tab"
                aria-label={`Mostrar promoción ${i + 1}`}
                aria-selected={i === current}
                onClick={() => handleDot(i)}
              />
            ))}
          </div>

          <button
            className="tlbm-ctrl"
            type="button"
            aria-label="Slide siguiente"
            onClick={() => handleNav(1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="tlbm-progress" aria-hidden="true">
          <span key={progKey} className="tlbm-progress-bar" />
        </div>
      </section>

      {/* ─── BRAND MARQUEE ─── */}
      <section className="tlbm-marquee" aria-label="Marcas disponibles">
        <div className="tlbm-mq-inner">
          {[false, true].map((isDupe) => (
            <div key={String(isDupe)} className="tlbm-mq-track" aria-hidden={isDupe || undefined}>
              {BRANDS.map(({ slug, label }) => (
                <div key={slug} className="tlbm-brand">
                  <img
                    src={`https://cdn.simpleicons.org/${slug}/11151f`}
                    alt={isDupe ? "" : label}
                    loading="lazy"
                    onError={(e) => {
                      const img = e.currentTarget
                      img.style.display = "none"
                      const fb = img.nextElementSibling as HTMLElement | null
                      if (fb) fb.style.display = "inline"
                    }}
                  />
                  <span className="tlbm-brand-fb">{label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
