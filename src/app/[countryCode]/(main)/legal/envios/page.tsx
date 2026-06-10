import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Envíos y Entregas | Tienda Le Bon Marché",
  description: "Políticas de envío y tiempos de despacho.",
}

const SIDEBAR_LINKS = [
  { label: "Términos y Condiciones", href: "/legal/terminos", active: false },
  { label: "Privacidad y Habeas Data", href: "/legal/privacidad", active: false },
  { label: "Garantías y Devoluciones", href: "/legal/devoluciones", active: false },
  { label: "Envíos y Entregas", href: "/legal/envios", active: true },
]

export default function EnviosPage() {
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
              Envíos y Entregas
            </h1>
            
            <div className="prose prose-lg prose-headings:font-serif prose-headings:text-[#000000] prose-headings:font-bold prose-headings:tracking-tight prose-p:text-brand-gray prose-p:font-light prose-li:text-brand-gray prose-li:font-light prose-p:leading-loose text-brand-gray max-w-none">
              
              <p className="text-xl md:text-2xl font-serif text-[#000000] leading-relaxed mb-16">
                Cuando invierte en tecnología exótica o artículos premium, la puntualidad no es opcional. Hemos estructurado nuestra red logística desde nuestro centro en Bucaramanga.
              </p>

              <h2 className="text-3xl mt-16 mb-6">El Modelo Fast-Track (Local)</h2>
              <p>
                Para el Área Metropolitana de Bucaramanga y periferia directa, aplicamos el protocolo <strong>Fast-Track</strong>. Todo pedido abonado antes de las 13:00 hrs de un día hábil es procesado y despachado con la estricta garantía de llegar a su residencia u oficina <strong>en menos de 24 horas</strong>. Nuestras rutas VIP operan blindando la caja con protocolos de privacidad.
              </p>

              <h2 className="text-3xl mt-16 mb-6">Territorio Nacional</h2>
              <p>
                Si se encuentra fuera del Área Metropolitana, derivamos el transporte de sus equipos y fragancias a redes especializadas como Servientrega, Coordinadora o Deprisa. 
              </p>
              <ul className="mb-10 mt-4 space-y-3">
                <li><strong>Tiempos:</strong> Esfuerzo de tránsito fijado entre <strong>2 a 5 días hábiles</strong>.</li>
                <li><strong>Aseguramiento:</strong> Jamás enviamos cajas a su suerte; toda terminal viaja con póliza de protección por 100% de su valor comercial.</li>
                <li><strong>Tracking:</strong> Emitimos código de rastreo en SMS/Mail la misma tarde del embalaje.</li>
              </ul>

              <h2 className="text-3xl mt-16 mb-6">Imponderables en Ruta</h2>
              <p>
                Una vez la encomienda asume la custodia del transportista, entra a regir el entramado nacional de vías de Colombia. Contingencias climáticas severas o alteraciones de orden público están exentas de reembolsos indemnizatorios rápidos, pues superan el brazo logístico de Tienda Le Bon Marché. Sin embargo, nuestro equipo de asesores abogará siempre a su favor hasta que la caja arribe exitosamente.
              </p>

            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
