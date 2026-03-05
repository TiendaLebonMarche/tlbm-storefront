"use client"

import { useRef, useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function NavMenuMore() {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="hover:text-brand-gold hover:underline underline-offset-8 transition-colors text-white group-data-[scrolled=true]:text-brand-black focus:outline-none uppercase"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        type="button"
      >
        Más ▾
      </button>
      {open && (
        <div
          className="absolute left-0 top-full mt-2 min-w-[180px] py-2 px-0 bg-white shadow-2xl rounded-md border border-gray-100 z-[100]"
          style={{ boxShadow: '0 8px 32px 0 rgba(60,60,60,0.18)' }}
        >
          <ul className="flex flex-col">
            <li><LocalizedClientLink href="/accesorios" className="block px-6 py-2 text-brand-black hover:text-brand-gold hover:bg-gray-50 transition-colors">Accesorios</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/marcas" className="block px-6 py-2 text-brand-black hover:text-brand-gold hover:bg-gray-50 transition-colors">Marcas</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/mascotas" className="block px-6 py-2 text-brand-black hover:text-brand-gold hover:bg-gray-50 transition-colors">Mascotas</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/personal" className="block px-6 py-2 text-brand-black hover:text-brand-gold hover:bg-gray-50 transition-colors">Personal</LocalizedClientLink></li>
          </ul>
        </div>
      )}
    </div>
  )
}
