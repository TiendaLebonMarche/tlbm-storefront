import { FAQ_ITEMS, PROOF_STATS } from "@lib/faq"

/**
 * Sección FAQ visible + proof con cifras reales (framework AI SEO puntos 8 y 11).
 * Las preguntas/respuestas vienen de @lib/faq — la MISMA fuente del schema FAQPage,
 * para que el schema refleje siempre contenido visible.
 */
export default function FaqSection() {
  return (
    <section
      id="faq"
      className="relative py-20 md:py-24 bg-white dark:bg-[#0A0A0F]"
      aria-label="Preguntas frecuentes"
    >
      <div className="glow-line absolute top-0 left-0 right-0" />
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-3 text-[#D4AF37]/70 text-[9px] font-bold uppercase tracking-[.4em] mb-4">
            <span className="w-8 h-px bg-[#D4AF37]/30" />
            Ayuda
          </div>
          <h2 className="text-[42px] md:text-[56px] leading-[0.95] tracking-[-0.05em] font-serif font-bold text-gray-900 dark:text-white">
            Preguntas{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/70 bg-clip-text text-transparent">
              frecuentes
            </span>
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            Todo lo que necesitas saber antes de comprar. ¿Otra duda? Escríbenos por
            WhatsApp.
          </p>
        </div>

        {/* Proof — cifras reales y comprobables (punto 11) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {PROOF_STATS.map((s) => (
            <div
              key={s.label}
              className="text-center rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#14141E] px-4 py-7"
            >
              <p className="font-serif text-3xl md:text-4xl font-bold text-[#D4AF37]">
                {s.value}
              </p>
              <p className="mt-2 text-[10px] md:text-[11px] text-gray-500 dark:text-white/40 uppercase tracking-wider">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ visible — mismas preguntas del schema FAQPage */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#14141E] overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none text-sm font-semibold text-gray-900 dark:text-white [&::-webkit-details-marker]:hidden">
                {item.question}
                <svg
                  className="w-4 h-4 text-[#D4AF37] flex-shrink-0 transition-transform duration-300 group-open:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </summary>
              <p className="px-6 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
