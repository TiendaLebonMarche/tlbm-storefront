import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacidad y Habeas Data | Tienda Le Bon Marché",
  description: "Política de tratamiento de datos y privacidad.",
}

const SIDEBAR_LINKS = [
  { label: "Términos y Condiciones", href: "/legal/terminos", active: false },
  { label: "Privacidad y Habeas Data", href: "/legal/privacidad", active: true },
  { label: "Garantías y Devoluciones", href: "/legal/devoluciones", active: false },
  { label: "Envíos y Entregas", href: "/legal/envios", active: false },
]

export default function PrivacidadPage() {
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
              Privacidad y <br className="hidden md:block" /> Habeas Data
            </h1>
            
            <div className="prose prose-lg prose-headings:font-serif prose-headings:text-brand-black prose-headings:font-bold prose-headings:tracking-tight prose-p:text-brand-gray prose-p:font-light prose-li:text-brand-gray prose-li:font-light prose-p:leading-loose text-brand-gray max-w-none [&_h2]:font-serif [&_h2]:font-bold [&_h2]:text-brand-black [&_h2]:tracking-tight [&_p]:text-brand-gray [&_p]:font-light [&_p]:leading-loose">
              
              <p className="text-xl md:text-2xl font-serif text-brand-black leading-relaxed mb-16">
                En Tienda Le Bon Marché la privacidad no es letra pequeña, es parte de nuestro servicio premium. Nos tomamos en serio la custodia de su información bajo estrictos estándares.
              </p>

              <h2 className="text-3xl mt-16 mb-6">Finalidad y Uso de Datos</h2>
              <p>
                Bajo la Ley 1581 de 2012 y el Decreto 1377 de 2013, informamos que requerimos su información primaria y civil únicamente para:
              </p>
              <ul className="mb-10 mt-4 space-y-3">
                <li>Ejecutar nuestra logística de despachos y el modelo Fast-Track.</li>
                <li>Tramitar correctamente la facturación electrónica requerida por la DIAN.</li>
                <li>Brindar atención VIP por medio de nuestros asesores directos.</li>
              </ul>

              <h2 className="text-3xl mt-16 mb-6">Consentimiento y Aviso de Privacidad</h2>
              <p>
                Conforme al Decreto 1377 de 2013, el tratamiento de sus datos personales requiere su <strong>autorización previa, expresa e informada</strong>. Por eso, al momento de finalizar su compra usted debe aceptar de manera voluntaria (casilla de verificación <strong>no premarcada</strong>) nuestra Política de Tratamiento de Datos. El silencio no constituye consentimiento. Usted puede revocar su autorización en cualquier momento.
              </p>

              <h2 className="text-3xl mt-16 mb-6">Derechos del Titular</h2>
              <p>
                De acuerdo con el artículo 8 de la Ley 1581 de 2012, usted tiene derecho a:
              </p>
              <ul className="mb-10 mt-4 space-y-3">
                <li><strong>Conocer, actualizar y rectificar</strong> sus datos personales.</li>
                <li><strong>Solicitar prueba</strong> de la autorización otorgada.</li>
                <li><strong>Ser informado</strong> del uso que se les ha dado.</li>
                <li><strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la Ley 1581.</li>
                <li><strong>Revocar la autorización</strong> y solicitar la supresión de los datos cuando no se requieran para la finalidad.</li>
                <li><strong>Acceder</strong> en cualquier momento a sus datos.</li>
              </ul>

              <h2 className="text-3xl mt-16 mb-6">Inteligencia Artificial y Transparencia</h2>
              <p>
                Como pilar arquitectónico de Le Bon Marché, integramos algoritmos automatizados (&quot;bots&quot;) para el <strong>arbitraje de precios internacionales</strong>. Utilizamos metadatos de navegación anónima para afinar este motor predictivo, asegurando neutralizar la asimetría del mercado a su favor, garantizando importaciones a costos justos. Jamás comercializamos estos perfiles algorítmicos.
              </p>

              <h2 className="text-3xl mt-16 mb-6">Criptografía y Cookies</h2>
              <p>
                Toda experiencia transaccional fluye en conductos cifrados <code>HTTPS</code> e infraestructuras certificadas a nivel bancario. Respecto a los rastreadores web, empleamos un sistema minimalista de <strong>Cookies Técnicas</strong>; son obligatorias para conservar el estado de su cesta de compras (sistema MedusaJS) y auditar la seguridad de sus pagos.
              </p>

              <div className="mt-24 pt-8 border-t border-brand-gray-light">
                <p className="text-sm font-light italic">
                  Para ejercer rectificación o supresión inmediata de sus bases, envíe un oficio digital a <strong>soporte@tiendalebonmarche.com</strong>.
                </p>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
