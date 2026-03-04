"use client"

import React, { useEffect, useState } from "react"

export default function ClientHeader({ children }: { children: React.ReactNode }) {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <div id="top-bar" className="bg-brand-black text-white text-[10px] md:text-xs tracking-[0.2em] uppercase overflow-hidden py-3 relative z-50">
                <div className="animate-marquee whitespace-nowrap inline-block">
                    <span className="mx-8">✨ Envíos a todo el territorio nacional</span> •
                    <span className="mx-8">WhatsApp: +57 302 756 7783</span> •
                    <span className="mx-8">Garantía Ley 1480</span> •
                    <span className="mx-8">✨ Productos Luxury y Exóticos</span>
                </div>
            </div>

            <header
                id="main-header"
                data-scrolled={isScrolled}
                className={`group w-full z-40 transition-all duration-300 ${isScrolled
                        ? "fixed top-0 header-scrolled"
                        : "absolute py-6 bg-transparent"
                    }`}
                style={{ top: isScrolled ? "0" : "40px" }}
            >
                <div className="max-w-[95rem] mx-auto px-6 md:px-12 flex justify-between items-center text-white group-data-[scrolled=true]:text-brand-black nav-container">
                    {children}
                </div>
            </header>
        </>
    )
}
