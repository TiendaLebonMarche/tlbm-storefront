"use client"

function isEqual(a: unknown, b: unknown) { return JSON.stringify(a) === JSON.stringify(b); }

import { addToCart, retrieveCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { useRouter } from "next/navigation"
import { useUI } from "@lib/context/ui-context"
import { trackAddToCart, trackViewItem } from "@lib/util/analytics"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { openCart, setCartCount, setCart } = useUI()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [addedSuccess, setAddedSuccess] = useState(false)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant, pathname, router, searchParams])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    // In Medusa v2, inventory_quantity may be null when using inventory items
    if (
      selectedVariant?.manage_inventory &&
      ((selectedVariant?.inventory_quantity ?? -1) === -1 ||
        (selectedVariant?.inventory_quantity || 0) > 0)
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    try {
      const result = await addToCart({
        variantId: selectedVariant.id,
        quantity: 1,
        countryCode,
      })

      if (result && typeof result === "object" && "cart" in result) {
        setAddedSuccess(true)
        // Badge instantáneo: contar items del carrito devuelto por addToCart
        // (el router.refresh() re-sincroniza el server component después)
        const itemCount = result.cart.items?.reduce(
          (acc, item) => acc + (item.quantity || 0),
          0
        )
        setCartCount(itemCount ?? null)
        // Carrito fresco en el contexto UI → el drawer lo muestra aunque el
        // re-render RSC falle (React #441) y el prop del servidor quede stale.
        setCart(result.cart)
        // Track add_to_cart for GTM
        trackAddToCart({
          id: selectedVariant.id || product.id,
          name: product.title || "Producto",
          price: (() => {
            const cp = selectedVariant?.calculated_price
            return typeof cp === "string"
              ? parseFloat(cp) || 0
              : Number(cp?.calculated_amount ?? 0)
          })(),
          quantity: 1,
          category: product.collection?.title || undefined,
          variant: selectedVariant?.title || undefined,
        })
        // Abrir el sidebar SOLO después de tener el carrito actualizado
        openCart()
        // Refrescar server components (CartButton re-fetchea retrieveCart)
        // → el conteo del servidor se sincroniza con el optimista
        // ⚠️ si el re-render RSC falla (React #441 transitorio), NO debe
        // tumbar el flujo — el badge optimista ya muestra el conteo correcto.
        try {
          router.refresh()
        } catch (e) {
          console.error("router.refresh falló tras añadir:", e)
        }
        setTimeout(() => setAddedSuccess(false), 2500)
      } else if (result) {
        throw new Error(result as string)
      }
    } catch (error: any) {
      const message = error?.message || "Error desconocido de conexión"
      console.error("Error al añadir a la bolsa:", error)
      if (error?.digest) console.error("RSC digest:", error.digest)

      // Next 16: tras un server action, el framework re-renderiza el árbol RSC.
      // Si ese render falla (transitorio, React #441 "Server Components render"),
      // la promesa de la acción rechaza AUNQUE el item SÍ se agregó. Antes de
      // alarmar al cliente, verificamos el carrito real contra Medusa.
      const isRscError = /Minified React error|Server Components render/i.test(message)
      if (isRscError) {
        try {
          const cart = await retrieveCart()
          const hasItem = cart?.items?.some(
            (i: any) => i.variant_id === selectedVariant?.id
          )
          if (hasItem) {
            setAddedSuccess(true)
            setCartCount(
              ((cart?.items || []) as any[]).reduce((acc: number, i: any) => acc + (i.quantity || 0), 0)
            )
            setCart(cart)
            openCart()
            setTimeout(() => setAddedSuccess(false), 2500)
            return
          }
        } catch (e) {
          console.error("Fallo al verificar carrito tras error RSC:", e)
        }
      }

      const friendly =
        isRscError
          ? "Hubo un problema al actualizar la bolsa. Intenta de nuevo o escríbenos por WhatsApp."
          : message
      alert(
        `${friendly}\n\nSi el problema continúa, escríbenos a WhatsApp y te ayudamos al instante.`
      )
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-y-6" ref={actionsRef}>

        {/* Selector de variantes (tallas, colores, etc.) */}
        {(product.variants?.length ?? 0) > 1 && (
          <div className="flex flex-col gap-y-4">
            {(product.options || []).map((option) => (
              <div key={option.id}>
                <OptionSelect
                  option={option}
                  current={options[option.id]}
                  updateOption={setOptionValue}
                  title={option.title ?? ""}
                  data-testid="product-options"
                  disabled={!!disabled || isAdding}
                />
              </div>
            ))}
          </div>
        )}

        {/* Precio */}
        <div className="py-1">
          <ProductPrice product={product} variant={selectedVariant} />
        </div>

        {/* Availability & Urgency — UNA sola fuente de verdad: inStock de la variante seleccionada */}
        <div className="flex items-center gap-3">
          {inStock ? (
            <>
              <div className="relative flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-green-500/30 animate-ping absolute" />
                <div className="w-2 h-2 rounded-full bg-green-500 relative" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-700 font-sans">Disponible</p>
                <p className="text-[11px] text-brand-gray font-light font-sans tracking-tight">Envío prioritario desde nuestra dirección principal</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <p className="text-sm font-medium text-red-500 font-sans">Agotado temporalmente</p>
            </>
          )}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          {/* Botón principal: Añadir al carrito */}
          <button
            onClick={handleAddToCart}
            disabled={
              !inStock ||
              !selectedVariant ||
              !!disabled ||
              isAdding ||
              !isValidVariant
            }
            className={`w-full h-14 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group/btn rounded-sm ${
              addedSuccess
                ? 'bg-black text-white'
                : !inStock || !selectedVariant || !isValidVariant
                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  : 'bg-[#D4AF37] text-black hover:bg-[#D4AF37]/80 active:scale-[0.98] shadow-lg shadow-[#D4AF37]/20'
            }`}
            data-testid="add-product-button"
          >
            {/* Hover shine effect */}
            <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 ease-out" />
            
            {isAdding ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : addedSuccess ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <span>Añadido con éxito</span>
              </>
            ) : !selectedVariant && !options ? (
              "Elige tus opciones"
            ) : !inStock || !isValidVariant ? (
              "Agotado por ahora"
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5 transition-transform duration-200 group-hover/btn:scale-110">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <span>Añadir a mi bolsa</span>
              </>
            )}
          </button>
        </div>

      </div>

      <MobileActions
        product={product}
        variant={selectedVariant}
        options={options}
        updateOptions={setOptionValue}
        inStock={inStock}
        handleAddToCart={handleAddToCart}
        isAdding={isAdding}
        show={true}
        optionsDisabled={!!disabled || isAdding}
      />
    </>
  )
}
