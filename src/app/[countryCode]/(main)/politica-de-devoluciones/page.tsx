import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Política de Devoluciones y Garantías | Tienda Le Bon Marché",
  description:
    "Política de devoluciones, retracto y garantías de Tienda Le Bon Marché. Cumplimiento Ley 1480 de 2011. Proceso claro y sin complicaciones.",
}

const steps = [
  {
    number: "01",
    title: "Contáctanos",
    description:
      "Escríbenos por WhatsApp al +57 302 756 7783 o a hola@tiendalebonmarche.com indicando tu número de pedido y el motivo de la devolución.",
  },
  {
    number: "02",
    title: "Autorización",
    description:
      "Revisaremos tu solicitud y te enviaremos la autorización de devolución en máximo 2 días hábiles, junto con las instrucciones de empaque.",
  },
  {
    number: "03",
    title: "Envío del producto",
    description:
      "Empaca el producto en su estado original con todos los accesorios y envíalo a nuestra dirección en Bucaramanga (Conjunto Oasis de Mardel). Los costos de retorno son pagados por el comprador (salvo productos defectuosos).",
  },
  {
    number: "04",
    title: "Inspección y reembolso",
    description:
      "Una vez recibido e inspeccionado el producto, procesaremos el reembolso o el cambio en máximo 10 días hábiles por el mismo medio de pago original.",
  },
]

const sections = [
  {
    id: "retracto",
    title: "1. Derecho de Retracto — 5 días hábiles",
    content: `En cumplimiento del <strong>Artículo 47 de la Ley 1480 de 2011</strong>, usted puede devolver cualquier producto dentro de los <strong>cinco (5) días hábiles</strong> siguientes a la entrega, sin necesidad de explicar el motivo.<br/><br/>
    <strong>Condiciones obligatorias:</strong><br/>
    <ul class="list-disc pl-6 space-y-1 mt-2">
      <li>Producto sin uso, en su empaque original, con todos los accesorios, manuales y stickers de garantía intactos.</li>
      <li>El Comprador asume el costo del envío de retorno a Bucaramanga.</li>
      <li>Se realizará la devolución del 100% del valor del producto (sin incluir el envío original, si fue cobrado).</li>
    </ul><br/>
    <strong>¿Cómo iniciar el retracto?</strong><br/>
    Contáctenos por WhatsApp o correo electrónico dentro del plazo de los 5 días hábiles desde la entrega.`,
  },
  {
    id: "garantia",
    title: "2. Garantía por Defectos de Fabricación",
    content: `Si el producto presenta fallas de fabricación o no funciona correctamente en condiciones normales de uso, la garantía cubre:<br/><br/>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Tecnología y electrónica:</strong> 12 meses desde la entrega.</li>
      <li><strong>Accesorios y artículos de decoración:</strong> 3 meses desde la entrega.</li>
      <li><strong>Libros de colección:</strong> Despacho garantizado en las condiciones descritas en el producto.</li>
    </ul><br/>
    En casos de garantía por defecto de fabricación, <strong>Tienda Le Bon Marché asume los costos de envío de retorno</strong>. La resolución puede ser reparación, reposición o devolución del dinero a elección del comprador.`,
  },
  {
    id: "no-aplica",
    title: "3. Casos en que NO Aplica la Garantía o Retracto",
    content: `De conformidad con el artículo 47 de la Ley 1480 de 2011, las siguientes situaciones están excluidas:<br/><br/>
    <ul class="list-disc pl-6 space-y-2">
      <li>Productos con daños causados por <strong>mal uso, caídas, líquidos o modificaciones no autorizadas</strong>.</li>
      <li>Productos con <strong>sellos de garantía rotos</strong> no por causas del Vendedor.</li>
      <li>Artículos <strong>personalizados o fabricados a medida</strong>.</li>
      <li>Productos de <strong>naturaleza perecedera</strong> o con fecha de vencimiento.</li>
      <li>Software descargado o activado.</li>
      <li>Desgaste natural del producto por uso normal.</li>
    </ul>`,
  },
  {
    id: "reversion",
    title: "4. Reversión del Pago Electrónico (Art. 51, Ley 1480/2011)",
    content: `Si realizó su compra con <strong>tarjeta de crédito, débito o medio de pago electrónico</strong>, tiene derecho a solicitar la <strong>reversión del cargo</strong> directamente ante su banco o la pasarela de pagos en los siguientes casos:<br/><br/>
    <ul class="list-disc pl-6 space-y-2">
      <li>El producto pagado <strong>no fue entregado</strong>.</li>
      <li>El producto entregado fue <strong>adulterado, defectuoso o no corresponde</strong> a lo comprado.</li>
      <li>La transacción fue realizada bajo <strong>fraude o suplantación de identidad</strong>.</li>
    </ul><br/>
    Debe realizar esta solicitud dentro de los <strong>cinco (5) días hábiles</strong> siguientes a tener conocimiento del problema. Le Bon Marché cooperará plenamente con los procesos de reversión legítimos.`,
  },
  {
    id: "reembolso",
    title: "5. Tiempos y Métodos de Reembolso",
    content: `Una vez aprobada la devolución e inspeccionado el producto, el reembolso se procesa así:<br/><br/>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Tarjeta de crédito:</strong> 5 a 10 días hábiles bancarios (depende del banco emisor).</li>
      <li><strong>PSE / Transferencia bancaria:</strong> 1 a 3 días hábiles.</li>
      <li><strong>Efectivo (pago contraentrega):</strong> Transferencia bancaria al número de cuenta indicado por el comprador, en máximo 5 días hábiles.</li>
    </ul><br/>
    El reembolso siempre se realiza <strong>por el mismo medio de pago utilizado em la compra</strong>. No hacemos devoluciones en efectivo ni en otras formas distintas al medio original.`,
  },
  {
    id: "contacto-sic",
    title: "6. Contacto y Escalamiento ante la SIC",
    content: `Si no quedamos satisfechos mutuamente con la resolución, como consumidor colombiano usted tiene el derecho de acudir a:<br/><br/>
    <ul class="list-none space-y-3">
      <li>📧 <strong>Nuestro correo:</strong> <a href="mailto:hola@tiendalebonmarche.com" class="underline">hola@tiendalebonmarche.com</a></li>
      <li>📱 <strong>WhatsApp:</strong> +57 302 756 7783</li>
      <li>🏛️ <strong>Superintendencia de Industria y Comercio (SIC):</strong><br/>
        <a href="https://www.sic.gov.co" target="_blank" rel="noreferrer" class="underline hover:text-brand-olive transition-colors">www.sic.gov.co</a> · Línea gratuita: 01 8000 910165</li>
    </ul>`,
  },
]

