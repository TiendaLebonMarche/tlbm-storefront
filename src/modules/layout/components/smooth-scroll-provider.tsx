"use client"

import dynamic from "next/dynamic"

// Importación dinámica para evitar problemas de SSR con Lenis
const LenisProvider = dynamic(() => import("./lenis-inner"), {
  ssr: false,
})

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <LenisProvider>{children}</LenisProvider>
}
