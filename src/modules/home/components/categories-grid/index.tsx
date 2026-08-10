"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const categories = [
  {
    title: "Audio Premium",
    desc: "Parlantes, auriculares y más",
    icon: (
      <svg className="w-6 h-6 text-[#D4AF37]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-[rgba(212,175,55,.04)] to-white dark:to-transparent",
    border: "rgba(212,175,55,.12)",
    bg: "rgba(212,175,55,.15),rgba(200,145,46,.08)",
  },
  {
    title: "Smart Tech",
    desc: "Smartwatches y wearables",
    icon: (
      <svg className="w-6 h-6 text-blue-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    gradient: "from-[rgba(59,130,246,.04)] to-white dark:to-transparent",
    border: "rgba(59,130,246,.12)",
    bg: "rgba(59,130,246,.12),rgba(59,130,246,.06)",
  },
  {
    title: "Accesorios",
    desc: "Cargadores, fundas y más",
    icon: (
      <svg className="w-6 h-6 text-green-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.099 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    gradient: "from-[rgba(34,197,94,.04)] to-white dark:to-transparent",
    border: "rgba(34,197,94,.12)",
    bg: "rgba(34,197,94,.12),rgba(34,197,94,.06)",
  },
  {
    title: "Gaming",
    desc: "Audífonos y periféricos",
    icon: (
      <svg className="w-6 h-6 text-purple-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    gradient: "from-[rgba(168,85,247,.04)] to-white dark:to-transparent",
    border: "rgba(168,85,247,.12)",
    bg: "rgba(168,85,247,.12),rgba(168,85,247,.06)",
  },
]

export default function CategoriesGrid() {
  return (
    <section className="bg-white dark:bg-[#0A0A0F] py-16 lg:py-24">
      <div className="max-w-360 mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12 reveal">
          <div>
            <div className="inline-flex items-center gap-3 text-[#D4AF37]/70 text-[9px] font-bold uppercase tracking-[.4em] mb-4">
              <span className="w-8 h-px bg-[#D4AF37]/30" />
              Categorías
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight leading-[.95] text-gray-900 dark:text-white">
              Explora por{" "}
              <span className="bg-linear-to-r from-[#D4AF37] to-[#D4AF37]/70 bg-clip-text text-transparent">
                Secciones
              </span>
            </h2>
          </div>
          <LocalizedClientLink
            href="/store"
            className="hidden md:inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.28em] text-gray-400 dark:text-white/30 hover:text-[#D4AF37] transition-colors group"
          >
            Ver Todo
            <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </LocalizedClientLink>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <LocalizedClientLink key={i} href="/store" className={`cat-item p-8 flex flex-col justify-end reveal r-d${i + 1} bg-linear-to-b ${cat.gradient}`}>
              <div
                className="mb-4 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg,${cat.bg})`,
                  border: `1px solid ${cat.border}`,
                }}
              >
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">{cat.title}</h3>
              <p className="text-xs text-gray-400 dark:text-white/30 font-light">{cat.desc}</p>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </section>
  )
}
