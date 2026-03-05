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
            <div id="top-bar" className="bg-brand-black/80 text-white text-[10px] md:text-xs tracking-[0.2em] uppercase overflow-hidden py-1 relative z-50" style={{fontWeight:400}}>
                <div className="whitespace-nowrap inline-block opacity-80 text-center w-full">
                    <span className="mx-4">Envíos a todo el país</span> •
                    <span className="mx-4">WhatsApp: +57 302 756 7783</span> •
                    <span className="mx-4">Garantía Ley 1480</span> •
                    <span className="mx-4">Luxury & Exóticos</span>
                </div>
            </div>

            <header
                id="main-header"
                data-scrolled={isScrolled}
                className={`group w-full z-[60] transition-all duration-300 sticky top-10 ${isScrolled
                        ? "header-scrolled shadow-md"
                        : "bg-brand-black"
                    }`}
            >
                <div className="max-w-[95rem] mx-auto px-6 md:px-12 flex justify-between items-center py-6 text-white group-data-[scrolled=true]:text-brand-black nav-container">
                    {children}
                </div>
            </header>
        </>
    )
}

