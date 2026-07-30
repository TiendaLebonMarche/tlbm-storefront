"use client"

interface Brand {
  name: string
  slug?: string
  type: "icon" | "text"
}

const BRANDS: Brand[] = [
  // Icon brands (have SVG in /public/brands/)
  { name: "Xiaomi", slug: "xiaomi", type: "icon" },
  { name: "Samsung", slug: "samsung", type: "icon" },
  { name: "Sony", slug: "sony", type: "icon" },
  { name: "JBL", slug: "jbl", type: "icon" },
  { name: "Bose", slug: "bose", type: "icon" },
  { name: "DJI", slug: "dji", type: "icon" },
  { name: "Apple", slug: "apple", type: "icon" },
  { name: "Acer", slug: "acer", type: "icon" },
  { name: "Dell", slug: "dell", type: "icon" },
  { name: "Puma", slug: "puma", type: "icon" },
  { name: "Nike", slug: "nike", type: "icon" },
  { name: "Adidas", slug: "adidas", type: "icon" },
  { name: "Under Armour", slug: "underarmour", type: "icon" },
  { name: "Fila", slug: "fila", type: "icon" },
  { name: "Insta360", slug: "insta360", type: "icon" },
  // Text brands (no simpleicons icon available)
  { name: "Redmi", type: "text" },
  { name: "Passau", type: "text" },
  { name: "Monster", type: "text" },
  { name: "Champion", type: "text" },
  { name: "Starlink", type: "text" },
  { name: "Voyager", type: "text" },
  { name: "Soho", type: "text" },
  { name: "Unigear", type: "text" },
  { name: "Meidosa", type: "text" },
  { name: "KYSONA", type: "text" },
  { name: "Vortex", type: "text" },
  { name: "CITLLA", type: "text" },
]

const LOGO_STYLE = {
  width: "clamp(130px, 18vw, 240px)",
  height: "clamp(60px, 7vw, 88px)",
  flexShrink: 0,
} as const

export default function BrandMarquee() {
  return (
    <section className="overflow-hidden bg-white dark:bg-[#0A0A0F] border-0 py-8 md:py-10">
      <div className="brand-marquee-wrap">
        <div className="flex whitespace-nowrap animate-brand-scroll brand-marquee-track">
          {[0, 1].map((set) => (
            <div key={set} className="flex items-center gap-10 mx-0">
              {BRANDS.map((brand, i) => (
                <div
                  key={`${set}-${i}`}
                  title={brand.name}
                  className="flex items-center justify-center flex-shrink-0"
                  style={LOGO_STYLE}
                >
                  {brand.type === "icon" ? (
                    <img
                      src={`/brands/${brand.slug}.svg`}
                      alt={brand.name}
                      className="max-w-full max-h-full w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                    />
                  ) : (
                    <span className="font-sans font-bold uppercase tracking-[3px] text-[#5c5c5c] dark:text-gray-400 text-[clamp(14px,2vw,24px)] leading-none opacity-50 hover:opacity-100 transition-opacity duration-300 text-center px-2">
                      {brand.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
