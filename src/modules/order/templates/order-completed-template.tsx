import { cookies as nextCookies } from "next/headers"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  // Determinar si el pago es en efectivo
  const paymentSession = order.payment_collections?.[0]?.payment_sessions?.[0]
  const isCash = paymentSession?.provider_id?.includes("efectivo") ?? false

  return (
    <div className="py-6 min-h-[calc(100vh-64px)]">
      <div className="content-container flex flex-col justify-center items-center gap-y-10 max-w-4xl h-full w-full">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div
          className="flex flex-col gap-4 max-w-4xl h-full bg-white w-full py-10"
          data-testid="order-complete-container"
        >
          {/* ── Encabezado de Éxito ── */}
          <div className="text-center mb-6 pb-6 border-b border-brand-gray-light">
            <div className="w-16 h-16 bg-brand-black/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-brand-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-black mb-2">
              ¡Muchas Gracias!
            </h1>
            <p className="text-brand-gray text-lg font-light">
              Tu orden se ha realizado con éxito.
            </p>
          </div>

          {/* ── Instrucciones de Pago en Efectivo ── */}
          {isCash && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-amber-800 text-sm mb-2">
                    Pago en Efectivo — Pendiente
                  </h3>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    Tu pago está pendiente de confirmación. Un asesor se comunicará contigo
                    para coordinar el pago en efectivo y la entrega o recogida de tu producto.
                  </p>
                </div>
              </div>
            </div>
          )}

          <OrderDetails order={order} />

          <div className="mt-4">
            <h2 className="text-xl font-serif font-bold text-brand-black mb-4">
              Resumen de tu Orden
            </h2>
            <Items order={order} />
          </div>

          <CartTotals totals={order} />
          <ShippingDetails order={order} />
          <PaymentDetails order={order} />

          {/* ── Botón de WhatsApp ── */}
          <div className="mt-4 pt-6 border-t border-brand-gray-light text-center">
            <p className="text-sm text-brand-gray mb-4 font-light">
              ¿Tienes alguna duda sobre tu orden?
            </p>
            <a
              href={`https://wa.me/573027567783?text=${encodeURIComponent(`Hola, soy el cliente de la orden #${order.display_id || order.id.slice(-8)}. Tengo una consulta sobre mi compra.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg text-sm font-bold hover:brightness-110 transition-all shadow-lg"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contactar por WhatsApp
            </a>
          </div>

          <Help />
        </div>
      </div>
    </div>
  )
}
