"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="w-full bg-gray-50 aspect-square flex items-center justify-center">
        <p className="text-gray-400 text-xs tracking-widest uppercase">Sin imagen</p>
      </div>
    )
  }

  const selectedImage = images[selectedImageIndex]

  return (
    <div className="flex gap-3 w-full">
      {/* Thumbnails — columna vertical izquierda (estilo Amazon) */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2 w-16 flex-shrink-0">
          {images.map((image, idx) => (
            <button
              key={image.id}
              onClick={() => setSelectedImageIndex(idx)}
              className={`relative aspect-square w-full overflow-hidden bg-gray-50 border transition-all duration-200 ${
                selectedImageIndex === idx
                  ? "border-black"
                  : "border-transparent opacity-60 hover:opacity-100 hover:border-gray-300"
              }`}
              title={`Ver imagen ${idx + 1}`}
            >
              {image.url && (
                <Image
                  src={image.url}
                  alt={`Imagen ${idx + 1}`}
                  fill
                  className="object-contain p-1"
                  sizes="64px"
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Imagen Principal — grande, cuadrada, fondo blanco, padding generoso */}
      <div className="relative flex-1 aspect-square bg-white border border-gray-100 overflow-hidden group">
        {selectedImage?.url && (
          <Image
            src={selectedImage.url}
            alt="Imagen principal del producto"
            fill
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            priority
            sizes="(max-width: 768px) 90vw, 55vw"
          />
        )}

        {/* Indicador zoom */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-white/90 border border-gray-200 p-1.5 rounded-full shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 105.5 5.5a7.5 7.5 0 0010.606 10.606zM10.5 7.5v6m3-3h-6" />
            </svg>
          </div>
        </div>

        {/* Contador */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] px-2 py-0.5 tracking-widest">
            {selectedImageIndex + 1}/{images.length}
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageGallery
