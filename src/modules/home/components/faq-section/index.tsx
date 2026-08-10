import { FAQ_ITEMS, PROOF_STATS } from "@lib/faq"

/**
 * Sección FAQ (rediseño 10-ago-2026): ancho completo (max-w-[95rem] como el
 * header), grid editorial de 2 columnas en desktop — izquierda: heading +
 * stats + CTA WhatsApp (sticky); derecha: acordeones elegantes con número
 * dorado. Las preguntas/respuestas vienen de @lib/faq — la MISMA fuente del
 * schema FAQPage (el schema refleja siempre contenido visible).
 */
export default function FaqSection() {
  return (
    <section
      id="faq"
      className="relative py-20 md:py-28 bg-white dark:bg-[#0A0A0F]"
      aria-label="Preguntas frecuentes"
    >
      <div className="glow-line absolute top-0 left-0 right-0" />
      <div className="max-w-380 mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
          {/* ── Columna izquierda: heading editorial + proof + CTA (sticky) ── */}
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-3 text-[#D4AF37]/70 text-[9px] font-bold uppercase tracking-[.4em] mb-4">
              <span className="w-8 h-px bg-[#D4AF37]/30" />
              Ayuda
            </div>
            <h2 className="text-[42px] md:text-[56px] xl:text-[64px] leading-[0.95] tracking-tighter font-serif font-bold text-gray-900 dark:text-white">
              Preguntas{" "}
              <span className="bg-linear-to-r from-[#D4AF37] to-[#D4AF37]/70 bg-clip-text text-transparent">
                frecuentes
              </span>
            </h2>
            <p className="mt-5 text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-sm">
              Todo lo que necesitas saber antes de comprar. ¿Otra duda? Escríbenos
              por WhatsApp y te respondemos directo.
            </p>

            {/* Proof — cifras reales y comprobables */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {PROOF_STATS.map((s) => (
                <div
                  key={s.label}
                  className="text-center rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#14141E] px-4 py-6"
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

            {/* CTA WhatsApp */}
            <a
              href="https://wa.me/573027567783?text=Hola!%20Tengo%20una%20duda%20antes%20de%20comprar%20%F0%9F%91%8B"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 bg-[#0A0A0F] text-white text-xs font-bold uppercase tracking-[0.2em] px-7 py-4 rounded-full hover:bg-[#D4AF37] hover:text-black transition-colors duration-300"
            >
              Escríbenos por WhatsApp
            </a>
          </div>

          {/* ── Columna derecha: acordeones FAQ (ancho completo) ── */}
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#14141E] overflow-hidden transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(10,10,15,0.06)]"
              >
                <summary className="flex items-center justify-between gap-4 px-6 md:px-8 py-5 md:py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-4">
                    <span className="hidden md:inline text-[#D4AF37]/60 text-[10px] font-bold tracking-widest w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                      {item.question}
                    </span>
                  </span>
                  <svg
                    className="w-5 h-5 text-[#D4AF37] shrink-0 transition-transform duration-300 group-open:rotate-45"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </summary>
                <p className="px-6 md:px-8 pb-6 text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-50 dark:border-white/5 pt-5 md:ml-10">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
