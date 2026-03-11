import { useState, useEffect } from "react"

/**
 * Hook to detect if the window has been scrolled past a certain threshold.
 * Uses requestAnimationFrame for performance optimization.
 * 
 * @param threshold - The number of pixels to scroll before triggering
 * @returns boolean - True if scrolled past threshold
 */
export const useScrollThreshold = (threshold: number = 100) => {
    const [isScrolled, setIsScrolled] = useState(false)

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

        // Initial check
        setIsScrolled(window.scrollY > threshold)

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [threshold])

    return isScrolled
}
