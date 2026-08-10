import { useState, useEffect } from "react"

/**
 * Hook to detect if the window has been scrolled past a certain threshold.
 * Uses requestAnimationFrame for performance optimization.
 * 
 * @param threshold - The number of pixels to scroll before triggering
 * @returns boolean - True if scrolled past threshold
 */
export const useScrollThreshold = (threshold: number = 100) => {
    // Lazy initializer: check inicial del scroll una sola vez (en vez de
    // setState en effect — React 19). Guard SSR (window no existe en server).
    const [isScrolled, setIsScrolled] = useState(
        () => typeof window !== "undefined" && window.scrollY > threshold
    )

    useEffect(() => {
        let ticking = false

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > threshold)
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [threshold])

    return isScrolled
}
