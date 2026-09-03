import { Metadata } from "next"
import { getAllGuides } from "@lib/guides"
import Breadcrumbs from "@modules/common/components/breadcrumbs"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PageHeader from "@modules/common/components/page-header"

const BASE_URL = "https://www.tiendalebonmarche.com"

export const metadata: Metadata = {
  title: "Guías de Compra",
  description:
    "Guías de compra y comparativas con precios reales: elige el mejor parlante Bluetooth, arma tu kit de estudio, encuentra productos originales en Colombia. Consejos de experto de Tienda Le Bon Marché.",
  alternates: {
    canonical: `${BASE_URL}/co/guias`,
  },
  openGraph: {
    title: "Guías de Compra | Le Bon Marché",
    description:
      "Comparativas con precios reales, kits recomendados y guías para comprar original en Colombia.",
    url: `${BASE_URL}/co/guias`,
    type: "website",
    locale: "es_CO",
    siteName: "Tienda Le Bon Marché",
    images: [
      {
        url: "/opengraph-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Guías de Compra | Le Bon Marché",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guías de Compra | Le Bon Marché",
    description: "Comparativas con precios reales para comprar original en Colombia.",
  },
}

export default async function GuidesPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const guides = getAllGuides()

  // ItemList schema para el listado
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Guías de Compra — Tienda Le Bon Marché",
    itemListElement: guides.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: g.title,
      url: `${BASE_URL}/${countryCode}/guias/${g.slug}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="content-container px-4 py-4">
        <Breadcrumbs
          items={[{ label: "Inicio", href: `/${countryCode}` }, { label: "Guías" }]}
        />
      </div>

      <div className="content-container max-w-[1000px] mx-auto px-4 pb-20">
        {/* Header — diseño por defecto de subpáginas (PageHeader, patrón /co/store) */}
        <PageHeader
          eyebrow="Blog & Guías"
          title={
            <>
              Guías de <em className="italic font-light">compra inteligente</em>
            </>
          }
          description="Comparativas con precios reales, kits recomendados y consejos para comprar productos originales en Colombia. Sin letra pequeña."
        />

        {/* Grid de guías */}
        {guides.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            Pronto tendremos guías disponibles.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {guides.map((guide) => (
              <LocalizedClientLink
                key={guide.slug}
                href={`/guias/${guide.slug}`}
                className="group block bg-white dark:bg-card border border-gray-100 dark:border-white/5 rounded-2xl p-7 md:p-8 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-gold text-[10px] font-bold uppercase tracking-[0.25em]">
                    {guide.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gold/40" />
                  <span className="text-gray-400 text-[10px] uppercase tracking-[0.2em]">
                    {guide.readingTime}
                  </span>
                </div>

                <h2 className="font-serif text-xl md:text-2xl font-bold tracking-tight leading-snug text-gray-900 dark:text-white group-hover:text-gold transition-colors duration-300">
                  {guide.title}
                </h2>

                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
                  {guide.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 group-hover:text-gold transition-colors">
                  Leer guía
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </LocalizedClientLink>
            ))}
          </div>
        )}

        {/* CTA inferior */}
        <div className="mt-16 rounded-2xl bg-ink dark:bg-card p-8 md:p-10 text-center border border-white/5">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight">
            ¿Tienes dudas sobre un producto?
          </h2>
          <p className="mt-3 text-white/60 text-sm md:text-base max-w-md mx-auto">
            Escríbenos y te asesoramos gratis. Todos nuestros productos son originales con
            garantía.
          </p>
          <div className="mt-6">
            <a
              href={`https://wa.me/573027567783?text=${encodeURIComponent(
                "Hola! Vi las guías de compra y tengo una duda sobre un producto 👋"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase bg-[#25D366] text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
