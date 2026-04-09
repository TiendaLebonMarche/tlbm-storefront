"use client"

import { useScrollThreshold } from "@lib/hooks/use-scroll-threshold"
import { usePathname } from "next/navigation"

export default function ClientHeader({ children }: { children: React.ReactNode }) {
    const isScrolled = useScrollThreshold(10)
    const pathname = usePathname()
    
    // Identifica si estamos en el Home (incluyendo versiones internacionales /en /es)
    const isHome = pathname === "/" || /^\/[a-zA-Z-]{2,5}\/?$/.test(pathname || "")

    return (
        <div className={`fixed top-0 left-0 w-full z-[100] text-black bg-white/50 backdrop-blur-sm border-b border-gray-100/10`}>
            {/* Top Bar (Always Visible) */}
            <div id="top-bar" className="bg-black text-white text-[9px] md:text-[11px] border-b border-white/10 tracking-[0.2em] py-3.5 overflow-hidden font-sans relative z-[101] uppercase font-black">
                <div className="flex whitespace-nowrap animate-marquee">
                    <span className="mx-4">Envíos a todo Bucaramanga — Productos originales y exclusivos.</span>
                    <span className="mx-4">Envíos a todo Bucaramanga — Productos originales y exclusivos.</span>
                    <span className="mx-4">Envíos a todo Bucaramanga — Productos originales y exclusivos.</span>
                    <span className="mx-4">Envíos a todo Bucaramanga — Productos originales y exclusivos.</span>
                </div>
            </div>

            <style jsx>{`
                .animate-marquee {
                    display: inline-flex;
                    animation: marquee 30s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>

            <header
                id="main-header"
                className={`mx-auto w-full`}
            >
                <div className="max-w-[95rem] mx-auto px-4 md:px-10 flex justify-between items-center py-2">
                    {children}
                </div>
            </header>
        </div>
    )
}


