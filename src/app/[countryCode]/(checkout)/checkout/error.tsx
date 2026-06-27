"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-y-6 px-4 text-center">
      <h1 className="text-4xl font-bold text-brand-navy">
        Error en el pago
      </h1>
      <p className="max-w-md text-brand-gray">
        Ocurrió un problema al procesar tu pago. No se ha realizado ningún cobro.
      </p>
      <div className="flex gap-x-4">
        <button
          onClick={reset}
          className="rounded-full bg-brand-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-blue"
        >
          Intentar de nuevo
        </button>
        <Link
          href="/co/cart"
          className="rounded-full border border-brand-gray-light px-6 py-3 text-sm font-medium text-brand-navy transition-colors hover:border-brand-navy"
        >
          Volver al carrito
        </Link>
      </div>
    </div>
  )
}
