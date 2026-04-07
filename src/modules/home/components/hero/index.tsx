"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Smooth springs for buttery motion
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const xSpring = useSpring(0, springConfig)
  const ySpring = useSpring(0, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      // Normalize to -0.5 to 0.5
      const x = (clientX / innerWidth) - 0.5
      const y = (clientY / innerHeight) - 0.5
      xSpring.set(x * 40) // Intesity of mouse move
      ySpring.set(y * 40)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [xSpring, ySpring])

  // Scroll parallax for KAWS
  const kawsTranslateY = useTransform(scrollY, [0, 800], [0, 150])
  
  // Footer text opacity
  const footerOpacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100vh] min-h-[700px] flex flex-col items-center justify-between overflow-hidden bg-[#F2F2E1] font-sans"
    >
      {/* Texture Layer */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply z-0">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* 1. TOP SECTION (Texts) */}
      <div className="relative z-30 w-full px-6 md:px-12 pt-32 md:pt-40 grid grid-cols-1 md:grid-cols-2 gap-8 items-start select-none">
        {/* Left: Serif Phrases */}
        <div className="flex flex-col gap-4 max-w-sm">
          <span className="font-serif italic text-gray-500 text-sm md:text-base leading-relaxed tracking-wide reveal-up">
            Where Art Meets Fashion,<br />Every Piece a Masterpiece. ———
          </span>
          <div className="flex items-center gap-4 reveal-up delay-100">
             <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-[10px] uppercase font-bold text-gray-400">
               R
             </div>
             <p className="font-serif text-[10px] md:text-xs text-gray-400 max-w-[120px]">
               Award Winning Curated Selection.
             </p>
          </div>
        </div>

        {/* Right: Neon KAWS Header */}
        <div className="flex flex-col md:items-end text-left md:text-right">
          <h1 className="text-[#A6FF00] font-sans font-black text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter uppercase reveal-right">
            KAWS COLLECTION,<br />
            BREAKING THE MOLD OF<br />
            ORDINARY FASHION.
          </h1>
          <p className="mt-6 md:mt-10 font-sans text-xs md:text-sm text-gray-600 max-w-sm md:ml-auto leading-relaxed reveal-right delay-200">
            This is a rare collection, limited release. A niche product that emerged after our latest curation, 
            we recommend checking the official collection pages for availability.
          </p>
        </div>
      </div>

      {/* 2. CENTER SECTION (KAWS CHARACTER) */}
      <div className="absolute inset-x-0 bottom-10 md:bottom-0 h-full flex items-center justify-center z-10 pointer-events-none">
        <motion.div
           style={{
             x: xSpring,
             y: ySpring,
             translateY: kawsTranslateY,
           }}
           className="relative h-[65%] w-full max-w-4xl flex items-center justify-center pt-20"
        >
          <div className="relative w-full h-full">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/593f66311e5b6c8a74e2d31c/1518063065406-V5A42I2YI8S759F7Z757/KAWS.png" 
              alt="KAWS Companion Black"
              fill
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* 3. SIDE SCROLL INDICATOR */}
      <div className="absolute right-6 bottom-40 z-30 hidden lg:flex flex-col items-center gap-4 mix-blend-difference text-white">
        <span className="rotate-90 origin-center translate-y-6 text-[10px] uppercase tracking-widest font-bold">Scroll Down</span>
        <div className="w-px h-20 bg-white/30" />
      </div>

      {/* 4. FOOTER METADATA */}
      <motion.div 
        style={{ opacity: footerOpacity }}
        className="relative z-30 w-full px-6 md:px-12 py-10 bg-brand-brown text-white grid grid-cols-2 md:grid-cols-4 gap-6 items-end select-none"
      >
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-[#A6FF00] font-bold mb-1">Title —</span>
          <span className="font-sans font-bold text-lg">KAWS COMPANION</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-[#A6FF00] font-bold mb-1">Date —</span>
          <span className="font-sans font-bold text-lg">07.04.2024</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-[#A6FF00] font-bold mb-1">Time —</span>
          <span className="font-sans font-bold text-lg">11:30 GMT-5</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-[#A6FF00] font-bold mb-1">Theme —</span>
          <span className="font-sans font-bold text-lg uppercase">Exotic Selection</span>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .reveal-up { opacity: 0; animation: revealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .reveal-right { opacity: 0; animation: revealRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
      `}</style>
    </section>
  )
}

export default Hero
