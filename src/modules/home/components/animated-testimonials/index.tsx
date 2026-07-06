"use client"

const testimonials = [
  {
    initials: "CA",
    name: "Carlos A.",
    location: "Bucaramanga",
    stars: 5,
    text: "Increíble calidad y atención. El parlante que compré superó todas mis expectativas. 100% recomendados.",
  },
  {
    initials: "MP",
    name: "María P.",
    location: "Bogotá",
    stars: 5,
    text: "Mi smartwatch llegó en 3 días. Producto original, bien empacado. Volveré a comprar sin duda.",
  },
  {
    initials: "DG",
    name: "David G.",
    location: "Medellín",
    stars: 4,
    text: "Los audífonos ANC que compré son una locura. La cancelación de ruido es bestial. Envío rapidísimo.",
  },
]

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg className={`w-4 h-4 ${filled ? "text-[#D4AF37]" : "text-gray-300 dark:text-white/20"}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

export default function AnimatedTestimonialsSection() {
  return (
    <section className="relative py-16 lg:py-24 bg-white dark:bg-[#0A0A0F]">
      <div className="glow-line absolute top-0 left-0 right-0" />
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <div className="inline-flex items-center gap-3 text-[#D4AF37]/70 text-[9px] font-bold uppercase tracking-[.4em] mb-4">
            <span className="w-8 h-px bg-[#D4AF37]/30" />
            Clientes
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight leading-[.95] mb-6 text-gray-900 dark:text-white">
            Lo que dicen{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#C8912E] bg-clip-text text-transparent">
              nuestros clientes
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className={`testi-card reveal r-d${i + 1}`}>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <StarIcon key={s} filled={s <= t.stars} />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-white/60 mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[10px] font-bold text-gray-500 dark:text-white/30">
                  {t.initials}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white/80">{t.name}</p>
                  <p className="text-[9px] text-gray-400 dark:text-white/25">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
