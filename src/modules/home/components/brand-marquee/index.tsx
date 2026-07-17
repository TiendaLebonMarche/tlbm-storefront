"use client"

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
    <section className="py-10 md:py-14 overflow-hidden bg-white dark:bg-[#0A0A0F] border-y border-gray-100 dark:border-white/5">
      <div className="flex whitespace-nowrap animate-brand-scroll">
        {[0, 1, 2].map((set) => (
          <div key={set} className="flex items-center gap-16 md:gap-24 mx-10 md:mx-14">
            {BRANDS.map((brand, i) => (
              <img
                key={`${set}-${i}`}
                src={`https://cdn.simpleicons.org/${brand.slug}/${brand.color.replace("#", "")}`}
                alt={brand.name}
                title={brand.name}
                width={100}
                height={36}
                style={{
                  width: "clamp(80px, 10vw, 120px)",
                  height: "clamp(28px, 3.5vw, 40px)",
                  objectFit: "contain",
                  opacity: 0.5,
                  filter: brand.color === "#000000" ? "brightness(0.3)" : "none",
                }}
                loading="lazy"
                className="hover:opacity-80 transition-opacity duration-300"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
