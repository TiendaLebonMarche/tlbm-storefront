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
          enter="ease-in-out duration-500"
          enterFrom="translate-y-full opacity-0"
          enterTo="translate-y-0 opacity-100"
          leave="ease-in duration-300"
          leaveFrom="translate-y-0 opacity-100"
          leaveTo="translate-y-full opacity-0"
        >
          <div
            className="bg-white/90 backdrop-blur-xl flex flex-col gap-y-4 justify-center items-center p-5 w-full border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.04)]"
            data-testid="mobile-actions"
          >
            <div className="flex items-baseline justify-between w-full">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans mb-0.5">Producto Seleccionado</span>
                <span className="text-sm font-serif text-brand-brown truncate max-w-[180px]" data-testid="mobile-title">{product.title}</span>
              </div>
              
              {selectedPrice ? (
                <div className="flex flex-col items-end">
                   {selectedPrice.price_type === "sale" && (
                    <span className="line-through text-[10px] text-gray-300 font-light font-sans">
                      {selectedPrice.original_price}
                    </span>
                  )}
                  <span
                    className={clx("text-lg font-semibold text-brand-brown font-sans leading-none", {
                      "text-brand-brown": selectedPrice.price_type === "sale",
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
                  className="w-full h-14 border border-gray-100 bg-gray-50/50 flex items-center justify-between px-4 text-[10px] font-bold uppercase tracking-widest text-brand-brown transition-all"
                  data-testid="mobile-actions-button"
                >
                  <span className="truncate max-w-[100px]">
                    {variant
                      ? Object.values(options).join(" / ")
                      : "Opciones"}
                  </span>
                  <ChevronDown className="w-3 h-3 text-brand-brown/40" />
                </button>
              )}
              <button
                onClick={handleAddToCart}
                disabled={!inStock || !variant || isAdding}
                className={clx(
                  "w-full h-14 text-[10px] font-bold uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-brown/5",
                  {
                    "bg-brand-brown text-white active:scale-95": inStock && variant && !isAdding,
                    "bg-gray-100 text-gray-400 cursor-not-allowed": !inStock || !variant,
                    "opacity-80": isAdding
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
                  "Añadir"
                )}
              </button>
            </div>
          </div>
        </Transition>
      </div>
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[75]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed bottom-0 inset-x-0">
            <div className="flex min-h-full h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel
                  className="w-full h-full transform overflow-hidden text-left flex flex-col gap-y-3"
                  data-testid="mobile-actions-modal"
                >
                  <div className="w-full flex justify-end pr-6">
                    <button
                      onClick={close}
                      className="bg-white w-12 h-12 rounded-full text-ui-fg-base flex justify-center items-center"
                      data-testid="close-modal-button"
                    >
                      <X />
                    </button>
                  </div>
                  <div className="bg-white px-6 py-12">
                    {(product.variants?.length ?? 0) > 1 && (
                      <div className="flex flex-col gap-y-6">
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
