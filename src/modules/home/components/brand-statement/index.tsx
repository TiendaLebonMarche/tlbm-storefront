"use client"

import React from 'react'
import TextBlockAnimation from "@/components/ui/text-block-animation"

const BrandStatement = () => {
  return (
    <section className="w-full bg-[#F2F2E1] py-20 md:py-28 flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="max-w-5xl w-full text-center">
        <TextBlockAnimation
          blockColor="#363030" // brand-brown
          animateOnScroll={true}
          delay={0.1}
          duration={0.8}
        >
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-sans font-black tracking-tighter leading-[0.9] text-brand-brown uppercase">
            LA MEJOR TIENDA VIRTUAL<br />
            <span className="inline-block bg-brand-brown text-[#F2F2E1] px-5 py-2 rounded-sm mt-4">
              (EN BUCARAMANGA.)
            </span>
          </h2>
        </TextBlockAnimation>
      </div>
    </section>
  )
}

export default BrandStatement
