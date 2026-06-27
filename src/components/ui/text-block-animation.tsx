"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TextBlockAnimationProps {
  children: React.ReactNode
  animateOnScroll?: boolean
  delay?: number
  blockColor?: string
  stagger?: number
  duration?: number
}

export default function TextBlockAnimation({
  children,
  animateOnScroll = true,
  delay = 0,
  blockColor = "#000",
  stagger = 0.1,
  duration = 0.6,
}: TextBlockAnimationProps) {
  return (
    <motion.div
      className="relative"
      initial={animateOnScroll ? { opacity: 0, y: 20 } : false}
      whileInView={animateOnScroll ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  )
}
