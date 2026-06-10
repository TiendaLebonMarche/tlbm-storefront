"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Star, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

// Define the types for the component props
interface ProductCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  imageUrl: string;
  title: string;
  category?: string;
  rating?: number;
  ratingsCount?: number;
  reviewsCount?: number;
  specifications?: string[];
  price: string;
  originalPrice: string;
  discount: string;
  isAssured?: boolean;
  productUrl: string;
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      imageUrl,
      title,
      category,
      rating = 5.0,
      ratingsCount = 120,
      reviewsCount = 45,
      specifications,
      price,
      originalPrice,
      discount,
      isAssured = true,
      productUrl,
      ...props
    },
    ref
  ) => {
    const [isWishlisted, setIsWishlisted] = React.useState(false);

    // Animation variants for framer-motion
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as any },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "bg-white text-brand-black border border-brand-gray-light rounded-lg overflow-hidden w-full p-6 md:p-8",
          className
        )}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "100px" }}
        whileHover={{
          boxShadow: "0px 10px 30px -5px rgba(0,0,0, 0.05)",
          y: -5,
        }}
        transition={{ duration: 0.3 }}
        {...(props as any)}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1.5fr] gap-8 items-center">
          {/* Column 1: Image */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group w-full aspect-square max-w-[200px] mx-auto bg-brand-gray-light/20/50 rounded-xl p-4">
              <LocalizedClientLink href={productUrl} className="block w-full h-full">
                <Image
                  src={imageUrl}
                  alt={title}
                  width={200}
                  height={200}
                  className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </LocalizedClientLink>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 rounded-full hover:bg-white/80 backdrop-blur"
                onClick={(e) => {
                  e.preventDefault();
                  setIsWishlisted(!isWishlisted);
                }}
                aria-label="Toggle Wishlist"
              >
                <Heart
                  className={cn(
                    "h-5 w-5 text-brand-gray transition-colors",
                    isWishlisted && "fill-red-500 text-red-500"
                  )}
                />
              </Button>
            </div>
            {/* Omitted checkbox intentionally for a cleaner typical e-comm look, but can be added back if strongly needed. The user wanted buy button and store info. */}
          </div>

          {/* Column 2: Product Details */}
          <div className="flex flex-col gap-3">
            {category && (
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-black">
                {category}
              </span>
            )}
            <LocalizedClientLink href={productUrl}>
              <h2 className="text-xl md:text-2xl font-serif font-semibold text-brand-black hover:text-brand-black transition-colors">{title}</h2>
            </LocalizedClientLink>
            
            <div className="flex items-center gap-3 text-sm text-brand-gray mt-1">
              <div className="bg-brand-black text-white px-2 py-0.5 rounded flex items-center gap-1">
                <span className="font-medium text-xs">{rating.toFixed(1)}</span>
                <Star className="h-3 w-3 fill-white" />
              </div>
              <span className="text-xs">
                {ratingsCount} Calificaciones & {reviewsCount} Reseñas
              </span>
            </div>

            {specifications && specifications.length > 0 && (
              <ul className="space-y-2 text-sm list-disc list-inside text-brand-gray mt-4">
                {specifications.slice(0, 4).map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Column 3: Pricing and CTA */}
          <div className="flex flex-col gap-3 justify-center md:items-end text-left md:text-right border-t md:border-t-0 md:border-l border-brand-gray-light pt-6 md:pt-0 md:pl-8">
            <div className="flex items-end md:items-center gap-2 justify-start md:justify-end">
              <h3 className="text-3xl font-bold text-brand-black">{price}</h3>
              {isAssured && (
                <ShieldCheck className="h-6 w-6 text-brand-black mb-1" strokeWidth={1.5} />
              )}
            </div>
            
            {(originalPrice && originalPrice !== "$0" && originalPrice !== price) && (
              <div className="flex items-center gap-3 justify-start md:justify-end text-sm">
                <span className="text-brand-gray line-through">
                  {originalPrice}
                </span>
                <span className="text-brand-black font-semibold">{discount} Off</span>
              </div>
            )}
            
            <div className="mt-6 w-full md:w-auto">
              <LocalizedClientLink href={productUrl}>
                <Button className="w-full md:w-auto px-8 py-5 text-xs font-bold uppercase tracking-widest bg-brand-black hover:bg-brand-black transition-colors">
                  COMPRAR AHORA
                </Button>
              </LocalizedClientLink>
            </div>
            <p className="text-xs font-medium text-brand-gray mt-2 flex items-center justify-start md:justify-end gap-1">
              <ShieldCheck className="h-3 w-3" /> Transacción Segura
            </p>
          </div>
        </div>
      </motion.div>
    );
  }
);

ProductCard.displayName = "ProductCard";

export { ProductCard };
