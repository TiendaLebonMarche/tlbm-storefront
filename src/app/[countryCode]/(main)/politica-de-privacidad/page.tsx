import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Política de Privacidad y Tratamiento de Datos | Tienda Le Bon Marché",
  description:
    "Política de tratamiento de datos personales de Tienda Le Bon Marché. Cumplimiento Ley 1581 de 2012 (Habeas Data) y uso responsable de IA y tecnología.",
}

const sections = [
  {
    id: "responsable",
    title: "1. Responsable del Tratamiento",
    content: `<strong>TIENDA LE BON MARCHÉ</strong> es la responsable del tratamiento de los datos personales recolectados a través de su plataforma de comercio electrónico ubicada en <strong>tiendalebonmarche.com</strong>.<br/><br/>
    <ul class="list-none space-y-2">
      <li>📍 <strong>Domicilio:</strong> Conjunto Oasis de Mardel, Real de minas, Bucaramanga</li>
      <li>📧 <strong>Correo de contacto:</strong> hola@tiendalebonmarche.com</li>
      <li>📱 <strong>WhatsApp:</strong> +57 302 756 7783</li>
    </ul>`,
  },
  {
    id: "base-legal",
    title: "2. Marco Legal",
    content: `El tratamiento de datos personales realizado por TIENDA LE BON MARCHÉ se rige por:<br/><br/>
    <ul class="list-disc pl-6 space-y-1">
      <li><strong>Ley Estatutaria 1581 de 2012</strong> (Habeas Data – Protección de Datos Personales).</li>
      <li><strong>Decreto 1377 de 2013</strong> y el <strong>Decreto 1074 de 2015</strong> (reglamentación de la Ley 1581).</li>
      <li><strong>Ley 1266 de 2008</strong> (manejo de información de bases de datos financieras y comerciales).</li>
    </ul>`,
  },
  {
    id: "datos-recolectados",
    title: "3. Datos que Recolectamos",
    content: `Recolectamos únicamente los datos necesarios para prestarle un servicio de calidad:<br/><br/>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Datos de identificación:</strong> Nombre completo, número de documento de identidad.</li>
      <li><strong>Datos de contacto:</strong> Correo electrónico, número de teléfono/WhatsApp, dirección de entrega.</li>
      <li><strong>Datos de transacción:</strong> Información del pedido, historial de compras, método de pago (sin almacenar datos de tarjetas, los cuales son gestionados directamente por la pasarela de pagos).</li>
      <li><strong>Datos de navegación:</strong> Cookies técnicas y analíticas de uso del sitio web (ver Sección 6).</li>
    </ul>`,
  },
  {
    id: "finalidades",
    title: "4. Finalidad del Tratamiento",
    content: `Sus datos personales son utilizados exclusivamente para las siguientes finalidades:<br/><br/>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Logística de entrega:</strong> Coordinar el envío y seguimiento de su pedido con las transportadoras.</li>
      <li><strong>Atención al cliente:</strong> Gestionar preguntas, quejas, garantías y devoluciones.</li>
      <li><strong>Notificaciones transaccionales:</strong> Enviar confirmaciones de compra, actualizaciones del estado del pedido y facturas por correo electrónico o WhatsApp.</li>
      <li><strong>Mejora de la experiencia:</strong> Analizar el uso de la plataforma para optimizar el catálogo y la experiencia de compra.</li>
      <li><strong>Herramientas de inteligencia artificial:</strong> Para ofrecer el mejor precio posible, utilizamos tecnología de búsqueda de precios automática. Sus datos de compra (categoría de producto, región) pueden alimentar estos sistemas de forma <em>anonimizada y agregada</em>, nunca a nivel individual identificable.</li>
    </ul>`,
  },
  {
    id: "ia-transparencia",
    title: "5. Transparencia sobre Tecnología e Inteligencia Artificial",
    content: `TIENDA LE BON MARCHÉ utiliza herramientas tecnológicas avanzadas, incluyendo sistemas automatizados de búsqueda de precios en mercados internacionales, para garantizar el mejor valor posible al comprador colombiano.<br/><br/>
    <strong>Principios que nos guían:</strong><br/><br/>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Transparencia:</strong> Le informamos que esta tecnología existe y que su propósito es eliminar la asimetría de precios, beneficiándole a usted.</li>
      <li><strong>Minimización de datos:</strong> Los algoritmos operan con datos de mercado, no con sus datos personales identificables.</li>
      <li><strong>No perfilamiento invasivo:</strong> No construimos perfiles individuales para publicidad comportamental sin su consentimiento explícito.</li>
    </ul>`,
  },
  {
    id: "cookies",
    title: "6. Política de Cookies",
    content: `Utilizamos los siguientes tipos de cookies:<br/><br/>
    <div class="overflow-x-auto">
    <table class="w-full text-sm border-collapse mt-2">
      <thead>
        <tr class="border-b border-gray-200">
          <th class="text-left py-2 pr-4 font-bold text-brand-brown">Tipo</th>
          <th class="text-left py-2 pr-4 font-bold text-brand-brown">Propósito</th>
          <th class="text-left py-2 font-bold text-brand-brown">¿Requiere consentimiento?</th>
        </tr>
      </thead>
      <tbody class="space-y-2">
        <tr class="border-b border-gray-100">
          <td class="py-3 pr-4 font-semibold">Técnicas / Esenciales</td>
          <td class="py-3 pr-4">Funcionamiento del carrito, sesión de usuario, seguridad.</td>
          <td class="py-3">No (necesarias)</td>
        </tr>
        <tr class="border-b border-gray-100">
          <td class="py-3 pr-4 font-semibold">Analíticas</td>
          <td class="py-3 pr-4">Google Analytics: conteo de visitas y comportamiento agregado.</td>
          <td class="py-3">Sí</td>
        </tr>
        <tr>
          <td class="py-3 pr-4 font-semibold">Funcionales</td>
          <td class="py-3 pr-4">Recordar preferencias de idioma y región.</td>
          <td class="py-3">Sí</td>
        </tr>
      </tbody>
    </table>
    </div><br/>
    Puede gestionar o revocar su consentimiento de cookies en cualquier momento desde la configuración de su navegador.`,
  },
  {
    id: "seguridad",
    title: "7. Medidas de Seguridad",
    content: `TIENDA LE BON MARCHÉ implementa las siguientes medidas técnicas para proteger su información:<br/><br/>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Protocolo HTTPS</strong> con certificado SSL/TLS activo en todo el sitio, garantizando que la información viaje cifrada.</li>
      <li><strong>Integración segura con pasarelas de pago</strong> certificadas PCI-DSS: los datos de tarjetas de crédito/débito nunca son almacenados en nuestros servidores.</li>
      <li><strong>Servidores en infraestructura cloud</strong> con acceso restringido y auditorías periódicas.</li>
      <li><strong>Acceso limitado</strong> a datos personales únicamente al personal autorizado con necesidad de conocerlos.</li>
    </ul>`,
  },
  {
    id: "derechos",
    title: "8. Derechos del Titular (Habeas Data)",
    content: `Como titular de sus datos personales, usted tiene derecho a:<br/><br/>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Conocer</strong> los datos personales que tenemos sobre usted.</li>
      <li><strong>Actualizar</strong> sus datos cuando estén desactualizados o sean inexactos.</li>
      <li><strong>Rectificar</strong> información incorrecta.</li>
      <li><strong>Revocar la autorización</strong> para el tratamiento en cualquier momento, salvo que exista una obligación legal que lo impida.</li>
      <li><strong>Suprimir</strong> sus datos cuando no exista deber legal de conservarlos.</li>
      <li><strong>Acceder gratuitamente</strong> a sus datos al menos una vez al mes.</li>
    </ul><br/>
    Para ejercer cualquiera de estos derechos, contáctenos en <a href="mailto:hola@tiendalebonmarche.com" class="underline">hola@tiendalebonmarche.com</a> o vía WhatsApp. Responderemos en un plazo máximo de <strong>10 días hábiles</strong>.`,
  },
  {
    id: "compartir",
    title: "9. Compartición y Transferencia de Datos",
    content: `Sus datos personales <strong>no son vendidos, alquilados ni cedidos a terceros</strong> con fines comerciales. Podemos compartir información en los siguientes casos limitados:<br/><br/>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Transportadoras:</strong> Nombre, dirección y teléfono, estrictamente necesarios para la entrega del pedido.</li>
      <li><strong>Pasarelas de pago:</strong> Información para procesar la transacción bajo sus propias políticas de seguridad.</li>
      <li><strong>Plataforma de e-commerce (Medusa):</strong> Gestión técnica del pedido bajo acuerdo de confidencialidad.</li>
      <li><strong>Autoridades:</strong> Cuando sea requerido por ley, orden judicial o autoridad competente.</li>
    </ul>`,
  },
  {
    id: "conservacion",
    title: "10. Tiempo de Conservación",
    content: `Conservamos sus datos personales por el tiempo necesario para cumplir con las finalidades descritas y las obligaciones legales aplicables:<br/><br/>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Datos de pedidos:</strong> 5 años (obligación tributaria y comercial).</li>
      <li><strong>Datos de garantías:</strong> Durante el periodo de garantía más 1 año adicional.</li>
      <li><strong>Datos de contacto para marketing:</strong> Hasta que usted revoque su consentimiento.</li>
    </ul>`,
  },
  {
    id: "sic",
    title: "11. Autoridad de Control",
    content: `La autoridad de control en materia de protección de datos personales en Colombia es la <strong>Superintendencia de Industria y Comercio (SIC)</strong>. Si considera que sus derechos no han sido atendidos adecuadamente, puede presentar su reclamación ante:<br/><br/>
    <ul class="list-none space-y-2">
      <li>🌐 <a href="https://www.sic.gov.co" target="_blank" rel="noreferrer" class="underline hover:text-brand-olive transition-colors">www.sic.gov.co</a></li>
      <li>📞 <strong>Línea gratuita SIC:</strong> 01 8000 910165</li>
    </ul>`,
  },
]

