import { Container, Heading, Text } from "@medusajs/ui"
import { CreditCard } from "@medusajs/icons"

import { isStripeLike, paymentInfoMap } from "@lib/constants"
import Divider from "@modules/common/components/divider"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0].payments?.[0]

  return (
    <div>
      <Heading level="h2" className="flex flex-row text-3xl-regular my-6">
        Pago
      </Heading>
      <div>
        {payment && (
          <div className="flex flex-col small:flex-row items-start gap-y-6 lg:gap-x-12 w-full bg-brand-gray-light/10 p-6 rounded-3xl border border-brand-soft/20">
            <div className="flex flex-col w-full small:w-1/2">
              <Text className="txt-medium-plus text-ui-fg-base mb-2 font-bold uppercase tracking-widest text-[10px]">
                Método de pago
              </Text>
              <Text
                className="txt-medium text-brand-black font-serif italic text-lg leading-tight"
                data-testid="payment-method"
              >
                {paymentInfoMap[payment.provider_id]?.title || payment.provider_id}
              </Text>
            </div>
            <div className="flex flex-col w-full small:w-1/2">
              <Text className="txt-medium-plus text-ui-fg-base mb-2 font-bold uppercase tracking-widest text-[10px]">
                Detalles del pago
              </Text>
              <div className="flex gap-4 txt-medium text-ui-fg-subtle items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-brand-black/10 text-brand-black">
                  {paymentInfoMap[payment.provider_id]?.icon || <CreditCard />}
                </div>
                <Text data-testid="payment-amount" className="text-sm font-medium text-brand-black">
                  {isStripeLike(payment.provider_id) && payment.data?.card_last4
                    ? `**** **** **** ${payment.data.card_last4}`
                    : `${convertToLocale({
                        amount: payment.amount,
                        currency_code: order.currency_code,
                      })} pagado`}
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>

      <Divider className="mt-8" />
    </div>
  )
}

export default PaymentDetails
