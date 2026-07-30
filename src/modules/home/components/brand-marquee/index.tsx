"use client"

interface Brand {
  name: string
  slug?: string
  type: "icon" | "text"
}

const BRANDS: Brand[] = [
  { name: "Xiaomi", slug: "xiaomi", type: "icon" },
  { name: "Redmi", type: "text" },
  { name: "Samsung", slug: "samsung", type: "icon" },
  { name: "Sony", slug: "sony", type: "icon" },
  { name: "JBL", slug: "jbl", type: "icon" },
  { name: "Bose", slug: "bose", type: "icon" },
  { name: "Passau", type: "text" },
  { name: "Monster", type: "text" },
  { name: "DJI", slug: "dji", type: "icon" },
  { name: "Apple", slug: "apple", type: "icon" },
  { name: "Acer", slug: "acer", type: "icon" },
  { name: "Dell", slug: "dell", type: "icon" },
  { name: "Puma", slug: "puma", type: "icon" },
  { name: "Nike", slug: "nike", type: "icon" },
  { name: "Adidas", slug: "adidas", type: "icon" },
  { name: "Under Armour", slug: "underarmour", type: "icon" },
  { name: "Fila", slug: "fila", type: "icon" },
  { name: "Champion", type: "text" },
  { name: "Starlink", type: "text" },
  { name: "Voyager", type: "text" },
  { name: "Soho", type: "text" },
]

export default function BrandMarquee() {
  return (
    <section className="py-12 md:py-16 overflow-hidden bg-white dark:bg-[#0A0A0F] border-y border-gray-100 dark:border-white/5">
      <div className="brand-marquee-wrap">
        <div className="flex whitespace-nowrap animate-brand-scroll brand-marquee-track">
          {[0, 1].map((set) => (
            <div key={set} className="flex items-center gap-9 mx-0">
              {BRANDS.map((brand, i) =>
                brand.type === "icon" ? (
                  <img
                    key={`${set}-${i}`}
                    src={`/brands/${brand.slug}.svg`}
                    alt={brand.name}
                    title={brand.name}
                    style={{
                      width: "clamp(90px, 14vw, 180px)",
                      height: "clamp(44px, 5.5vw, 68px)",
                      objectFit: "contain",
                      opacity: 0.6,
                      flexShrink: 0,
                    }}
                    className="hover:opacity-100 transition-opacity duration-300"
                  />
                ) : (
                  <span
                    key={`${set}-${i}`}
                    title={brand.name}
                    style={{
                      width: "clamp(90px, 14vw, 180px)",
                      height: "clamp(44px, 5.5vw, 68px)",
                      opacity: 0.5,
                      flexShrink: 0,
                    }}
                    className="flex items-center justify-center font-sans font-bold uppercase tracking-[2px] text-[#5c5c5c] dark:text-gray-400 text-[clamp(14px,1.8vw,22px)] hover:opacity-100 transition-opacity duration-300"
                  >
                    {brand.name}
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
