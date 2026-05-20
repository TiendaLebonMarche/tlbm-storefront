"use client"

import React, { useRef, useState, useEffect } from "react"
import { useIntersection } from "@lib/hooks/use-in-view"

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

const Reveal: React.FC<RevealProps> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersection(ref, "0px")
  const [hasRevealed, setHasRevealed] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setHasRevealed(true)
    }
  }, [isVisible])

  return (
    <div
      ref={ref}
      className={`${hasRevealed ? "reveal-up" : "opacity-0"} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default Reveal
