import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Términos y Condiciones | Tienda Le Bon Marché",
  description: "Términos y condiciones de uso y compra en nuestra plataforma.",
}

const SIDEBAR_LINKS = [
  { label: "Términos y Condiciones", href: "/legal/terminos", active: true },
  { label: "Privacidad y Habeas Data", href: "/legal/privacidad", active: false },
  { label: "Garantías y Devoluciones", href: "/legal/devoluciones", active: false },
  { label: "Envíos y Entregas", href: "/legal/envios", active: false },
]

export default function TerminosPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-32 pb-32 selection:bg-brand-black/20">
      <div className="max-w-[85rem] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          {/* Sidebar - Sticky */}
          <aside className="lg:w-1/4 flex-shrink-0">
            <div className="sticky top-40">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-black mb-10 block">
                Marco Legal
              </span>
              <nav className="flex flex-col gap-y-6 text-sm font-sans">
                {SIDEBAR_LINKS.map((link) => (
                  <a 
                    key={link.href}
                    href={link.href} 
                    className={`transition-colors duration-300 ${link.active ? 'text-[#000000] font-bold' : 'text-brand-gray hover:text-[#000000]'}`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif font-black text-[#000000] mb-16 tracking-tight leading-tight">
              Términos y Condiciones
            </h1>
            
            <div className="prose prose-lg prose-headings:font-serif prose-headings:text-[#000000] prose-headings:font-bold prose-headings:tracking-tight prose-p:text-brand-gray prose-p:font-light prose-p:leading-loose text-brand-gray max-w-none [&_h2]:font-serif [&_h2]:font-bold [&_h2]:text-[#000000] [&_h2]:tracking-tight [&_p]:text-brand-gray [&_p]:font-light [&_p]:leading-loose">
              
              <p className="text-xl md:text-2xl font-serif text-[#000000] leading-relaxed mb-16">
                Bienvenido a Tienda Le Bon Marché. Este documento establece el contrato de adhesión bajo el cual usted accede a nuestros servicios y plataforma, rigiéndonos bajo la Ley 1480 de 2011 (Estatuto del Consumidor), la Ley 527 de 1999 (Comercio Electrónico) y demás normativa colombiana aplicable al comercio virtual.
              </p>

              <h2 className="text-3xl mt-16 mb-6">Identificación del Comerciante</h2>
              <p>
                <strong>Tienda Le Bon Marché</strong> — Comercio electrónico establecido en Bucaramanga, Santander, Colombia. Como proveedor estamos obligados a suministrar información clara, veraz, suficiente y oportuna sobre nuestros productos y servicios, conforme al artículo 23 de la Ley 1480 de 2011. Para cualquier comunicación, reclamo o ejercicio de derechos: <strong>soporte@tiendalebonmarche.com</strong> y WhatsApp de atención al cliente.
              </p>

              <h2 className="text-3xl mt-16 mb-6">Contratación Electrónica — Ley 527 de 1999</h2>
              <p>
                Conforme a la Ley 527 de 1999, los mensajes de datos (incluidos correos electrónicos, confirmaciones de pedido y registros en esta plataforma) tienen plena validez y fuerza probatoria en Colombia. La confirmación del pedido que usted recibe por correo o WhatsApp constituye prueba de la celebración del contrato de compraventa a distancia. La información registrada en nuestros sistemas se conserva con integridad y disponibilidad como respaldo de la operación.
              </p>

              <h2 className="text-3xl mt-16 mb-6">Uso del Sitio y Algoritmos</h2>
              <p>
                Nos reservamos el derecho de modificar o actualizar la información del catálogo en cualquier momento. Utilizamos <strong>Sistemas de Arbitraje (Bots)</strong> diseñados ética y exclusivamente para asegurar que usted acceda a los precios más competitivos del mercado transfronterizo. 
              </p>
              <p>
                Todos los precios listados se expresan en pesos colombianos (COP), contemplando los impuestos requeridos por la legislación aduanera y tributaria, salvo indicación expresa contraria en la ficha de producto. Los precios incluyen el IVA cuando aplica, conforme a la normativa de la DIAN.
              </p>

              <h2 className="text-3xl mt-16 mb-6">Facturación Electrónica</h2>
              <p>
                Todas nuestras ventas se soportan con <strong>factura electrónica de venta</strong> conforme a la Resolución DIAN vigente (Régimen de Facturación Electrónica). La factura se genera y envía a su correo electrónico una vez confirmado el pago, cumpliendo los requisitos de validación y transmisión ante la DIAN.
              </p>

              <h2 className="text-3xl mt-16 mb-6">Reversión de Pago y Seguridad</h2>
              <p>
                De acuerdo con la normatividad nacional, procede la figura de Reversión del Pago en circunstancias taxativas: si usted es objeto de fraude, la transacción no fue autorizada, o el producto adquirido difiere drásticamente de lo ofertado u omitió entregarse. Esta solicitud debe tramitarse dentro de los cinco (5) días hábiles siguientes al evento escribiendo a <strong>soporte@tiendalebonmarche.com</strong>.
              </p>

              <h2 className="text-3xl mt-16 mb-6">Propiedad Intelectual</h2>
              <p>
                El diseño de interfaces, selección tipográfica, código, paleta cromática y la selección curatorial (&quot;look and feel&quot;) de esta plataforma están protegidos por derechos de autor. Su reproducción, scraping comercial o copia parasitaria están estrictamente prohibidas y son sujetas de acción legal.
              </p>

              <h2 className="text-3xl mt-16 mb-6">Autoridad de Vigilancia y Ley Aplicable</h2>
              <p>
                Este contrato se rige por las leyes de la República de Colombia. La <strong>Superintendencia de Industria y Comercio (SIC)</strong> es la autoridad competente en materia de protección al consumidor, conforme a la Ley 1480 de 2011. Cualquier controversia se someterá a los jueces de la República de Colombia. También puede acudir a la SIC a través de sus canales de atención al ciudadano (www.sic.gov.co) para presentar sus quejas o reclamos.
              </p>

              <div className="mt-24 pt-8 border-t border-brand-gray-light">
                <p className="text-[11px] font-bold text-brand-gray uppercase tracking-widest">
                  Última revisión: Agosto 2026 — Cumplimiento Ley 1480 de 2011, Ley 527 de 1999, Decreto 1074 de 2015 y normativa DIAN
                </p>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
