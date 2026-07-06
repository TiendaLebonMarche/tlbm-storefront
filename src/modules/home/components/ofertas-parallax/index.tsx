"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const offers = [
  {
    title: "Audio Profesional",
    subtitle: "Parlantes y auriculares con la mejor fidelidad de sonido",
    bg: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop",
    label: "Hasta 30% OFF",
    href: "/store?q=audio",
    align: "left",
  },
  {
    title: "Smartwatches",
    subtitle: "Tecnología wearable para tu día a día",
    bg: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1399&auto=format&fit=crop",
    label: "Ofertas Exclusivas",
    href: "/store?q=smartwatch",
    align: "right",
  },
]

export default function OfertasParallax() {
  return (
    <section className="bg-white dark:bg-[#0A0A0F]">
      {offers.map((offer, i) => (
        <div
          key={i}
          className="relative h-[70vh] md:h-[85vh] overflow-hidden bg-black"
        >
          {/* Parallax background image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${offer.bg}')`,
              backgroundAttachment: "fixed",
              transform: "scale(1.1)",
            }}
          />

          {/* Overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                offer.align === "left"
                  ? "linear-gradient(90deg, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.4) 50%, transparent 100%)"
                  : "linear-gradient(-90deg, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.4) 50%, transparent 100%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full max-w-[90rem] mx-auto px-6 lg:px-10 flex items-center">
            <div
              className={`max-w-lg ${
                offer.align === "right" ? "ml-auto text-right" : "text-left"
              }`}
            >
              {/* Label */}
              <div className="inline-flex items-center gap-3 text-[#D4AF37]/80 text-[9px] font-bold uppercase tracking-[.35em] mb-6">
                <span className="w-8 h-px bg-[#D4AF37]/40" />
                {offer.label}
              </div>

              {/* Title */}
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tighter leading-[.9] mb-6 text-white">
                {offer.title}
              </h2>

              {/* Subtitle */}
              <p className="text-base md:text-lg leading-relaxed mb-8 font-light text-white/40">
                {offer.subtitle}
              </p>

              {/* CTA */}
              <LocalizedClientLink
                href={offer.href}
                className="group inline-flex items-center gap-2.5 px-8 py-4 text-[#0A0A0F] font-bold text-[10px] uppercase tracking-[.25em] rounded-full btn-shine"
                style={{
                  background: "linear-gradient(135deg,#D4AF37,#C8912E)",
                  boxShadow: "0 4px 24px rgba(212,175,55,.25)",
                }}
              >
                Comprar Ahora
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
