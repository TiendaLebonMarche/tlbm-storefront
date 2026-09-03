"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  productTitle?: string
  layoutId?: string
}

const ImageGallery = ({ images, productTitle, layoutId }: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })

  const goNext = useCallback(() => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goPrev = useCallback(() => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goNext, goPrev])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }, [isZoomed])

  if (!images || images.length === 0) {
    return (
      <div className="w-full bg-brand-gray-light/20 aspect-[4/5] flex flex-col items-center justify-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="#9CA3AF" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.41a2.25 2.25 0 0 1 3.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <p className="text-gray-300 text-[9px] tracking-[0.3em] uppercase font-sans">Sin imagen</p>
      </div>
    )
  }

  const selectedImage = images[selectedImageIndex]
  const baseAlt = productTitle || "Producto Le Bon Marché"

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 w-full">

      {/* ── THUMBNAILS ── */}
      {images.length > 1 && (
        <div className="flex lg:flex-col gap-2 w-full lg:w-[88px] flex-shrink-0 overflow-x-auto lg:overflow-y-auto lg:max-h-[700px] no-scrollbar">
          {images.map((image, idx) => (
            <button
              key={image.id}
              onClick={() => setSelectedImageIndex(idx)}
              className={`relative aspect-[4/5] flex-shrink-0 w-[72px] lg:w-full overflow-hidden transition-all duration-500 ${
                selectedImageIndex === idx
                  ? "ring-1 ring-gold opacity-100 scale-100"
                  : "ring-0 opacity-50 hover:opacity-80 hover:scale-[1.02]"
              }`}
            >
              {image.url && (
                <Image
                  src={image.url}
                  alt={`${baseAlt} - miniatura ${idx + 1}`}
                  fill
                  className="object-contain bg-white p-1"
                  sizes="88px"
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* ── MAIN IMAGE ── */}
      <div 
        className="relative w-full lg:flex-1 aspect-[4/5] bg-white overflow-hidden cursor-crosshair group/image"
        onClick={() => setIsZoomed(!isZoomed)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
      >
        {/* Gold corner accent */}
        <div className="absolute top-0 left-0 z-30 pointer-events-none">
          <div className="w-[60px] h-[1px] bg-gradient-to-r from-gold to-transparent" />
          <div className="w-[1px] h-[40px] bg-gradient-to-b from-gold to-transparent ml-0" />
        </div>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-10 md:h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-sm opacity-0 md:opacity-0 group-hover/image:opacity-100 transition-all duration-300 hover:bg-white hover:shadow-md translate-x-[-4px] group-hover/image:translate-x-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-body">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-10 md:h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-sm opacity-0 md:opacity-0 group-hover/image:opacity-100 transition-all duration-300 hover:bg-white hover:shadow-md translate-x-[4px] group-hover/image:translate-x-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-body">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}

        <AnimatePresence mode="wait">
          {selectedImage?.url && (
            <motion.div
              key={selectedImage.id}
              layoutId={layoutId}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center p-4 md:p-6"
            >
              <Image
                src={selectedImage.url}
                alt={`${baseAlt} - imagen principal`}
                fill
                className={`object-contain transition-all duration-700 ease-out ${
                  isZoomed ? 'scale-[2]' : 'scale-100'
                }`}
                style={isZoomed ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`, objectFit: 'cover' } : { objectFit: 'contain' }}
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle border */}
        <div className="absolute inset-0 border border-brand-gray-light/30 pointer-events-none z-10" />

        {/* Zoom hint */}
        {!isZoomed && (
          <div className="absolute bottom-4 right-4 opacity-0 group-hover/image:opacity-100 transition-all duration-300 z-20 translate-y-1 group-hover/image:translate-y-0">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-3.5 h-3.5 text-body/50">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 105.5 5.5a7.5 7.5 0 0010.606 10.606zM10.5 7.5v6m3-3h-6" />
              </svg>
              <span className="text-[9px] font-medium text-body/50 uppercase tracking-[0.15em]">Ampliar</span>
            </div>
          </div>
        )}

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 z-20">
            <span className="text-[10px] font-medium text-body/30 tracking-[0.15em] font-sans">
              {String(selectedImageIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
          </div>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(idx); }}
                className={`transition-all duration-300 rounded-full ${
                  selectedImageIndex === idx
                    ? 'w-6 h-[2px] bg-gold'
                    : 'w-[6px] h-[6px] bg-body/15 hover:bg-body/30'
                }`}
                aria-label={`Ir a imagen ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageGallery
