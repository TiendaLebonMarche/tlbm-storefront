"use client"

import React, { useRef } from "react"
import { useIntersection } from "@lib/hooks/use-in-view"

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

const Reveal: React.FC<RevealProps> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersection(ref, "0px")

  return (
    <div
      ref={ref}
      className={`${isVisible ? "reveal-up" : "opacity-0"} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default Reveal
