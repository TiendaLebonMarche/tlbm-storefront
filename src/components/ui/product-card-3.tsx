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
  const duplicatedItems = [...items, ...items, ...items, ...items]

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
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#C8912E] bg-clip-text text-transparent">
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
            <div key={`${item.id}-${index}`} className="pm-card card-lift group">
              <LocalizedClientLink href={`/productos/${item.handle}`} className="block">
                <div className="relative aspect-square overflow-hidden" style={{ background: "#F5F5F0" }}>
                  {item.imageSrc ? (
                    <Image
                      src={item.imageSrc}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 220px, 280px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-[9px] font-bold uppercase tracking-widest">
                      Sin imagen
                    </div>
                  )}
                  {/* Gold overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Badge */}
                  <span className="absolute top-3 left-3 text-white text-[8px] font-bold uppercase tracking-[.18em] px-2.5 py-1.5 rounded-full badge-pulse" 
                    style={{ background: "linear-gradient(135deg,#D4AF37,#C8912E)", boxShadow: "0 2px 12px rgba(212,175,55,.2)" }}>
                    Nuevo
                  </span>
                </div>
              </LocalizedClientLink>
              <div className="p-4">
                <LocalizedClientLink href={`/productos/${item.handle}`}>
                  <h3 className="text-sm font-semibold mb-1 text-gray-900 dark:text-white/90 line-clamp-1">{item.name}</h3>
                </LocalizedClientLink>
                <p className="text-xs font-medium text-gray-400 dark:text-white/25 mb-3">{item.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#D4AF37]">{item.price}</span>
                  <LocalizedClientLink
                    href={`/productos/${item.handle}`}
                    className="px-4 py-2 text-[#0A0A0F] text-[10px] font-bold uppercase tracking-[.22em] rounded-full btn-shine"
                    style={{ background: "linear-gradient(135deg,#D4AF37,#C8912E)" }}
                  >
                    Comprar
                  </LocalizedClientLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center reveal">
        <LocalizedClientLink
          href="/store"
          className="group inline-flex items-center gap-2.5 px-8 py-4 text-[#0A0A0F] font-bold text-[10px] uppercase tracking-[.25em] rounded-full btn-shine"
          style={{ background: "linear-gradient(135deg,#D4AF37,#C8912E)", boxShadow: "0 4px 24px rgba(212,175,55,.2)" }}
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