export default function PoliticaPrivacidadPage() {
  return (
    <main className="min-h-screen bg-white text-brand-brown">
      {/* Hero */}
      <section className="border-b border-gray-100 bg-[#F7F6F2] py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-olive mb-4">
            Marco Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif italic text-brand-brown mb-4">
            Política de Privacidad y Tratamiento de Datos
          </h1>
          <p className="text-sm text-brand-gray leading-relaxed max-w-xl mx-auto">
            Sus datos personales son tratados con estricto cumplimiento de la{" "}
            <strong>Ley 1581 de 2012</strong> (Habeas Data). La transparencia es
            un valor fundamental de nuestra tienda.
          </p>
          <p className="text-xs text-brand-gray opacity-60 mt-4">
            Última actualización: Abril 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Quick Nav */}
          <nav className="mb-14 p-6 bg-[#F7F6F2] rounded-2xl border border-gray-100">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-brown opacity-50 mb-4">
              Contenido
            </p>
            <ul className="space-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-sm text-brand-brown hover:text-brand-olive transition-colors font-medium"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className="scroll-mt-32 border-b border-gray-100 pb-12 last:border-none"
              >
                <h2 className="text-xl font-bold text-brand-brown mb-4">
                  {s.title}
                </h2>
                <div
                  className="text-sm text-brand-gray leading-7 [&_strong]:text-brand-brown [&_a]:text-brand-olive"
                  dangerouslySetInnerHTML={{ __html: s.content }}
                />
              </div>
            ))}
          </div>

          {/* Footer nav */}
          <div className="mt-16 pt-10 border-t border-gray-100 flex flex-wrap gap-4 text-xs text-brand-gray">
            <LocalizedClientLink
              href="/terminos-y-condiciones"
              className="hover:text-brand-olive transition-colors underline"
            >
              Términos y Condiciones
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/politica-de-devoluciones"
              className="hover:text-brand-olive transition-colors underline"
            >
              Política de Devoluciones
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/"
              className="hover:text-brand-olive transition-colors underline"
            >
              Volver a la Tienda
            </LocalizedClientLink>
          </div>
        </div>
      </section>
    </main>
  )
}
