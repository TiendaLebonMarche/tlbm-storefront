"use client"

import { useRef, useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function NavMenuMore() {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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
        className="hover:text-brand-gold hover:underline underline-offset-8 transition-colors text-white group-data-[scrolled=true]:text-brand-black focus:outline-none uppercase font-bold tracking-widest text-sm"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        type="button"
      >
        Más ▾
      </button>
      {open && (
        <div
          className="absolute left-0 top-full mt-3 min-w-[200px] py-3 px-0 bg-white rounded-md z-[200] transition-all"
          style={{ boxShadow: '0 10px 40px 0 rgba(0,0,0,0.15)' }}
        >
          <ul className="flex flex-col">
            <li><LocalizedClientLink href="/accesorios" className="block px-6 py-3 text-brand-black hover:text-brand-gold hover:bg-gray-50 transition-colors text-sm font-medium">Accesorios</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/marcas" className="block px-6 py-3 text-brand-black hover:text-brand-gold hover:bg-gray-50 transition-colors text-sm font-medium">Marcas</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/mascotas" className="block px-6 py-3 text-brand-black hover:text-brand-gold hover:bg-gray-50 transition-colors text-sm font-medium">Mascotas</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/personal" className="block px-6 py-3 text-brand-black hover:text-brand-gold hover:bg-gray-50 transition-colors text-sm font-medium">Personal</LocalizedClientLink></li>
          </ul>
        </div>
      )}
    </div>
  )
}
