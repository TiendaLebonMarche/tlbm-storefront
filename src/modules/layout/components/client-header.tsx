"use client"

import { useScrollThreshold } from "@lib/hooks/use-scroll-threshold"

export default function ClientHeader({ children }: { children: React.ReactNode }) {
    const isScrolled = useScrollThreshold(10)

    return (
        <>
            {/* Top Banner (Marquee on Desktop / Static on Mobile) */}
            <div id="top-bar" className="bg-[#f2f2f2] text-black border-b border-black/10 text-[9px] md:text-[10px] tracking-widest py-2 md:py-2.5 overflow-hidden font-sans relative z-50">
                <div className="flex md:hidden justify-center items-center w-full uppercase px-4 text-center">
                    <span>ENVÍOS A TODA COLOMBIA | GARANTÍA LEY 1480</span>
                </div>
                
                {/* Desktop Marquee */}
                <div className="hidden md:flex whitespace-nowrap overflow-hidden items-center justify-around uppercase w-full">
                    <span>NUEVOS CLIENTES OBTIENEN ENVÍO GRATIS EN &gt;$100.000 — NUEVOS CLIENTES OBTIENEN ENVÍO GRATIS EN &gt;$100.000 — NUEVOS CLIENTES OBTIENEN ENVÍO GRATIS EN &gt;$100.000 — NUEVOS CLIENTES OBTIENEN ENVÍO GRATIS EN &gt;$100.000</span>
                </div>
            </div>

            <header
                id="main-header"
                data-scrolled={isScrolled}
                className={`group w-full z-[60] transition-all duration-300 sticky top-0 bg-white ${
                    isScrolled ? "border-b border-black/10 shadow-sm" : "border-b border-black/5"
                }`}
            >
                <div className="max-w-[95rem] mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center py-4 text-black nav-container">
                    {children}
                </div>
            </header>
        </>
    )
}

