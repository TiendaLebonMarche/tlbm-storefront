import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Garantías y Devoluciones | Tienda Le Bon Marché",
  description: "Políticas de garantía, retracto y devoluciones.",
}

export default function DevolucionesPage() {
  return (
    <div className="bg-[#fafaf5] min-h-screen pb-20">
      {/* Hero */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-brand-olive">
        <Image
          src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2000"
          alt="Garantía de calidad"
          fill
          className="object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf5] to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-brand-gold mb-4">
            Satisfacción Garantizada
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Garantías y Devoluciones
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 -mt-16 md:-mt-24 relative z-10">
        <div className="bg-white p-8 md:p-16 shadow-2xl border border-gray-100 rounded-sm">
          <div className="prose prose-lg max-w-none text-brand-gray">
            
            <div className="flex items-center gap-4 bg-brand-soft/50 p-6 mb-12 border-l-4 border-brand-olive">
              <p className="m-0 font-medium text-brand-brown">Nuestro estándar es la excelencia: piezas intactas, tecnología operando al máximo nivel y total apego al Estatuto del Consumidor de Colombia.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-serif font-bold text-brand-brown mb-4">Derecho de Retracto</h2>
                <p className="text-sm leading-relaxed mb-4">
                  Conforme a la normativa para ventas a distancia y métodos no tradicionales, si el producto que compró no lo convence o cambia de opinión, usted cuenta con <strong>cinco (5) días hábiles</strong> contados a partir de su recepción para solicitar el retracto del negocio.
                </p>
                <p className="text-sm font-bold text-brand-brown">Condición obligatoria:</p>
                <p className="text-sm leading-relaxed mb-4">
                  Al tratarse de una boutique curada con altos costos de importación para piezas singulares, es el consumidor (comprador) quien deberá asumir los costos logísticos correspondientes a la devolución (transporte), garantizando que el producto retorne en caja original, sin uso, totalmente sellado y apto para comercialización.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold text-brand-brown mb-4">Cobertura de la Garantía</h2>
                <p className="text-sm leading-relaxed mb-4">
                  Cualquier falla idónea de fábrica es asumida directamente por nosotros o las marcas aliadas. En dispositivos tecnológicos (Drones, Starlink, Smartwatches, Audio), aplicará el tiempo que establezca la casa matriz, típicamente de 3 a 12 meses.
                </p>
                <p className="text-sm font-bold text-brand-brown mt-6">Anulación de garantía:</p>
                <ul className="text-sm mt-2 space-y-2 list-disc pl-5">
                  <li>Manipulación indebida, golpes, ingreso de humedad (si no es sumergible).</li>
                  <li>Incompatibilidad de red por desconocimiento del usuario.</li>
                  <li>No conservar empaques y sellos requeridos para verificación seriada técnica.</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center pt-8 border-t border-gray-100">
              <h3 className="font-bold text-brand-brown mb-2 uppercase tracking-widest text-xs">Gestión Directa y VIP</h3>
              <p className="text-sm mb-4">Inicie su solicitud de forma rápida, sin formularios odiosos, escribiendo a nuestro WhatsApp aportando imágenes de soporte o al correo designado.</p>
              <a href="mailto:soporte@tiendalebonmarche.com" className="inline-block px-6 py-3 bg-brand-brown text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-olive transition-all">Reportar Caso de Garantía</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
