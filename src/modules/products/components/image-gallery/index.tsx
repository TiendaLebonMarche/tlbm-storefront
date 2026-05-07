"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useState, useCallback } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  productTitle?: string
}

const ImageGallery = ({ images, productTitle }: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }, [isZoomed])

  if (!images || images.length === 0) {
    return (
      <div className="w-full bg-gray-50 aspect-[4/5] flex items-center justify-center">
        <p className="text-gray-300 text-xs tracking-[0.3em] uppercase font-sans">Sin imagen</p>
      </div>
    )
  }

  const selectedImage = images[selectedImageIndex]
  const baseAlt = productTitle || "Producto Le Bon Marché"

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-3 w-full">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex lg:flex-col gap-3 w-full lg:w-[80px] flex-shrink-0 overflow-x-auto lg:overflow-y-auto lg:max-h-[700px] no-scrollbar">
          {images.map((image, idx) => (
            <button
              key={image.id}
              onClick={() => setSelectedImageIndex(idx)}
              className={`relative aspect-[3/4] flex-shrink-0 w-20 lg:w-full overflow-hidden transition-all duration-700 ease-in-out ${
                selectedImageIndex === idx
                  ? "border border-brand-brown opacity-100"
                  : "border border-transparent opacity-40 hover:opacity-100"
              }`}
              title={`Ver ${baseAlt} - imagen ${idx + 1}`}
            >
              {image.url && (
                <Image
                  src={image.url}
                  alt={`${baseAlt} - miniatura ${idx + 1}`}
                  fill
                  className="object-cover bg-white"
                  sizes="80px"
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div 
        className="relative flex-1 aspect-[4/5] bg-white overflow-hidden cursor-crosshair"
        onClick={() => setIsZoomed(!isZoomed)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
      >
        {selectedImage?.url && (
          <Image
            src={selectedImage.url}
            alt={`${baseAlt} - imagen principal`}
            fill
            className={`object-cover transition-all duration-1000 ease-in-out ${
              isZoomed ? 'scale-[2]' : 'scale-100'
            }`}
            style={isZoomed ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` } : undefined}
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        )}

        {/* Subtle border overlay */}
        <div className="absolute inset-0 border border-gray-100/40 pointer-events-none z-10" />

        {/* Zoom hint */}
        {!isZoomed && (
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <div className="bg-white/80 backdrop-blur-sm p-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-4 h-4 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 105.5 5.5a7.5 7.5 0 0010.606 10.606zM10.5 7.5v6m3-3h-6" />
              </svg>
            </div>
          </div>
        )}

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 text-[10px] text-gray-400 tracking-[0.2em] font-sans z-20">
            {String(selectedImageIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageGallery
