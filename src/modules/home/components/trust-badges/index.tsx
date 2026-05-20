"use client"

import React from "react"
import Reveal from "@modules/common/components/reveal"

const TrustBadges = () => {
  const badges = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 md:w-12 md:h-12">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Cazadores de Ofertas",
      description: "Miles de bots rastreando precios globales 24/7.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 md:w-12 md:h-12">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Directo a Bucaramanga",
      description: "Traemos los productos más exóticos a tu puerta.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 md:w-12 md:h-12">
          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Exclusivo & Auténtico",
      description: "Cada pieza verificada por expertos en calidad.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 md:w-12 md:h-12">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Despacho Fast-Track",
      description: "Tecnología logística para entregas en tiempo récord.",
    },
  ]

  return (
    <section className="w-full bg-white py-12 md:py-16 border-b border-gray-100">
      <div className="content-container px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          {badges.map((badge, idx) => (
            <Reveal key={idx} delay={idx * 150} className="flex flex-col items-center text-center group px-4">
              <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-gray-50 text-black mb-8 transition-all duration-700 group-hover:bg-black group-hover:text-white group-hover:scale-110 shadow-sm border border-gray-100">
                {badge.icon}
              </div>
              <h3 className="font-sans font-bold text-xs md:text-sm uppercase tracking-[0.3em] text-gray-900 mb-4">
                {badge.title}
              </h3>
              <p className="text-xs md:text-base text-gray-500 leading-relaxed max-w-[280px] font-medium">
                {badge.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustBadges
