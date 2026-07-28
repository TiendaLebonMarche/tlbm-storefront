"use client"

const BRANDS = [
  { name: "Xiaomi", slug: "xiaomi" },
  { name: "Redmi", slug: "redmi" },
  { name: "Samsung", slug: "samsung" },
  { name: "Sony", slug: "sony" },
  { name: "JBL", slug: "jbl" },
  { name: "Bose", slug: "bose" },
  { name: "Passau", slug: "passau" },
  { name: "Monster", slug: "monster" },
  { name: "DJI", slug: "dji" },
  { name: "Apple", slug: "apple" },
  { name: "Acer", slug: "acer" },
  { name: "Dell", slug: "dell" },
  { name: "Puma", slug: "puma" },
  { name: "Nike", slug: "nike" },
  { name: "Adidas", slug: "adidas" },
  { name: "Under Armour", slug: "underarmour" },
  { name: "Fila", slug: "fila" },
  { name: "Champion", slug: "champion" },
  { name: "Starlink", slug: "starlink" },
  { name: "Voyager", slug: "voyager" },
  { name: "Soho", slug: "soho" },
]

export default function BrandMarquee() {
  return (
    <section className="py-10 md:py-14 overflow-hidden bg-white dark:bg-[#0A0A0F] border-y border-gray-100 dark:border-white/5">
      <div className="flex whitespace-nowrap animate-brand-scroll brand-marquee-track">
        {[0, 1, 2].map((set) => (
          <div key={set} className="flex items-center gap-16 md:gap-24 mx-10 md:mx-14">
            {BRANDS.map((brand, i) => (
              <img
                key={`${set}-${i}`}
                src={`/brands/${brand.slug}.svg`}
                alt={brand.name}
                title={brand.name}
                style={{
                  width: "clamp(100px, 12vw, 150px)",
                  height: "clamp(36px, 4.5vw, 52px)",
                  objectFit: "contain",
                  opacity: 0.4,
                  flexShrink: 0,
                }}
                className="hover:opacity-70 transition-opacity duration-300"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
