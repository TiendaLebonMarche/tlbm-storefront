import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import Reveal from "@modules/common/components/reveal"

const BASE_URL = "https://www.tiendalebonmarche.com"

export const metadata: Metadata = {
  title: "Quiénes Somos — Boutique virtual en Bucaramanga",
  description: "Conoce a Tienda Le Bon Marché. Desde Bucaramanga, somos cazadores de calidades, trayendo los productos más exclusivos, exóticos y originales con envíos a toda Colombia.",
  alternates: {
    canonical: `${BASE_URL}/co/quienes-somos`,
  },
  openGraph: {
    title: "Quiénes Somos | Tienda Le Bon Marché",
    description: "Cazadores de calidades: descubrimos tesoros escondidos y productos exclusivos para que tú solo des un clic. Boutique virtual en Bucaramanga.",
    url: `${BASE_URL}/co/quienes-somos`,
    siteName: "Tienda Le Bon Marché",
    type: "website",
    locale: "es_CO",
  },
}

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${BASE_URL}/co/quienes-somos`,
  "name": "Quiénes Somos — Tienda Le Bon Marché",
  "url": `${BASE_URL}/co/quienes-somos`,
  "description": "Tienda Le Bon Marché es una boutique virtual en Bucaramanga, Colombia, especializada en productos originales, tecnología premium, decoración exótica y libros de colección.",
  "inLanguage": "es-CO",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Tienda Le Bon Marché",
    "url": BASE_URL
  },
  "about": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    "name": "Tienda Le Bon Marché",
    "foundingDate": "2021",
    "foundingLocation": {
      "@type": "Place",
      "name": "Bucaramanga, Santander, Colombia"
    },
    "description": "Boutique virtual especializada en productos originales, tecnología de alta gama y decoración exótica con envíos a toda Colombia.",
    "slogan": "Originales & Exóticos",
    "areaServed": "Colombia",
    "telephone": "+573027567783",
    "email": "info@tiendalebonmarche.com",
    "sameAs": [
      "https://www.instagram.com/tiendalebonmarche",
      "https://www.facebook.com/tiendalebonmarche"
    ]
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": `${BASE_URL}/co`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Quiénes Somos",
        "item": `${BASE_URL}/co/quienes-somos`
      }
    ]
  }
}

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <div className="bg-white min-h-screen pt-24 pb-32">
        <div className="max-w-[70rem] mx-auto px-4 md:px-8">

          {/* Header Crónica */}
          <Reveal className="text-center mb-24 md:mb-32 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-serif text-black mb-8 italic leading-tight">
              No somos una tienda más, somos sus ojos en el mercado global
            </h1>
            <p className="text-black font-light leading-relaxed text-sm md:text-base font-sans">
              Somos los cazadores de calidades. No traemos cualquier cosa que se vea bonita, traemos lo que de verdad sirve, lo original y lo que está dominando el mundo del diseño y la tecnología global. Todo desde nuestra base en Bucaramanga.
            </p>
          </Reveal>

          {/* Story Block 1 - Image Left, Text Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-32">
            <Reveal className="w-full aspect-[3/4] relative bg-brand-gray-light/20 overflow-hidden">
               <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
                  alt="Equipo de selección de productos — Tienda Le Bon Marché Bucaramanga"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="absolute inset-0 w-full h-full object-cover"
               />
            </Reveal>
            <Reveal delay={150} className="space-y-6 text-center md:text-left">
              <h2 className="text-3xl font-serif italic text-black">Bucaramanga para el mundo</h2>
              <div className="w-8 h-[1px] bg-black mx-auto md:mx-0 mb-6" />
              <p className="text-black font-light leading-relaxed text-sm font-sans">
                En Tienda Le Bon Marché nacimos con una idea clara: que lo último en tecnología, libros editoriales y los productos más exclusivos no sean imposibles de conseguir en Colombia.
              </p>
              <p className="text-black font-light leading-relaxed text-sm font-sans">
                ¿Por qué somos 100% virtuales? Sencillo: para que a usted le salga más barato. Al no pagar un local físico ni servicios costosos, podemos bajarle al precio y subirle a la calidad. Todo lo invertimos en que nuestra página sea rápida y en que su pedido llegue impecable.
              </p>
            </Reveal>
          </div>

          {/* Highlight Phrase - Centered */}
          <Reveal className="py-24 border-y border-black/10 my-32 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-light text-black italic leading-[1.2]">
              &quot;Mil cerebros buscando lo extraordinario para usted.&quot;
            </h2>
          </Reveal>

          {/* Story Block 2 - Text Left, Image Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-32 flex-col-reverse md:flex-row">
            <Reveal delay={150} className="space-y-6 text-center md:text-left md:order-1 order-2">
              <h2 className="text-3xl font-serif italic text-black">Cero Gato por Liebre</h2>
              <div className="w-8 h-[1px] bg-black mx-auto md:mx-0 mb-6" />
              <p className="text-black font-light leading-relaxed text-sm font-sans">
                No se imagine a una sola persona frente a un computador. Somos un equipo analizando internet las 24 horas. Buscamos esos tesoros escondidos, las ofertas que valen la pena y esos productos que usted ve en redes sociales y se pregunta dónde conseguirlos. Nosotros ya lo hicimos por usted.
              </p>
              <p className="text-black font-light leading-relaxed text-sm font-sans">
                Solo vendemos productos originales. Si es un artículo de lujo, es original; si es un accesorio tecnológico complejo, es de la mejor calidad. Si tiene dudas, no le va a contestar un robot, somos gente real en WhatsApp lista para asesorarlo.
              </p>
            </Reveal>
            <Reveal className="w-full aspect-[3/4] relative bg-brand-gray-light/20 overflow-hidden md:order-2 order-1">
               <Image
                  src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop"
                  alt="Selección de productos originales — Boutique Le Bon Marché Colombia"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="absolute inset-0 w-full h-full object-cover"
               />
            </Reveal>
          </div>

          {/* CTA — Trust signal visible for AI and crawlers */}
          <Reveal className="text-center pt-8 pb-16 border-t border-brand-gray-light">
            <p className="text-sm text-brand-gray mb-4 font-sans">
              ¿Listo para descubrir algo extraordinario?
            </p>
            <LocalizedClientLink
              href="/store"
              className="inline-block bg-black text-white text-xs font-bold tracking-[0.3em] uppercase px-8 py-4 hover:bg-gray-800 transition-colors"
            >
              Ver Catálogo Completo
            </LocalizedClientLink>
          </Reveal>

        </div>
      </div>
    </>
  )
}
