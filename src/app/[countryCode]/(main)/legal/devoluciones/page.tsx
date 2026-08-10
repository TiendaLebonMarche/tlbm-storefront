import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Garantías y Devoluciones | Tienda Le Bon Marché",
  description: "Políticas de garantía, retracto y devoluciones.",
}

const SIDEBAR_LINKS = [
  { label: "Términos y Condiciones", href: "/legal/terminos", active: false },
  { label: "Privacidad y Habeas Data", href: "/legal/privacidad", active: false },
  { label: "Garantías y Devoluciones", href: "/legal/devoluciones", active: true },
  { label: "Envíos y Entregas", href: "/legal/envios", active: false },
]

export default function DevolucionesPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-32 pb-32 selection:bg-brand-black/20">
      <div className="max-w-340 mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          {/* Sidebar - Sticky */}
          <aside className="lg:w-1/4 shrink-0">
            <div className="sticky top-40">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-black mb-10 block">
                Marco Legal
              </span>
              <nav className="flex flex-col gap-y-6 text-sm font-sans">
                {SIDEBAR_LINKS.map((link) => (
                  <a 
                    key={link.href}
                    href={link.href} 
                    className={`transition-colors duration-300 ${link.active ? 'text-brand-black font-bold' : 'text-brand-gray hover:text-brand-black'}`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif font-black text-brand-black mb-16 tracking-tight leading-tight">
              Garantías y Devoluciones
            </h1>
            
            <div className="prose prose-lg prose-headings:font-serif prose-headings:text-brand-black prose-headings:font-bold prose-headings:tracking-tight prose-p:text-brand-gray prose-p:font-light prose-li:text-brand-gray prose-li:font-light prose-p:leading-loose text-brand-gray max-w-none [&_h2]:font-serif [&_h2]:font-bold [&_h2]:text-brand-black [&_h2]:tracking-tight [&_p]:text-brand-gray [&_p]:font-light [&_p]:leading-loose">
              
              <p className="text-xl md:text-2xl font-serif text-brand-black leading-relaxed mb-16">
                Nuestro estándar operativo es la excelencia intachable: piezas estéticamente perfectas, operando al máximo nivel, y total apego al Estatuto del Consumidor (Ley 1480).
              </p>

              <h2 className="text-3xl mt-16 mb-6">Derecho de Retracto</h2>
              <p>
                Conforme al artículo 47 de la Ley 1480 de 2011 y el Decreto 1074 de 2015, en las ventas a distancia (comercio electrónico) usted cuenta con <strong>cinco (5) días hábiles</strong> contados desde la entrega del bien para ejercer el derecho de retracto, sin necesidad de invocar causal alguna, siempre que el producto se devuelva en las mismas condiciones en que lo recibió.
              </p>
              <p>
                <strong>Procedimiento:</strong> Escríbanos a <strong>soporte@tiendalebonmarche.com</strong> o por WhatsApp indicando número de pedido y la intención de retracto. Le confirmaremos la instrucción de devolución en un plazo máximo de 5 días hábiles y le reintegraremos el valor pagado. 
              </p>
              <p>
                <strong>Condición Logística:</strong> Tratándose de importaciones de alta gama tecnológica, el usuario asume los costos logísticos imputables al flete de retorno. La pieza debe ingresar al almacén en idénticas condiciones, con sus empaques indemnes y sellos originales. El reintegro del dinero se realiza a través del mismo medio de pago utilizado en la compra, conforme al artículo 47 numeral 2 de la Ley 1480.
              </p>

              <h2 className="text-3xl mt-16 mb-6">Cobertura de Garantía Oficial</h2>
              <p>
                Conforme al <strong>artículo 11 de la Ley 1480 de 2011</strong>, todo producto nuevo cuenta con la garantía mínima legal de <strong>tres (3) meses</strong>, sin perjuicio de la garantía adicional que otorguen las marcas originarias (Drones, Wearables, Auriculares, Terminales Starlink, entre otros), término que prevalecerá garantizando su reparación gratuita o relevo total según el dictamen de fábrica.
              </p>
              <p>
                Durante la vigencia de la garantía, los costos de transporte, reparación y repuestos son por cuenta del vendedor (art. 11, numeral 3, Ley 1480). La garantía cubre los defectos de calidad, idoneidad y seguridad del producto; no cubre el deterioro por uso indebido.
              </p>
              <h3 className="text-2xl mt-10 mb-4 text-brand-black">Anulación de Garantía</h3>
              <ul className="mb-10 mt-4 space-y-3">
                <li>Manipulación negligente, fracturas de cristal o ingreso de humedad (si la unidad carece de especificación anfibia certificada).</li>
                <li>Incompatibilidad de red producto del puro desconocimiento operativo del usuario final.</li>
                <li>Perdida de empaques requeridos para verificación seriada.</li>
              </ul>

              <h2 className="text-3xl mt-16 mb-6">Reclamos ante la SIC</h2>
              <p>
                Si considera que sus derechos como consumidor fueron vulnerados, puede presentar su queja ante la <strong>Superintendencia de Industria y Comercio (SIC)</strong> a través de su página web (www.sic.gov.co) — Protección al Consumidor, sin perjuicio de acudir a la jurisdicción ordinaria. Igualmente puede escribirnos a <strong>soporte@tiendalebonmarche.com</strong> y le responderemos su PQR en el término legal.
              </p>

              <div className="mt-24 pt-8 border-t border-brand-gray-light">
                <p className="text-sm font-light italic">
                  Su agente VIP en WhatsApp está autorizado para gestionar estos impasses de manera ágil y sin fricciones burocráticas, en horario de atención comercial.
                </p>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
