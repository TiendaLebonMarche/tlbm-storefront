"use client"

import * as React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { motion } from "framer-motion"
import Image from "next/image"

export interface ProductItem {
  id: string
  name: string
  handle: string
  category: string
  imageSrc: string
  price: string
}

export interface ProductMostSoldProps {
  title: string
  subtitle: string
  items: ProductItem[]
}

export const ProductMostSold = ({ title, subtitle, items }: ProductMostSoldProps) => {
  const duplicatedItems = [...items, ...items]

  return (
    <section className="w-full bg-white dark:bg-[#0A0A0F] py-16 md:py-20 overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10 mb-10 reveal">
        <div className="flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-3 text-[#D4AF37]/70 text-[9px] font-bold uppercase tracking-[.4em] mb-4">
              <span className="w-8 h-px bg-[#D4AF37]/30" />
              Selección VIP
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight leading-[.95] text-gray-900 dark:text-white">
              Lo más{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/70 bg-clip-text text-transparent">
                vendidos
              </span>
            </h2>
          </div>
          <LocalizedClientLink
            href="/store"
            className="hidden md:inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.28em] text-gray-400 dark:text-white/30 hover:text-[#D4AF37] transition-colors group"
          >
            Ver Todo
            <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </LocalizedClientLink>
        </div>
      </div>

      {/* Horizontal scrolling row */}
      <div className="pm-wrap reveal r-d2">
        <div className="pm-track">
          {duplicatedItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex-shrink-0 group" style={{ width: "clamp(240px, 28vw, 340px)" }}>
              <LocalizedClientLink href={`/productos/${item.handle}`} className="block no-underline text-inherit">
                {/* Image — rectangular, fondo blanco */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "0.873/1", background: "#FFFFFF" }}>
                  {item.imageSrc ? (
                    <Image
                      src={item.imageSrc}
                      alt={item.name}
                      fill
                      sizes="340px"
                      className="object-contain p-2 md:p-3 transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gray-50">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="#9CA3AF" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.41a2.25 2.25 0 0 1 3.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                      <span className="text-gray-300 text-[8px] font-medium uppercase tracking-widest">Sin imagen</span>
                    </div>
                  )}
                  {/* Gold overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Badge */}
                  <span className="absolute top-3 left-3 text-white text-[8px] sm:text-[7px] font-bold uppercase tracking-[.18em] px-2.5 py-1.5 bg-[#0A0A0F]">
                    Nuevo
                  </span>
                </div>

                {/* Info — centrado */}
                <div className="pt-5 pb-2 flex flex-col items-center text-center gap-[2px]">
                  <span className="text-[11px] font-semibold tracking-[0.08em] leading-snug uppercase mb-1 text-[#6366F1]">
                    {item.category}
                  </span>
                  <h3 className="text-[15px] md:text-[16px] font-semibold tracking-[-0.4px] leading-snug text-[#101010] group-hover:opacity-80 transition-opacity duration-300 line-clamp-2 max-w-[95%]">
                    {item.name}
                  </h3>
                  <span className="text-[17px] md:text-[19px] font-bold tracking-[-0.3px] text-brand-black drop-shadow-sm mt-1.5">
                    {item.price}
                  </span>
                </div>
              </LocalizedClientLink>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center reveal">
        <LocalizedClientLink
          href="/store"
          className="group inline-flex items-center gap-2.5 px-8 py-4 text-white font-bold text-[10px] uppercase tracking-[.25em] rounded-full btn-shine hover:scale-[1.03]"
          style={{ background: "#0A0A0F", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
        >
          Ver Catálogo Completo
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </LocalizedClientLink>
      </div>
    </section>
  )
}
