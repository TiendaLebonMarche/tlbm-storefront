"use client"

const BRANDS = [
  "Xiaomi", "Samsung", "Sony", "JBL", "Bose", "DJI", "Apple",
  "Xiaomi", "Samsung", "Sony", "JBL", "Bose", "DJI", "Apple",
]

export default function BrandMarquee() {
  return (
    <section className="py-8 overflow-hidden bg-white dark:bg-[#0A0A0F]">
      <div className="flex whitespace-nowrap animate-brand-scroll">
        {[0, 1].map((set) => (
          <div key={set} className="flex items-center gap-12 mx-8">
            {BRANDS.map((brand, i) => (
              <span key={`${set}-${i}`} className="text-gray-300 dark:text-white/10 text-lg font-bold uppercase tracking-[.3em]">
                {brand}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
