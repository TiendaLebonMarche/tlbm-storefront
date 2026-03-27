"use client"

import { useScrollThreshold } from "@lib/hooks/use-scroll-threshold"

export default function ClientHeader({ children }: { children: React.ReactNode }) {
    const isScrolled = useScrollThreshold(10)

    return (
        <>
            <div id="top-bar" className="bg-white text-black border-b border-black/10 text-[10px] md:text-xs tracking-[0.2em] py-2 flex justify-center uppercase font-sans">
                <span>ENVIOS NACIONALES DESDE BUCARAMANGA • WHATSAPP: +57 302 756 7783</span>
            </div>

            <header
                id="main-header"
                data-scrolled={isScrolled}
                className={`group w-full z-[60] transition-all duration-300 sticky top-0 bg-white ${
                    isScrolled ? "border-b border-black/10" : ""
                }`}
            >
                <div className="max-w-[95rem] mx-auto px-4 md:px-8 lg:px-12 flex justify-between items-center py-4 md:py-5 text-black nav-container">
                    {children}
                </div>
            </header>
        </>
    )
}

