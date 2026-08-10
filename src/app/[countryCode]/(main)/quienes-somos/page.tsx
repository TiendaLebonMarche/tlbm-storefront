import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import Reveal from "@modules/common/components/reveal"
import PageHeader from "@modules/common/components/page-header"

const BASE_URL = "https://www.tiendalebonmarche.com"

export const metadata: Metadata = {
  title: "Quiénes Somos — Tienda Le Bon Marché | Bucaramanga",
  description:
    "Conoce la historia de Tienda Le Bon Marché: nuestra misión, visión y valores. Una tienda virtual en Bucaramanga que trae productos originales y difíciles de encontrar a toda Colombia.",
  alternates: {
    canonical: `${BASE_URL}/co/quienes-somos`,
  },
  openGraph: {
    title: "Quiénes Somos | Tienda Le Bon Marché",
    description:
      "Nuestra historia, misión y visión: cazadores de calidades desde Bucaramanga para toda Colombia.",
    url: `${BASE_URL}/co/quienes-somos`,
    siteName: "Tienda Le Bon Marché",
    type: "website",
    locale: "es_CO",
    images: [
      {
        url: "/opengraph-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Quiénes Somos | Tienda Le Bon Marché",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quiénes Somos | Tienda Le Bon Marché",
    description: "Nuestra historia, misión y visión desde Bucaramanga para toda Colombia.",
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

const values = [
  {
    title: "Originalidad",
    text: "Solo vendemos productos originales. Si es un artículo de lujo, es original; si es un accesorio tecnológico, es de la mejor calidad. Cero gato por liebre.",
  },
  {
    title: "Honestidad",
    text: "Si un producto no te conviene, te lo decimos. Preferimos una venta clara a una devolución llena de dudas.",
  },
  {
    title: "Cercanía",
    text: "No le contesta un robot: somos gente real en WhatsApp, lista para asesorarte antes y después de la compra.",
  },
  {
    title: "Eficiencia",
    text: "Al ser 100% virtuales pagamos menos costos fijos. Eso se traduce en mejores precios, una página rápida y pedidos que llegan impecables.",
  },
]

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <div className="bg-white min-h-screen">
        {/* Header — diseño por defecto de subpáginas (PageHeader, patrón /co/store) */}
        <PageHeader
          eyebrow="La historia"
          title={
            <>
              Quiénes <em className="italic font-light">somos</em>
            </>
          }
          description="Boutique virtual en Bucaramanga. Cazadores de calidades desde 2021, con envíos a toda Colombia."
        />

        <div className="max-w-[70rem] mx-auto px-4 md:px-8 pb-32">

          {/* Intro / Lore */}
          <Reveal className="text-center mb-24 md:mb-32 max-w-3xl mx-auto pt-16">
            <h2 className="text-4xl md:text-6xl font-serif text-black mb-8 italic leading-tight">
              No somos una tienda más, somos sus ojos en el mercado global
            </h2>
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
              <h3 className="text-3xl font-serif italic text-black">Bucaramanga para el mundo</h3>
              <div className="w-8 h-[1px] bg-black mx-auto md:mx-0 mb-6" />
              <p className="text-black font-light leading-relaxed text-sm font-sans">
                Tienda Le Bon Marché nació en 2021 con una idea clara: que lo último en tecnología, libros editoriales y los productos más exclusivos no sean imposibles de conseguir en Colombia.
              </p>
              <p className="text-black font-light leading-relaxed text-sm font-sans">
                ¿Por qué somos 100% virtuales? Sencillo: para que a usted le salga más barato. Al no pagar un local físico ni servicios costosos, podemos bajarle al precio y subirle a la calidad. Todo lo invertimos en que nuestra página sea rápida y en que su pedido llegue impecable.
              </p>
            </Reveal>
          </div>

          {/* Misión y Visión */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-32">
            <Reveal className="border-t border-black/10 pt-10">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#D4AF37] block mb-6">
                Nuestra misión
              </span>
              <p className="text-2xl md:text-[28px] font-serif text-black leading-snug">
                Acercar a los colombianos los productos originales y difíciles de encontrar, con precios justos, asesoría real y la garantía de que lo que llega es lo que se prometió.
              </p>
            </Reveal>
            <Reveal delay={150} className="border-t border-black/10 pt-10">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#D4AF37] block mb-6">
                Nuestra visión
              </span>
              <p className="text-2xl md:text-[28px] font-serif text-black leading-snug">
                Ser la tienda virtual de referencia en Colombia para quien busca lo original y lo exclusivo: la primera parada cuando alguien quiere algo distinto, bien hecho y sin letra pequeña.
              </p>
            </Reveal>
          </div>

          {/* Valores */}
          <Reveal className="mb-20">
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-black block mb-10 text-center">
              Lo que no negociamos
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {values.map((v) => (
                <div key={v.title} className="border border-gray-100 p-7 hover:border-[#D4AF37]/40 transition-colors duration-300">
                  <h4 className="font-serif text-lg text-black mb-3">{v.title}</h4>
                  <p className="text-sm text-black/60 font-light leading-relaxed">{v.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Story Block 2 - Text Left, Image Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-32 flex-col-reverse md:flex-row">
            <Reveal delay={150} className="space-y-6 text-center md:text-left md:order-1 order-2">
              <h3 className="text-3xl font-serif italic text-black">Cero Gato por Liebre</h3>
              <div className="w-8 h-[1px] bg-black mx-auto md:mx-0 mb-6" />
              <p className="text-black font-light leading-relaxed text-sm font-sans">
                No se imagine a una sola persona frente a un computador. Somos un equipo analizando internet las 24 horas. Buscamos esos tesoros escondidos, las ofertas que valen la pena y esos productos que usted ve en redes sociales y se pregunta dónde conseguirlos. Nosotros ya lo hicimos por usted.
              </p>
              <p className="text-black font-light leading-relaxed text-sm font-sans">
                Si tiene dudas, no le va a contestar un robot: somos gente real en WhatsApp lista para asesorarlo antes y después de la compra.
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

          {/* CTA */}
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
