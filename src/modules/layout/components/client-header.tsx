"use client"

import { useScrollThreshold } from "@lib/hooks/use-scroll-threshold"

export default function ClientHeader({ children }: { children: React.ReactNode }) {
    const isScrolled = useScrollThreshold(10)

    return (
        <div className="fixed top-0 left-0 w-full z-[100] transition-all duration-500 transform">
            {/* Top Bar (Always Visible) */}
            <div id="top-bar" className="bg-transparent text-brand-brown/50 text-[8px] md:text-[9px] tracking-[0.4em] py-3 overflow-hidden font-sans relative z-[101] text-center uppercase transition-all duration-300">
                <span>Envío gratis por tu primera compra +100k</span>
            </div>

            <header
                id="main-header"
                className={`mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] bg-transparent w-full`}
            >
                <div className="max-w-[95rem] mx-auto px-4 md:px-10 flex justify-between items-center py-2">
                    {children}
                </div>
            </header>
        </div>
    )
}

