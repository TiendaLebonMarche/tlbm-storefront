import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getBaseURL } from "@lib/util/env"

export const metadata: Metadata = {
  title: "Quiénes Somos | Tienda Le Bon Marché",
  description: "Conoce a Tienda Le Bon Marché. Desde Bucaramanga, somos cazadores de calidades, trayendo los productos más exclusivos, exóticos y originales con envíos a toda Colombia.",
  openGraph: {
    title: "Quiénes Somos | Tienda Le Bon Marché",
    description: "Cazadores de calidades: descubrimos tesoros escondidos y productos exclusivos para que tú solo des un clic.",
    url: `${getBaseURL()}/quienes-somos`,
  }
}

export default function AboutUsPage() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
            El Concepto
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-brand-black mb-6 italic leading-tight">
            No somos una tienda más,<br className="hidden md:block"/> somos sus ojos en el mercado global
          </h1>
          <p className="text-gray-500 font-light leading-relaxed max-w-2xl mx-auto text-sm md:text-base">
            Somos los <span className="font-medium text-brand-black">cazadores de calidades</span>. 
            No traemos cualquier cosa que se vea bonita, traemos lo que de verdad sirve, lo original y lo que está dominando el mundo del diseño y la tecnología.
          </p>
        </div>

        {/* Promise Section */}
        <section className="bg-gray-50/50 p-8 md:p-12 border border-gray-100 mb-20 text-center">
          <h2 className="text-2xl font-serif text-brand-black mb-4 italic">Nuestra Promesa</h2>
          <p className="text-lg text-gray-600 font-light italic leading-relaxed max-w-2xl mx-auto">
            "Nosotros nos quemamos las pestañas buscando las mejores ofertas y productos exóticos y únicos, para que usted solo tenga que dar un clic y disfrutar".
          </p>
        </section>

        {/* Story & Team */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-24">
          <div className="space-y-6">
            <h3 className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px]">¿Quiénes Somos?</h3>
            <h2 className="text-3xl font-serif text-brand-black">Bucaramanga para toda Colombia</h2>
            <p className="text-gray-500 font-light leading-relaxed text-sm">
              En Tienda Le Bon Marché, nacimos en Bucaramanga (la Ciudad Bonita) con una idea clara: 
              que lo último en tecnología, libros Assouline y los productos más exclusivos no sean un dolor de cabeza ni imposibles de conseguir en Colombia.
            </p>
            <p className="text-gray-500 font-light leading-relaxed text-sm">
              ¿Por qué somos 100% virtuales? Sencillo: para que a usted le salga más barato. Al no pagar un local físico ni servicios costosos en un centro comercial, podemos bajarle al precio final y subirle a la calidad del servicio. 
              Todo lo invertimos en que nuestra página sea un "volador" de rápida y segura (operamos sobre la tecnología más top de la industria), y en que su paquete llegue impecable a sus manos. Camellamos para todo el país y nuestra obsesión es que usted reciba algo que lo deje descrestado.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px]">¿Cómo Lo Hacemos?</h3>
            <h2 className="text-3xl font-serif text-brand-black">Mil cerebros buscando por usted</h2>
            <p className="text-gray-500 font-light leading-relaxed text-sm">
              No se imagine a una sola persona frente a un computador. Somos un equipo inquieto analizando internet las 24 horas del día.
            </p>
            <p className="text-gray-500 font-light leading-relaxed text-sm">
              Buscamos esos tesoros escondidos, las ofertas que realmente valen la pena y esos productos que usted ve en redes sociales y se pregunta: <strong>"¿Dónde conseguiré eso que sea 100% original?"</strong>. 
              Bueno, nosotros ya hicimos ese trabajo y lo encontramos por usted, para entregárselo a la puerta de su casa.
            </p>
          </div>
        </div>

        {/* Guarantees & Shipping */}
        <div className="space-y-16 py-12 border-t border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-brand-black italic">Lo que nuestros clientes necesitan saber</h2>
            <p className="text-sm text-gray-500 mt-4 uppercase tracking-widest">Su confianza es nuestro principal tesoro</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="text-brand-gold mb-4 text-3xl">📦</div>
              <h4 className="text-lg font-bold text-brand-black mb-3">Envíos Rápidos desde la Ciudad Bonita</h4>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Despachamos todos nuestros tesoros directamente desde nuestra bodega física en Bucaramanga. Nada de preventas fantasma ni esperas eternas de meses. 
                Si está en Bucaramanga o su Área Metropolitana, se lo entregamos en un abrir y cerrar de ojos (máximo 24 horas). 
                Para el resto de Colombia, gracias a nuestras transportadoras aliadas de primera categoría, en solo de <strong>2 a 5 días hábiles</strong> tendrá su paquete seguro en la puerta.
                Y tranquilo, aquí no lo dejamos en visto: le brindamos rastreo en tiempo real garantizado.
              </p>
            </div>
            
            <div>
              <div className="text-brand-gold mb-4 text-3xl">🛡️</div>
              <h4 className="text-lg font-bold text-brand-black mb-3">Garantía Cero "Gato por Liebre"</h4>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Nuestra premisa es sagrada: solo vendemos productos originales, comprobados y testeados. 
                Si es un libro de colección, es 100% legítimo; si es un accesorio para Starlink, tecnología o relojería, es de la máxima calidad sin piezas genéricas. Punto. 
                Además, si tiene alguna duda con su compra, no le va a contestar un robot automático. Somos personas reales listas para ayudarle de una por nuestro canal de WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 text-center bg-brand-black text-white p-12 lg:p-16">
          <h2 className="text-3xl font-serif italic mb-6">¿Listo para encontrar su próximo hallazgo?</h2>
          <p className="text-gray-300 font-light mb-8 max-w-lg mx-auto">
            Haga parte del exclusivo grupo de colombianos que confían en nosotros para llevar la excelencia, la tecnología y el diseño a sus vidas.
          </p>
          <LocalizedClientLink 
            href="/store"
            className="inline-block bg-brand-gold text-white font-bold text-xs uppercase tracking-[0.2em] px-10 py-4 hover:bg-white hover:text-brand-black transition-colors"
          >
            Explorar Catálogo Ahora
          </LocalizedClientLink>
        </div>

      </div>
    </div>
  )
}
