import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Términos y Condiciones | Tienda Le Bon Marché",
  description:
    "Conoce los términos y condiciones de compra en Tienda Le Bon Marché. Derechos del consumidor, retracto, garantías y más. Cumplimiento Ley 1480 de 2011.",
}

const sections = [
  {
    id: "objeto",
    title: "1. Objeto y Partes del Contrato",
    content: `Estos Términos y Condiciones regulan la relación comercial entre <strong>TIENDA LE BON MARCHÉ</strong> (en adelante "el Vendedor") y el usuario que realiza una compra a través de la plataforma tiendalebonmarche.com (en adelante "el Comprador").<br/><br/>
    El Vendedor opera como comerciante electrónico registrado en el <strong>Conjunto Oasis de Mardel, Real de minas, Bucaramanga</strong>, con correo de contacto <strong>hola@tiendalebonmarche.com</strong>. Al completar una compra, el Comprador acepta expresamente estos términos en cumplimiento de la <strong>Ley 1480 de 2011 (Estatuto del Consumidor)</strong> y el <strong>Decreto 1499 de 2014</strong>.`,
  },
  {
    id: "proceso-compra",
    title: "2. Proceso de Compra y Formación del Contrato",
    content: `El contrato de compraventa se perfecciona en el momento en que el Comprador recibe la confirmación de pago por parte de la pasarela de pagos utilizada. El Vendedor se reserva el derecho de cancelar pedidos en caso de:<br/><br/>
    <ul class="list-disc pl-6 space-y-1">
      <li>Error de precio por falla técnica del sistema.</li>
      <li>Falta de disponibilidad de inventario al momento de procesar el pedido.</li>
      <li>Indicios de fraude o suplantación de identidad.</li>
    </ul><br/>
    En cualquiera de estos casos, el Comprador será informado de inmediato y se realizará la devolución total del pago sin costo alguno.`,
  },
  {
    id: "precios",
    title: "3. Precios e Impuestos",
    content: `Todos los precios publicados en la plataforma están expresados en <strong>Pesos Colombianos (COP)</strong> e incluyen el <strong>Impuesto al Valor Agregado (IVA)</strong> cuando aplique conforme a la legislación colombiana vigente. Los precios pueden variar sin previo aviso, pero el precio que aplica a su compra es el vigente en el momento de confirmar el pedido.`,
  },
  {
    id: "envio",
    title: "4. Envíos y Entregas",
    content: `<strong>4.1. Fast-Track Bucaramanga:</strong> Para compras realizadas antes de las 2:00 p.m. en días hábiles, el Vendedor garantiza entrega en las próximas <strong>24 horas hábiles</strong> exclusivamente para el <strong>Área Metropolitana de Bucaramanga</strong> (Bucaramanga, Floridablanca, Girón y Piedecuesta).<br/><br/>
    <strong>4.2. Envíos Nacionales:</strong> Para el resto del territorio colombiano, el tiempo de entrega depende de las transportadoras externas (Servientrega, Coordinadora, TCC u otras), generalmente entre 2 y 7 días hábiles según la ciudad de destino. El Vendedor no se hace responsable por demoras atribuibles a la transportadora, casos de fuerza mayor o situaciones de orden público.<br/><br/>
    <strong>4.3. Seguimiento:</strong> El Comprador recibirá el número de guía por correo electrónico o WhatsApp una vez despachado el pedido.`,
  },
  {
    id: "retracto",
    title: "5. Derecho de Retracto (Ley 1480 de 2011, Art. 47)",
    content: `En cumplimiento del <strong>Artículo 47 de la Ley 1480 de 2011</strong>, el Comprador tiene derecho a retractarse de la compra dentro de los <strong>cinco (5) días hábiles</strong> siguientes a la fecha de entrega del producto, sin necesidad de expresar causa alguna.<br/><br/>
    <strong>Condiciones para el ejercicio del retracto:</strong><br/>
    <ul class="list-disc pl-6 space-y-1">
      <li>El producto debe ser devuelto en su <strong>estado original</strong>, sin uso, con todos sus empaques, sellos y accesorios intactos.</li>
      <li>El Comprador asumirá los <strong>costos de envío de retorno</strong> al domicilio del Vendedor en Bucaramanga.</li>
      <li>Una vez recibido e inspeccionado el producto, el Vendedor realizará la devolución del dinero en un plazo máximo de <strong>10 días hábiles</strong>.</li>
    </ul><br/>
    <strong>Exclusiones:</strong> El derecho de retracto no aplica para productos personalizados, programas de computador descargados, grabaciones de audio o video desprecintadas, ni bienes de naturaleza perecedera.`,
  },
  {
    id: "garantias",
    title: "6. Garantías (Ley 1480 de 2011, Art. 7 y ss.)",
    content: `Todos los productos vendidos en Tienda Le Bon Marché cuentan con la <strong>garantía legal mínima exigida por la Ley 1480 de 2011</strong>:<br/><br/>
    <ul class="list-disc pl-6 space-y-1">
      <li><strong>Bienes de consumo duradero (electrónica, tecnología):</strong> 12 meses desde la entrega.</li>
      <li><strong>Bienes no durables (accesorios, decoración):</strong> 3 meses desde la entrega.</li>
    </ul><br/>
    La garantía cubre <strong>defectos de fabricación y fallas de funcionamiento en condiciones normales de uso</strong>. No cubre daños por mal uso, accidentes, modificaciones no autorizadas o desgaste natural. Para activar la garantía, el Comprador debe comunicarse con nosotros vía WhatsApp al <strong>+57 302 756 7783</strong> o al correo <strong>hola@tiendalebonmarche.com</strong>.`,
  },
  {
    id: "reversion",
    title: "7. Reversión del Pago (Ley 1480 de 2011, Art. 51)",
    content: `El Comprador tiene derecho a solicitar la <strong>reversión del cargo</strong> ante su entidad bancaria o la pasarela de pagos cuando:<br/><br/>
    <ul class="list-disc pl-6 space-y-1">
      <li>El producto adquirido no sea entregado.</li>
      <li>El producto entregado no corresponda a lo solicitado o sea defectuoso.</li>
      <li>La operación haya sido realizada de forma fraudulenta.</li>
    </ul><br/>
    Esta solicitud debe realizarse dentro de los <strong>cinco (5) días hábiles</strong> siguientes a la fecha en que el Comprador tuvo conocimiento de la situación.`,
  },
  {
    id: "propiedad-intelectual",
    title: "8. Propiedad Intelectual",
    content: `Todos los contenidos del sitio web, incluyendo textos, imágenes, logotipos, diseños y código fuente, son propiedad de <strong>TIENDA LE BON MARCHÉ</strong> o de sus respectivos titulares, y están protegidos por las leyes colombianas de derechos de autor (Ley 23 de 1982 y normas concordantes). Queda prohibida su reproducción, distribución o uso sin autorización expresa y escrita del Vendedor.`,
  },
  {
    id: "legislacion",
    title: "9. Legislación Aplicable y Resolución de Conflictos",
    content: `Estos Términos se rigen por la legislación vigente de la <strong>República de Colombia</strong>. Cualquier controversia relacionada con la interpretación o ejecución de este contrato se resolverá, en primera instancia, de manera amigable entre las partes. En caso de no llegarse a un acuerdo, las partes se someterán a los mecanismos de resolución de conflictos previstos en la Ley 1480 de 2011, incluyendo la opción de acudir ante la <strong>Superintendencia de Industria y Comercio (SIC)</strong>.`,
  },
  {
    id: "contacto",
    title: "10. Contacto del Vendedor",
    content: `Para cualquier reclamación, queja o consulta relacionada con los presentes Términos:<br/><br/>
    <ul class="list-none space-y-2">
      <li>📍 <strong>Dirección:</strong> Conjunto Oasis de Mardel, Real de minas, Bucaramanga</li>
      <li>📧 <strong>Correo:</strong> hola@tiendalebonmarche.com</li>
      <li>📱 <strong>WhatsApp:</strong> +57 302 756 7783</li>
      <li>🏛️ <strong>SIC:</strong> <a href="https://www.sic.gov.co" target="_blank" rel="noreferrer" class="underline hover:text-brand-olive transition-colors">www.sic.gov.co</a></li>
    </ul>`,
  },
]

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-white text-brand-brown">
      {/* Hero */}
      <section className="border-b border-gray-100 bg-[#F7F6F2] py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-olive mb-4">
            Marco Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif italic text-brand-brown mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-sm text-brand-gray leading-relaxed max-w-xl mx-auto">
            Tienda Le Bon Marché opera en cumplimiento de la{" "}
            <strong>Ley 1480 de 2011</strong> (Estatuto del Consumidor) y demás
            normas colombianas vigentes.
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
              href="/politica-de-privacidad"
              className="hover:text-brand-olive transition-colors underline"
            >
              Política de Privacidad
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
