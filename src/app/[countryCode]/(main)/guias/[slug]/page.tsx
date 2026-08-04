import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getGuideBySlug, getAllGuides } from "@lib/guides"
import GuideMarkdown from "@modules/guides/components/guide-markdown"
import RelatedMostSold from "@modules/guides/components/related-most-sold"
import Breadcrumbs from "@modules/common/components/breadcrumbs"
import WhatsAppButton from "@modules/layout/components/whatsapp-float/whatsapp-button"

const BASE_URL = "https://www.tiendalebonmarche.com"

type Props = {
  params: Promise<{ countryCode: string; slug: string }>
}

export async function generateStaticParams() {
  const guides = getAllGuides()
  return guides.map((g) => ({
    countryCode: "co",
    slug: g.slug,
  }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const guide = getGuideBySlug(params.slug)

  if (!guide) {
    return {}
  }

  const canonicalUrl = `${BASE_URL}/${params.countryCode}/guias/${guide.slug}`
  const keywords = guide.keywords.length > 0 ? guide.keywords.join(", ") : guide.description

  return {
    title: `${guide.title}`,
    description: guide.description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${guide.title} | Le Bon Marché`,
      description: guide.description,
      type: "article",
      locale: "es_CO",
      url: canonicalUrl,
      siteName: "Tienda Le Bon Marché",
      publishedTime: guide.date,
      authors: [guide.author],
      tags: guide.keywords.slice(0, 5),
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
    },
  }
}

export default async function GuidePage(props: Props) {
  const params = await props.params
  const guide = getGuideBySlug(params.slug)

  if (!guide) {
    notFound()
  }

  const canonicalUrl = `${BASE_URL}/${params.countryCode}/guias/${guide.slug}`
  const guidesUrl = `${BASE_URL}/${params.countryCode}/guias`

  // Article + BreadcrumbList schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonicalUrl}#article`,
    headline: guide.title,
    description: guide.description,
    datePublished: guide.date,
    dateModified: guide.date,
    author: {
      "@type": "Organization",
      name: guide.author,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Tienda Le Bon Marché",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    keywords: guide.keywords.join(", "),
    inLanguage: "es-CO",
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: `${BASE_URL}/${params.countryCode}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guías",
        item: guidesUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: canonicalUrl,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="content-container px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: `/${params.countryCode}` },
            { label: "Guías", href: `/${params.countryCode}/guias` },
            { label: guide.title },
          ]}
        />
      </div>

      <article className="content-container max-w-[820px] mx-auto px-4 pb-16">
        {/* Header */}
        <header className="pt-6 pb-8 border-b border-gray-100 dark:border-white/10">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.25em]">
              {guide.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#D4AF37]/50" />
            <span className="text-gray-400 text-[10px] font-medium uppercase tracking-[0.2em]">
              {guide.readingTime} de lectura
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight leading-[1.05] text-gray-900 dark:text-white">
            {guide.title}
          </h1>

          <p className="mt-5 text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed">
            {guide.description}
          </p>

          <div className="mt-6 flex items-center gap-3 text-sm text-gray-400">
            <span>{guide.author}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <time dateTime={guide.date}>
              {new Date(guide.date).toLocaleDateString("es-CO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </header>

        {/* Content */}
        <div className="py-10">
          <GuideMarkdown content={guide.content} />
        </div>

        {/* CTA — convertir lectores en clientes */}
        <div className="mt-6 rounded-2xl bg-[#0A0A0F] dark:bg-[#14141E] p-8 md:p-10 text-center border border-white/5">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight">
            ¿Te gustó esta guía?
          </h2>
          <p className="mt-3 text-white/60 text-sm md:text-base max-w-md mx-auto">
            Tenemos los productos originales de esta guía con garantía y envíos a toda Colombia.
            Te asesoramos gratis para que elijas el correcto.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
            <WhatsAppButton
              label="Escríbenos por WhatsApp"
              variant="pill"
              message="help"
              size="lg"
            />
            <a
              href={`/${params.countryCode}/store`}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase bg-[#D4AF37] text-[#0A0A0F] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              Ver Catálogo Completo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Keywords SEO visibles */}
        {guide.keywords.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {guide.keywords.map((k) => (
              <span
                key={k}
                className="text-[10px] text-gray-400 border border-gray-200 dark:border-white/10 px-3 py-1.5 rounded-full"
              >
                #{k}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Marquesina de más vendidos relacionada al tema */}
      <RelatedMostSold
        countryCode={params.countryCode}
        categories={guide.relatedCategories}
        title="Lo + vendidos del tema"
        subtitle={`Productos originales relacionados con ${guide.category.toLowerCase()}.`}
      />
    </>
  )
}
