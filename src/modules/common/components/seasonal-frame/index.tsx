import { SEASON } from "@lib/season"

// Marco ambiental GLOBAL (Fase "paquete completo", 03-sep-2026).
// - Fijo al viewport en TODAS las páginas (home + subpáginas), sutil y sin
//   interacción (pointer-events: none, z por debajo de topbar/header).
// - Solo escritorio (>=768px): en móvil el hero ya lleva su decoración y el
//   viewport es pequeño — no estorbar.
// - En "default" no renderiza nada → diseño actual IDÉNTICO.

function WebCorner({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 150 150"
      className="h-full w-full"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <path d="M150 0 L0 0 L0 150" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M150 0 L38 38 L0 150" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M150 0 L75 38 L0 112" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M150 0 L112 38 L0 75" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M38 0 L0 38" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <path d="M75 0 L0 75" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <path d="M112 0 L0 112" stroke="currentColor" strokeWidth="0.8" fill="none" />
    </svg>
  )
}

function HeartSketch() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      <path
        d="M50 84 C22 62 12 42 22 29 C31 17 47 21 50 33 C53 21 69 17 78 29 C88 42 78 62 50 84 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M40 26 C44 19 56 19 60 26" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function SparkleSketch() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      <path
        d="M50 10 C53 34 55 43 63 50 C55 57 53 66 50 90 C47 66 45 57 37 50 C45 43 47 34 50 10 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function SeasonalFrame() {
  if (SEASON === "default") return null

  return (
    <div className="season-frame" aria-hidden="true" data-season={SEASON}>
      {SEASON === "halloween" && (
        <>
          <span className="sf sf-tl sf-web sf-web--a">
            <WebCorner />
          </span>
          <span className="sf sf-bl sf-emo" style={{ fontSize: 30 }}>
            🦇
          </span>
          <span className="sf sf-tr sf-emo" style={{ fontSize: 26 }}>
            🎃
          </span>
        </>
      )}

      {SEASON === "navidad" && (
        <>
          <span className="sf sf-tl sf-emo" style={{ fontSize: 30 }}>
            ❄️
          </span>
          <span className="sf sf-tr sf-emo" style={{ fontSize: 24 }}>
            ✨
          </span>
          <span className="sf sf-bl sf-emo" style={{ fontSize: 28 }}>
            🎄
          </span>
        </>
      )}

      {(SEASON === "san-valentin" || SEASON === "amor-amistad") && (
        <>
          <span className="sf sf-tl sf-heart">
            <HeartSketch />
          </span>
          <span className="sf sf-tr sf-sparkle">
            <SparkleSketch />
          </span>
          <span className="sf sf-bl sf-emo" style={{ fontSize: 28 }}>
            💕
          </span>
        </>
      )}
    </div>
  )
}
