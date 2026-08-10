"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function BrandStatement() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-white dark:bg-[#0A0A0F]">
      <div className="glow-line absolute top-0 left-0 right-0" />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 30% 50%,rgba(212,175,55,.03) 0%,transparent 50%),radial-gradient(ellipse at 70% 50%,rgba(200,145,46,.02) 0%,transparent 50%)",
      }} />

      <div className="relative z-10 max-w-360 mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-3 text-[#D4AF37]/70 text-[9px] font-bold uppercase tracking-[.35em] mb-6">
              <span className="w-8 h-px bg-[#D4AF37]/30" />
              Oferta Especial
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tighter leading-[.9] mb-6 text-gray-900 dark:text-white">
              Tecnología que<br />
              <span className="bg-linear-to-r from-[#D4AF37] via-[#D4AF37] to-[#D4AF37]/70 bg-clip-text text-transparent">
                Inspira
              </span>
            </h2>
            <p className="text-base md:text-lg max-w-md mb-8 font-light text-gray-500 dark:text-white/35">
              Los gadgets más exclusivos del mercado. Para los que no se conforman con lo ordinario.
            </p>
            <div className="flex flex-wrap gap-3">
              <LocalizedClientLink
                href="/store"
                className="group inline-flex items-center gap-2.5 px-8 py-4 text-[#0A0A0F] font-bold text-[10px] uppercase tracking-[.25em] rounded-full btn-shine"
                style={{
                  background: "linear-gradient(135deg,#D4AF37,#D4AF37/80)",
                  boxShadow: "0 4px 24px rgba(212,175,55,.2)",
                }}
              >
                Aprovechar Oferta
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/store"
                className="inline-flex items-center px-6 py-4 text-[10px] font-bold uppercase tracking-[.25em] rounded-full border border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all duration-300"
              >
                Ver Colección
              </LocalizedClientLink>
            </div>
          </div>

          <div className="relative flex justify-center md:justify-end reveal r-d2">
            <div className="relative">
              <div
                className="w-52 h-52 md:w-64 md:h-64 rounded-full flex flex-col items-center justify-center animate-float-slow"
                style={{
                  background: "linear-gradient(135deg,rgba(212,175,55,.1),rgba(200,145,46,.05))",
                  border: "2px solid rgba(212,175,55,.15)",
                  boxShadow: "0 0 60px rgba(212,175,55,.08)",
                }}
              >
                <span className="text-[#D4AF37]/60 text-[9px] font-bold uppercase tracking-[.4em] mb-1">Hasta</span>
                <span className="text-6xl md:text-7xl font-bold bg-linear-to-r from-[#D4AF37] via-[#D4AF37] to-[#D4AF37]/70 bg-clip-text text-transparent">
                  40%
                </span>
                <span className="text-gray-400 dark:text-white/30 text-[9px] font-bold uppercase tracking-[.3em] mt-1">OFF</span>
              </div>
              <div className="absolute -top-3 right-6 w-2.5 h-2.5 rounded-full bg-[#D4AF37]/25 animate-float" style={{ animationDuration: "4s" }} />
              <div className="absolute bottom-8 -left-4 w-2 h-2 rounded-full bg-[#D4AF37]/15 animate-float" style={{ animationDuration: "5s", animationDelay: "-2s" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
