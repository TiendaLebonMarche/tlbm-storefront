"use client"

import { useScrollThreshold } from "@lib/hooks/use-scroll-threshold"
import { usePathname } from "next/navigation"

export default function ClientHeader({ children }: { children: React.ReactNode }) {
    const isScrolled = useScrollThreshold(10)
    const pathname = usePathname()
    
    // Identifica si estamos en el Home (incluyendo versiones internacionales /en /es)
    const isHome = pathname === "/" || /^\/[a-zA-Z-]{2,5}\/?$/.test(pathname || "")

    return (
        <div className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${(isScrolled || !isHome) ? 'text-brand-brown bg-white/70 backdrop-blur-md border-b border-gray-100/50' : 'text-white bg-transparent'}`}>
            {/* Top Bar (Always Visible) */}
            <div id="top-bar" className="bg-white/40 text-brand-brown text-[8px] md:text-[10px] border-b border-gray-100/50 tracking-[0.3em] py-3 overflow-hidden font-sans relative z-[101] text-center uppercase transition-all duration-300 font-bold">
                <span>Envios a todo Bucaramanga - Productos originales y exclusivos.</span>
            </div>

            <header
                id="main-header"
                className={`mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-full`}
            >
                <div className="max-w-[95rem] mx-auto px-4 md:px-10 flex justify-between items-center py-2 transition-colors">
                    {children}
                </div>
            </header>
        </div>
    )
}