export default function PoliticaDevolucionesPage() {
  return (
    <main className="min-h-screen bg-white text-brand-brown">
      {/* Hero */}
      <section className="border-b border-gray-100 bg-[#F7F6F2] py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-olive mb-4">
            Marco Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif italic text-brand-brown mb-4">
            Política de Devoluciones y Garantías
          </h1>
          <p className="text-sm text-brand-gray leading-relaxed max-w-xl mx-auto">
            Tu satisfacción es nuestra prioridad. Si algo no está bien, lo
            resolvemos. Proceso claro, sin letras pequeñas, cumpliendo la{" "}
            <strong>Ley 1480 de 2011</strong>.
          </p>
          <p className="text-xs text-brand-gray opacity-60 mt-4">
            Última actualización: Abril 2026
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-6 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-brand-brown mb-2">
            ¿Cómo devolver un producto?
          </h2>
          <p className="text-sm text-brand-gray mb-10">
            Un proceso en 4 pasos, sin complicaciones.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="border border-gray-100 rounded-2xl p-6 hover:border-brand-olive/30 transition-colors duration-300"
              >
                <span className="text-4xl font-black text-brand-olive/20 leading-none block mb-3">
                  {step.number}
                </span>
                <h3 className="text-base font-bold text-brand-brown mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-brand-gray leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-10 px-6 bg-brand-brown text-white">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50 mb-1">
              ¿Necesitas ayuda?
            </p>
            <p className="text-lg font-bold">Escríbenos por WhatsApp</p>
            <p className="text-sm opacity-70">
              Respondemos en menos de 2 horas en días hábiles.
            </p>
          </div>
          <a
            href="https://wa.me/573027567783"
            target="_blank"
            rel="noreferrer"
            className="flex-shrink-0 bg-white text-brand-brown font-bold text-sm px-8 py-4 rounded-full hover:bg-brand-olive hover:text-white transition-all duration-300"
          >
            Iniciar chat →
          </a>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
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
              href="/politica-de-privacidad"
              className="hover:text-brand-olive transition-colors underline"
            >
              Política de Privacidad
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
