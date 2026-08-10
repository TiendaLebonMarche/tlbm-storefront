import { ReactNode } from "react"

/**
 * PageHeader — DISEÑO POR DEFECTO de TODAS las subpáginas TLBM (regla 10-ago-2026).
 * Patrón editorial extraído de /co/store:
 *   eyebrow 9px uppercase tracking 0.4em negro · título serif enorme (tracking-tighter,
 *   leading-none) · descripción a la derecha (desktop) · divider delgado gris.
 *
 * Toda subpágina NUEVA debe usar este componente (nunca headers propios inventados).
 */
export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: ReactNode
  description?: string
}) {
  return (
    <div className="pt-8 pb-10 px-6">
      <div className="content-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-black mb-3 block">
              {eyebrow}
            </span>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-brand-black leading-none tracking-tighter"
            >
              {title}
            </h1>
          </div>
          {description && (
            <p className="text-brand-gray text-xs font-light leading-relaxed max-w-xs md:text-right">
              {description}
            </p>
          )}
        </div>
        {/* Thin divider line */}
        <div className="mt-8 h-px w-full bg-gray-100" />
      </div>
    </div>
  )
}
