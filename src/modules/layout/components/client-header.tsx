"use client"

import { useScrollThreshold } from "@lib/hooks/use-scroll-threshold"

export default function ClientHeader({ children }: { children: React.ReactNode }) {
    const isScrolled = useScrollThreshold(10)

    return (
        <div className="fixed top-0 left-0 w-full z-[100] transition-all duration-500 transform animate-fade-in-top">
            {/* Top Banner (Hidden or simplified if needed, keeping for info) */}
            <div id="top-bar" className={`bg-transparent text-brand-brown/40 border-none text-[8px] md:text-[9px] tracking-[0.4em] py-3 overflow-hidden font-sans relative z-[101] text-center uppercase ${isScrolled ? 'opacity-0 h-0 p-0' : 'opacity-100'} transition-all duration-300`}>
                <span>Envío gratis por tu primera compra +100k</span>
            </div>

            <header
                id="main-header"
                className={`mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white ${
                    isScrolled 
                    ? "w-[95%] md:w-[90%] lg:w-[85%] mt-2 rounded-2xl shadow-xl border border-gray-100 py-3" 
                    : "w-full md:w-[98%] mt-4 rounded-3xl shadow-lg border border-gray-100/50 py-5"
                }`}
            >
                <div className="max-w-[95rem] mx-auto px-6 md:px-10 flex justify-between items-center transition-all duration-500">
                    {children}
                </div>
            </header>
        </div>
    )
}

