"use client"

import React, { useEffect, useState } from "react"

export default function ClientHeader({ children }: { children: React.ReactNode }) {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <div id="top-bar" className={`text-white text-[10px] md:text-xs tracking-[0.2em] uppercase overflow-hidden py-2 md:py-3 relative z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-gold text-brand-black' : 'bg-brand-black/90 text-white'}`} style={{fontWeight:400}}>
                <div className="overflow-hidden md:overflow-visible">
                    <div className={`flex justify-center gap-6 md:gap-8 flex-wrap ${isScrolled ? 'text-brand-black' : 'text-white/90 group-data-[scrolled=true]:text-brand-black'}`}>
                        <span className="mx-2 hover:opacity-100 opacity-90 transition-opacity">📦 Envíos a todo el país</span>
                        <span className="hidden md:inline mx-2 opacity-50">•</span>
                        <span className="mx-2 hover:opacity-100 opacity-90 transition-opacity">💬 WhatsApp: +57 302 756 7783</span>
                        <span className="hidden md:inline mx-2 opacity-50">•</span>
                        <span className="mx-2 hover:opacity-100 opacity-90 transition-opacity">🛡️ Garantía Ley 1480</span>
                    </div>
                </div>
            </div>

            <header
                id="main-header"
                data-scrolled={isScrolled}
                className={`group w-full z-[60] transition-all duration-300 sticky top-10 md:top-0 ${isScrolled
                        ? "bg-white shadow-lg"
                        : "bg-brand-black shadow-none"
                    }`}
            >
                <div className="max-w-[95rem] mx-auto px-4 md:px-8 lg:px-12 flex justify-between items-center py-4 md:py-5 text-white group-data-[scrolled=true]:text-brand-black nav-container">
                    {children}
                </div>
            </header>
        </>
    )
}

