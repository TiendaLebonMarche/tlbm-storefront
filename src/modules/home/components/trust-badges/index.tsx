"use client"

import Reveal from "@modules/common/components/reveal"

const badges = [
  {
    icon: (
      <svg className="w-5 h-5 text-[#D4AF37]/80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "100% Original",
    desc: "Garantizado",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#D4AF37]/80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "Envío Exprés",
    desc: "2-5 días hábiles",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#D4AF37]/80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
    title: "Pago Seguro",
    desc: "Nequi · Daviplata · TC",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#D4AF37]/80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Soporte 24/7",
    desc: "WhatsApp directo",
  },
]

export default function TrustBadges() {
  return (
    <section className="w-full bg-white dark:bg-[#0A0A0F] py-6">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 reveal">
          {badges.map((b, i) => (
            <div key={i} className="trust-item">
              {b.icon}
              <div>
                <p className="text-[11px] font-semibold text-gray-900 dark:text-white/80">{b.title}</p>
                <p className="text-[9px] text-gray-400 dark:text-white/30">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
