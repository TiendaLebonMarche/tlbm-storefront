"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=2600&auto=format&fit=crop",
    smallTitle: "Acústica de Precisión",
    title: "Sonido de <br /> <span className='italic font-light'>Alto Nivel.</span>",
    cta: "Ver Parlantes",
    href: "/store?category=parlantes"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2600&auto=format&fit=crop",
    smallTitle: "Piezas Únicas",
    title: "Productos <br /> <span className='italic font-light'>exclusivos y Exóticos.</span>",
    cta: "Explorar Colección",
    href: "/store?category=originales"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2600&auto=format&fit=crop",
    smallTitle: "Inteligencia Digital",
    title: "Miles de bots buscando <br /> <span className='italic font-light'>ofertas para ti ❤️</span>",
    cta: "Ver Ofertas",
    href: "/store?category=ofertas"
  }
]

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1))
    }, 10000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full h-[90vh] md:h-screen flex items-center justify-center overflow-hidden bg-brand-soft">
      {HERO_SLIDES.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          {/* Parallax Background Image with slow zoom and scroll parallax */}
          <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
            <Image
              src={slide.image}
              alt={slide.smallTitle}
              fill
              priority
              className={`object-cover transition-transform duration-[12000ms] ease-linear ${index === currentSlide ? "scale-110" : "scale-100"}`}
              style={{ 
                transformOrigin: 'center',
                transform: `translateY(${scrollY * 0.3}px) ${index === currentSlide ? "scale(1.1)" : "scale(1)"}`
              }}
            />
          </div>
          
          {/* Sophisticated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

          {/* Content Overlay */}
          <div className={`relative z-20 h-full flex items-start justify-start px-6 md:px-16 lg:px-24 pt-40 md:pt-64 lg:pt-80 content-container ${index === currentSlide ? "animate-fade-in-top" : ""}`}>
            <div 
              className="max-w-4xl text-white"
              style={{ transform: `translateY(${-scrollY * 0.15}px)` }}
            >
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] mb-6 block opacity-90 drop-shadow-sm">
                {slide.smallTitle}
              </span>

              <h1 
                className="text-6xl md:text-8xl lg:text-9xl font-sans font-bold mb-10 leading-none tracking-tight drop-shadow-lg"
                dangerouslySetInnerHTML={{ __html: slide.title }}
              />

              <div className="flex flex-col sm:flex-row items-start gap-4 mt-12">
                <LocalizedClientLink
                  href={slide.href}
                  className="px-10 py-5 bg-white text-brand-brown text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-brand-olive hover:text-white transition-all duration-500 rounded-sm shadow-2xl group"
                >
                  <span className="group-hover:tracking-[0.4em] transition-all">{slide.cta}</span>
                </LocalizedClientLink>
                
                <LocalizedClientLink
                  href="/store"
                  className="px-10 py-5 border border-white/40 bg-white/5 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-white hover:text-brand-brown transition-all duration-500 rounded-sm"
                >
                  Catálogo Completo
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Progress indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1 transition-all duration-500 ${i === currentSlide ? "w-12 bg-white" : "w-6 bg-white/30"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero

