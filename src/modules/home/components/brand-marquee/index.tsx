"use client"

import Image from "next/image"

const BRANDS = [
  { name: "Xiaomi", slug: "xiaomi", color: "#FF6900" },
  { name: "Samsung", slug: "samsung", color: "#1428A0" },
  { name: "Sony", slug: "sony", color: "#000000" },
  { name: "JBL", slug: "jbl", color: "#FF6600" },
  { name: "Bose", slug: "bose", color: "#000000" },
  { name: "DJI", slug: "dji", color: "#000000" },
  { name: "Apple", slug: "apple", color: "#555555" },
]

export default function BrandMarquee() {
  return (
    <section className="py-10 md:py-12 overflow-hidden bg-white dark:bg-[#0A0A0F] border-y border-gray-100 dark:border-white/5">
      <div className="flex whitespace-nowrap animate-brand-scroll">
        {[0, 1, 2].map((set) => (
          <div key={set} className="flex items-center gap-14 md:gap-20 mx-8 md:mx-12">
            {BRANDS.map((brand, i) => (
              <div
                key={`${set}-${i}`}
                className="flex items-center justify-center opacity-40 hover:opacity-70 transition-opacity duration-300"
                style={{ width: "clamp(60px, 8vw, 100px)", height: "clamp(24px, 3vw, 36px)" }}
                title={brand.name}
              >
                <Image
                  src={`https://cdn.simpleicons.org/${brand.slug}/${brand.color.replace("#", "")}`}
                  alt={brand.name}
                  width={100}
                  height={36}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
