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
      <div className="w-full bg-gray-100 aspect-square rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Sin imágenes</p>
      </div>
    )
  }

  const selectedImage = images[selectedImageIndex]

  return (
    <div className="w-full space-y-4">
      {/* Imagen Principal */}
      <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-100 group">
        {selectedImage?.url && (
          <Image
            src={selectedImage.url}
            alt="Producto"
            fill
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}

        {/* Overlay de zoom hint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-white/60"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 105.5 5.5a7.5 7.5 0 0010.5 10.5z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
          {images.map((image, idx) => (
            <button
              key={image.id}
              onClick={() => setSelectedImageIndex(idx)}
              className={`relative aspect-square overflow-hidden rounded-lg bg-gray-100 transition-all ${
                selectedImageIndex === idx
                  ? "ring-2 ring-brand-gold"
                  : "opacity-60 hover:opacity-100"
              }`}
              title={`Ver imagen ${idx + 1}`}
            >
              {image.url && (
                <Image
                  src={image.url}
                  alt={`Producto imagen ${idx + 1}`}
                  fill
                  className="object-cover w-full h-full"
                  sizes="120px"
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="text-xs text-gray-500 text-center">
          {selectedImageIndex + 1} de {images.length} imágenes
        </div>
      )}
    </div>
  )
}

export default ImageGallery
