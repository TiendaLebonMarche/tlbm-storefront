import { Dialog, Transition } from "@headlessui/react"
import { Button, clx } from "@medusajs/ui"
import React, { Fragment, useMemo } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"

import { getProductPrice } from "@lib/util/get-product-price"
import OptionSelect from "./option-select"
import { HttpTypes } from "@medusajs/types"
import { isSimpleProduct } from "@lib/util/product"

type MobileActionsProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  options: Record<string, string | undefined>
  updateOptions: (title: string, value: string) => void
  inStock?: boolean
  handleAddToCart: () => void
  isAdding?: boolean
  show: boolean
  optionsDisabled: boolean
}

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  options,
  updateOptions,
  inStock,
  handleAddToCart,
  isAdding,
  show,
  optionsDisabled,
}) => {
  const { state, open, close } = useToggleState()

  const price = getProductPrice({
    product: product,
    variantId: variant?.id,
  })

  const selectedPrice = useMemo(() => {
    if (!price) {
      return null
    }
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  const isSimple = isSimpleProduct(product)

  return (
    <>
      <div
        className={clx("lg:hidden inset-x-0 bottom-0 fixed z-50", {
          "pointer-events-none": !show,
        })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="transition ease-in-out duration-500"
          enterFrom="translate-y-full opacity-0"
          enterTo="translate-y-0 opacity-100"
          leave="transition ease-in duration-300"
          leaveFrom="translate-y-0 opacity-100"
          leaveTo="translate-y-full opacity-0"
        >
          <div
            className="bg-white/95 flex flex-col gap-y-4 justify-center items-center p-5 pb-[max(16px,env(safe-area-inset-bottom))] w-full border-t border-brand-gray-light shadow-[0_-15px_50px_rgba(0,0,0,0.06)]"
            data-testid="mobile-actions"
          >
            <div className="flex items-baseline justify-between w-full">
              <div className="flex flex-col gap-y-1">
                <span className="text-[9px] uppercase tracking-[0.3em] text-brand-gray font-sans font-bold">Producto Seleccionado</span>
                <span className="text-sm font-serif text-brand-black truncate max-w-[200px]" data-testid="mobile-title">{product.title}</span>
              </div>
              
              {selectedPrice ? (
                <div className="flex flex-col items-end gap-y-0.5">
                   {selectedPrice.price_type === "sale" && (
                    <span className="line-through text-[10px] text-gray-300 font-light font-sans">
                      {selectedPrice.original_price}
                    </span>
                  )}
                  <span
                    className={clx("text-xl font-black text-brand-black font-sans tracking-tighter leading-none", {
                      "text-brand-black": selectedPrice.price_type === "sale",
                    })}
                  >
                    {selectedPrice.calculated_price}
                  </span>
                </div>
              ) : (
                <div />
              )}
            </div>

            <div className={clx("grid grid-cols-2 w-full gap-x-3", {
              "!grid-cols-1": isSimple
            })}>
              {!isSimple && (
                <button
                  onClick={open}
                  className="w-full h-12 border border-brand-gray-light bg-brand-gray-light/20/50 flex items-center justify-between px-5 text-[10px] font-bold uppercase tracking-widest text-brand-black hover:bg-brand-gray-light/30 transition-colors"
                  data-testid="mobile-actions-button"
                >
                  <span className="truncate max-w-[120px]">
                    {variant
                      ? Object.values(options).join(" / ")
                      : "Elegir Talla"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-brand-black/40" />
                </button>
              )}
              <button
                onClick={handleAddToCart}
                disabled={!inStock || !variant || isAdding}
                className={clx(
                  "w-full h-12 text-[10px] font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-brown/10 relative overflow-hidden",
                  {
                    "bg-brand-black text-white active:scale-95": inStock && variant && !isAdding,
                    "bg-gray-100 text-gray-300 cursor-not-allowed border border-gray-50": !inStock || !variant,
                    "opacity-90": isAdding
                  }
                )}
                data-testid="mobile-cart-button"
              >
                {isAdding ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : !variant ? (
                  "Seleccionar"
                ) : !inStock ? (
                  "Agotado"
                ) : (
                  <>
                    <span>Añadir</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </Transition>
      </div>
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[150]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-brand-black/40" />
          </Transition.Child>

          <div className="fixed bottom-0 inset-x-0">
            <div className="flex min-h-full h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-100 translate-y-full"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-100 translate-y-full"
              >
                <Dialog.Panel
                  className="w-full transform overflow-hidden text-left flex flex-col gap-y-0 bg-white rounded-t-3xl shadow-2xl"
                  data-testid="mobile-actions-modal"
                >
                  <div className="w-full flex justify-between items-center px-8 py-6 border-b border-brand-gray-light">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-black/40">Opciones Disponibles</span>
                    <button
                      onClick={close}
                      className="bg-brand-gray-light/20 w-10 h-10 rounded-full text-brand-black flex justify-center items-center hover:bg-gray-100 transition-colors"
                      data-testid="close-modal-button"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="bg-white px-8 py-10">
                    {(product.variants?.length ?? 0) > 1 && (
                      <div className="flex flex-col gap-y-8">
                        {(product.options || []).map((option) => {
                          return (
                            <div key={option.id}>
                              <OptionSelect
                                option={option}
                                current={options[option.id]}
                                updateOption={updateOptions}
                                title={option.title ?? ""}
                                disabled={optionsDisabled}
                              />
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                  <div className="p-8 bg-brand-gray-light/20/50">
                    <button 
                      onClick={close}
                      className="w-full h-14 bg-brand-black text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black transition-all"
                    >
                      Confirmar Selección
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileActions
