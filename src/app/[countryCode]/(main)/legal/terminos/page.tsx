import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Términos y Condiciones | Tienda Le Bon Marché",
  description: "Términos y condiciones de uso y compra en nuestra plataforma.",
}

export default function TerminosPage() {
  return (
    <div className="bg-[#fafaf5] min-h-screen pb-20">
      {/* Hero */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-brand-brown">
        <Image
          src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000"
          alt="Términos y Condiciones legales"
          fill
          className="object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf5] to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-brand-gold mb-4">
            Marco Legal Corporativo
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Términos y Condiciones
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 -mt-16 md:-mt-24 relative z-10">
        <div className="bg-white p-8 md:p-16 shadow-2xl border border-gray-100 rounded-sm">
          <div className="prose prose-lg max-w-none text-brand-gray">
            <h2 className="text-2xl font-serif font-bold text-brand-brown mb-4">1. Aspectos Generales</h2>
            <p>
              Bienvenido a Tienda Le Bon Marché. El presente documento establece el contrato de adhesión bajo el cual usted, como usuario y consumidor, accede a los servicios, productos y plataforma tecnológica administrada por nuestra compañía (con domicilio en Bucaramanga, Colombia). Las presentes normas se rigen bajo la Ley 1480 de 2011 (Estatuto del Consumidor).
            </p>

            <h2 className="text-2xl font-serif font-bold text-brand-brown mt-12 mb-4">2. Uso del Sitio y Precios</h2>
            <p>
              Nos reservamos el derecho de modificar o actualizar la información del catálogo en cualquier momento. Utilizamos sistemas de <strong>Inteligencia Artificial (Bots de arbitraje)</strong> diseñados exclusiva y éticamente para asegurar que usted acceda a los precios más competitivos del mercado transfronterizo. Todos los precios están en pesos colombianos (COP) e incluyen IVA salvo que se indique lo contrario.
            </p>

            <h2 className="text-2xl font-serif font-bold text-brand-brown mt-12 mb-4">3. Proceso de Compra y Reversión del Pago</h2>
            <p>
              Toda compra está sujeta a verificación de stock y aprobación bancaria. De acuerdo con la normatividad colombiana, procede la <strong>Reversión del Pago</strong> cuando usted sea objeto de fraude, la transacción no haya sido autorizada, o el producto adquirido no sea recibido en los plazos estipulados o difiera drásticamente de lo ofertado. Dicha solicitud deberá notificarse a soporte@tiendalebonmarche.com en un plazo máximo de 5 días hábiles siguientes al evento.
            </p>

            <h2 className="text-2xl font-serif font-bold text-brand-brown mt-12 mb-4">4. Propiedad Intelectual y Restricciones</h2>
            <p>
              El contenido audiovisual, código, diseño y curaduría ("look and feel") son propiedad exclusiva de Tienda Le Bon Marché. Se prohíbe la reproducción total o parcial con fines comerciales sin autorización expresa.
            </p>

            <div className="mt-16 p-6 bg-brand-soft border-l-4 border-brand-olive">
              <p className="text-sm font-bold text-brand-brown m-0 uppercase tracking-widest">
                Última actualización: Agosto de 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
