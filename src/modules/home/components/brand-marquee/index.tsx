"use client"

import Image from "next/image"

interface Brand {
  name: string
  slug?: string
  type: "icon" | "text"
}

const BRANDS: Brand[] = [
  // Intercalado: icono, texto, icono, texto... para ritmo visual
  { name: "Xiaomi", slug: "xiaomi", type: "icon" },
  { name: "Redmi", type: "text" },
  { name: "Samsung", slug: "samsung", type: "icon" },
  { name: "Passau", type: "text" },
  { name: "Sony", slug: "sony", type: "icon" },
  { name: "Monster", type: "text" },
  { name: "JBL", slug: "jbl", type: "icon" },
  { name: "Champion", type: "text" },
  { name: "Bose", slug: "bose", type: "icon" },
  { name: "Starlink", type: "text" },
  { name: "DJI", slug: "dji", type: "icon" },
  { name: "Voyager", type: "text" },
  { name: "Apple", slug: "apple", type: "icon" },
  { name: "Soho", type: "text" },
  { name: "Acer", slug: "acer", type: "icon" },
  { name: "Unigear", type: "text" },
  { name: "Dell", slug: "dell", type: "icon" },
  { name: "Meidosa", type: "text" },
  { name: "Puma", slug: "puma", type: "icon" },
  { name: "KYSONA", type: "text" },
  { name: "Nike", slug: "nike", type: "icon" },
  { name: "Vortex", type: "text" },
  { name: "Adidas", slug: "adidas", type: "icon" },
  { name: "CITLLA", type: "text" },
  { name: "Under Armour", slug: "underarmour", type: "icon" },
  { name: "Insta360", slug: "insta360", type: "icon" },
  { name: "Fila", slug: "fila", type: "icon" },
]

const LOGO_STYLE = {
  width: "clamp(80px, 18vw, 230px)",
  height: "clamp(40px, 7vw, 80px)",
  flexShrink: 0,
} as const

export default function BrandMarquee() {
  return (
    <section className="overflow-hidden bg-white dark:bg-[#0A0A0F] border-0 py-6 md:py-10">
      <div className="brand-marquee-wrap">
        <div className="flex items-center w-[max-content] animate-brand-scroll brand-marquee-track">
          {[0, 1].map((set) => (
            <div key={set} className="flex items-center gap-4 md:gap-10 mx-0">
              {BRANDS.map((brand, i) => (
                <div
                  key={`${set}-${i}`}
                  title={brand.name}
                  className="flex items-center justify-center flex-shrink-0"
                  style={LOGO_STYLE}
                >
                  {brand.type === "icon" ? (
                    <Image
                      src={`/brands/${brand.slug}.svg`}
                      alt={brand.name}
                      width={230}
                      height={80}
                      className="max-w-full max-h-full w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                    />
                  ) : (
                    <span className="font-sans font-bold uppercase tracking-[2px] text-[#5c5c5c] dark:text-gray-400 text-[clamp(11px,2vw,22px)] leading-none opacity-50 hover:opacity-100 transition-opacity duration-300 text-center px-1">
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
