"use client"

import { Fragment, useEffect, useState } from "react"
import { Transition, Dialog, DialogPanel } from "@headlessui/react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useRouter } from "next/navigation"

/**
 * Modal de búsqueda — REDISEÑO 11-ago-2026 (decisión Julián).
 *
 * Editoral premium: overlay blanco puro + blur, título serif con tracking,
 * input gigante con clamp() responsive (nunca desborda en mobile), chips de
 * búsquedas populares REALES del catálogo y colecciones REALES de Medusa.
 *
 * Las sugerencias son DINÁMICAS: se cargan de /api/search-suggestions (que
 * deriva colecciones y términos de los títulos de productos de Medusa, con
 * cache invalidable). Si el endpoint falla, se muestran los valores de
 * respaldo estáticos para no romper el modal.
 *
 * - Enter/click → /store?q=... (la StorePage filtra con el query param q).
 * - ESC cierra (HeadlessUI Dialog lo maneja).
 * - Autofocus al abrir.
 */

// Respaldo estático (se muestra solo mientras carga o si la API falla)
const FALLBACK_POPULAR = ["parlante", "smartwatch", "audífonos", "mouse", "reloj", "dron"]

const FALLBACK_COLLECTIONS = [
  { title: "Smartwatches", handle: "smartwatches" },
  { title: "Parlantes y Audio", handle: "parlantes-y-audio" },
  { title: "Gaming y PC", handle: "gaming-y-pc" },
  { title: "Moda y Bolsos", handle: "moda-y-bolsos" },
  { title: "Deportes y Aire Libre", handle: "deportes-y-aire-libre" },
  { title: "Drones y DJI", handle: "drones-y-dji" },
]

type Suggestions = {
  popular: string[]
  collections: { title: string; handle: string }[]
}

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null)
  const router = useRouter()

  const openSearch = () => {
    setQuery("")
    setIsOpen(true)
  }
  const closeSearch = () => setIsOpen(false)

  // Cargar sugerencias dinámicas la primera vez que se abre (una sola vez)
  useEffect(() => {
    if (!isOpen || suggestions) return
    fetch("/api/search-suggestions", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Suggestions | null) => {
        if (data && data.popular?.length) setSuggestions(data)
      })
      .catch(() => {}) // fallback estático si falla
  }, [isOpen, suggestions])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/store?q=${encodeURIComponent(query)}`)
      closeSearch()
    }
  }

  const searchQuick = (term: string) => {
    router.push(`/store?q=${encodeURIComponent(term)}`)
    closeSearch()
  }

  const popular = suggestions?.popular?.length ? suggestions.popular : FALLBACK_POPULAR
  const collections = suggestions?.collections?.length ? suggestions.collections : FALLBACK_COLLECTIONS

  return (
    <>
      <button
        onClick={openSearch}
        className="nav-icon hover:text-brand-black relative inline-flex items-center justify-center outline-none transition-colors w-12 h-12"
        aria-label="Buscar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeSearch}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-white/95 backdrop-blur-md transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center p-4 sm:p-6 pt-[12vh] md:pt-[18vh]">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative w-full max-w-4xl transform overflow-hidden text-center transition-all">
                  <button
                    onClick={closeSearch}
                    aria-label="Cerrar búsqueda"
                    className="absolute right-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full text-3xl leading-none text-brand-gray transition-colors hover:text-black hover:rotate-90 duration-300 outline-none"
                  >
                    &times;
                  </button>

                  <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.3em] mb-3 md:mb-4 text-brand-black">
                    ¿Qué estás buscando?
                  </p>

                  <form
                    onSubmit={handleSearch}
                    className="relative w-full mx-auto mb-8 md:mb-12"
                    data-mcp-toolname="search-store"
                    data-mcp-tooldescription="Search the Le Bon Marché storefront for luxury products, electronics, and books"
                  >
                    <input
                      type="search"
                      aria-label="Buscar productos"
                      placeholder="Escribe aquí..."
                      className="w-full text-center border-b-2 border-brand-black bg-transparent py-3 md:py-4 focus:outline-none placeholder-gray-300 font-serif"
                      style={{ fontSize: "clamp(1.5rem, 4.5vw, 3.25rem)", lineHeight: 1.15 }}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      autoFocus
                    />
                    <button
                      type="submit"
                      aria-label="Buscar"
                      className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 p-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8 text-brand-black hover:text-[#D4AF37] transition duration-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>
                    </button>
                  </form>

                  {/* Búsquedas populares — dinámicas del catálogo */}
                  <div className="mb-8 md:mb-10">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-brand-gray mb-3">
                      Búsquedas populares
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-2.5 px-2">
                      {popular.map((term) => (
                        <button
                          key={term}
                          onClick={() => searchQuick(term)}
                          className="px-4 py-2 rounded-full border border-brand-gray-light text-sm text-brand-black hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 cursor-pointer"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colecciones reales — dinámicas de Medusa */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-brand-gray mb-3">
                      Explorar colecciones
                    </p>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 px-2">
                      {collections.map((c) => (
                        <LocalizedClientLink
                          key={c.handle}
                          href={`/collections/${c.handle}`}
                          onClick={closeSearch}
                          className="text-xs md:text-sm font-medium text-brand-gray uppercase tracking-wider border-b border-transparent hover:border-[#D4AF37] hover:text-[#D4AF37] pb-1 transition-colors duration-300"
                        >
                          {c.title}
                        </LocalizedClientLink>
                      ))}
                    </div>
                  </div>

                  <p className="mt-10 hidden md:block text-[10px] uppercase tracking-[0.2em] text-brand-gray/60">
                    Presiona ESC para cerrar
                  </p>
                </DialogPanel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
