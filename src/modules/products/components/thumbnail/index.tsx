import { Container, clx } from "@medusajs/ui"
import Image from "next/image"
import { motion } from "framer-motion"
import React from "react"

import PlaceholderImage from "@modules/common/icons/placeholder-image"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: any[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
  alt?: string
  layoutId?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "full",
  isFeatured,
  className,
  "data-testid": dataTestid,
  alt = "Producto Le Bon Marché",
  layoutId,
}) => {
  const initialImage = thumbnail || images?.[0]?.url
  const hoverImage = images?.[1]?.url || initialImage // fallback to initial if no 2nd image

  return (
    <Container
      className={clx(
        "relative w-full overflow-hidden bg-transparent border-none transition-all duration-700 rounded-none",
        className,
        {
          "aspect-square": true,
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
      data-testid={dataTestid}
    >
      <div className="group/thumb relative w-full h-full">
        <motion.div layoutId={layoutId} className="absolute inset-0">
          <ImageOrPlaceholder image={initialImage} alt={alt} />
        </motion.div>
        {/* Hover image */}
        {hoverImage && hoverImage !== initialImage && (
          <div className="absolute inset-0 opacity-0 lg:group-hover/thumb:opacity-100 transition-opacity duration-700 z-10 w-full h-full bg-transparent">
            <ImageOrPlaceholder image={hoverImage} alt={`${alt} - vista secundaria`} />
          </div>
        )}
      </div>
    </Container>
  )
}

const ImageOrPlaceholder = ({
  image,
  alt,
}: { image?: string; alt?: string }) => {
  return image ? (
    <Image
      src={image}
      alt={alt || "Producto Le Bon Marché"}
      className="absolute inset-0 object-contain object-center p-0 md:p-2 transition-transform duration-1000 lg:group-hover/thumb:scale-[1.03] mix-blend-multiply"
      draggable={false}
      quality={85}
      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
      fill
      style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
    />
  ) : (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-transparent">
      <PlaceholderImage size={24} />
    </div>
  )
}

export default Thumbnail
