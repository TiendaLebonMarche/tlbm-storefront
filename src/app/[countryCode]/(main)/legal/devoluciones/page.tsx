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
    <div className="bg-[#fafaf5] min-h-screen pt-32 pb-32 selection:bg-brand-olive/20">
      <div className="max-w-[85rem] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          {/* Sidebar - Sticky */}
          <aside className="lg:w-1/4 flex-shrink-0">
            <div className="sticky top-40">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-olive mb-10 block">
                Marco Legal
              </span>
              <nav className="flex flex-col gap-y-6 text-sm font-sans">
                {SIDEBAR_LINKS.map((link) => (
                  <a 
                    key={link.href}
                    href={link.href} 
                    className={`transition-colors duration-300 ${link.active ? 'text-[#322214] font-bold' : 'text-gray-500 hover:text-[#322214]'}`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif font-black text-[#322214] mb-16 tracking-tight leading-tight">
              Garantías y Devoluciones
            </h1>
            
            <div className="prose prose-lg prose-headings:font-serif prose-headings:text-[#322214] prose-headings:font-bold prose-headings:tracking-tight prose-p:text-gray-600 prose-p:font-light prose-li:text-gray-600 prose-li:font-light prose-p:leading-loose text-gray-600 max-w-none">
              
              <p className="text-xl md:text-2xl font-serif text-[#322214] leading-relaxed mb-16">
                Nuestro estándar operativo es la excelencia intachable: piezas estéticamente perfectas, operando al máximo nivel, y total apego al Estatuto del Consumidor (Ley 1480).
              </p>

              <h2 className="text-3xl mt-16 mb-6">Derecho de Retracto</h2>
              <p>
                Conforme a la normativa civil para ventas a distancia, si el bien recibido no le convence o se acoge a un cambio de opinión, usted cuenta con <strong>cinco (5) días hábiles</strong> transcurridos desde de su recepción para solicitar el retracto de la encomienda.
              </p>
              <p>
                <strong>Condición Logística:</strong> Tratándose de importaciones de alta gama tecnológica, el usuario asume los costos logísticos imputables al flete de retorno. La pieza debe ingresar al almacén en idénticas condiciones, con sus empaques indemnes y sellos originales.
              </p>

              <h2 className="text-3xl mt-16 mb-6">Cobertura de Garantía Oficial</h2>
              <p>
                Toda falla idónea de fábrica es amparada por Tienda Le Bon Marché y/o las marcas originarias. En dispositivos tecnológicos (Drones, Wearables, Auriculares, Terminales Starlink), prevalecerá el término dictaminado por la casa matriz garantizando su reparación gratuita o relevo total.
              </p>

              <h3 className="text-2xl mt-10 mb-4 text-[#322214]">Anulación de Garantía</h3>
              <ul className="mb-10 mt-4 space-y-3">
                <li>Manipulación negligente, fracturas de cristal o ingreso de humedad (si la unidad carece de especificación anfibia certificada).</li>
                <li>Incompatibilidad de red producto del puro desconocimiento operativo del usuario final.</li>
                <li>Perdida de empaques requeridos para verificación seriada.</li>
              </ul>

              <div className="mt-24 pt-8 border-t border-gray-200">
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
