"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Maximize2, Volume2, VolumeX, AlertTriangle, RefreshCw } from "lucide-react"

type ProductVideoProps = {
  videoUrl: string
  title?: string
}

export default function ProductVideo({ videoUrl, title }: ProductVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Cargar el video después del mount (lazy) usando proxy
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Usar proxy para evitar bloqueos de CORS/códec
    const proxyUrl = `/api/video-proxy?url=${encodeURIComponent(videoUrl)}`
    video.src = proxyUrl
    video.load()
    setIsLoading(true)
    setHasError(false)
    
    const onCanPlay = () => {
      setIsLoading(false)
      setHasError(false)
    }
    const onError = () => {
      setIsLoading(false)
      setHasError(true)
    }
    
    video.addEventListener("canplay", onCanPlay)
    video.addEventListener("error", onError)
    
    // Timeout: si después de 10s no carga, mostrar error
    const timeout = setTimeout(() => {
      if (video.readyState < 2) {
        setHasError(true)
        setIsLoading(false)
      }
    }, 10000)
    
    return () => {
      video.removeEventListener("canplay", onCanPlay)
      video.removeEventListener("error", onError)
      clearTimeout(timeout)
    }
  }, [videoUrl, retryCount])

  const togglePlay = () => {
    if (!videoRef.current || hasError) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play().catch(() => setHasError(true))
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = async () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation()
    setRetryCount((c) => c + 1)
    setIsPlaying(false)
    setHasError(false)
    setIsLoading(true)
  }

  return (
    <section className="w-full bg-white dark:bg-[#0A0A0F] py-16 lg:py-20">
      <div className="content-container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[9px] uppercase tracking-[0.5em] text-brand-black/40 dark:text-white/40 font-sans mb-4">
              Video del producto
            </p>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-brand-black dark:text-white leading-tight">
              Mira el producto en acción
            </h3>
          </div>

          <div
            ref={containerRef}
            className={`relative group bg-[#0A0A0F] overflow-hidden aspect-video cursor-pointer rounded-sm ${hasError ? '' : ''}`}
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-contain mx-auto"
              playsInline
              preload="none"
              muted={isMuted}
              onEnded={() => setIsPlaying(false)}
              onError={() => { setHasError(true); setIsLoading(false); }}
            />

            {/* Loading spinner */}
            {isLoading && !hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-12 h-12 border-2 border-white/20 border-t-[#D4AF37] rounded-full animate-spin" />
              </div>
            )}

            {/* Error state */}
            {hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 gap-4">
                <AlertTriangle className="w-10 h-10 text-[#D4AF37]/60" />
                <p className="text-white/60 text-sm text-center max-w-xs">
                  El video no pudo cargarse. Puede deberse a restricciones de la fuente.
                </p>
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-2 px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 transition-all duration-300"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reintentar
                </button>
              </div>
            )}

            {/* Play overlay */}
            {!isPlaying && !hasError && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-opacity duration-300">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                </div>
              </div>
            )}

            {/* Controls */}
            {!hasError && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                      className="text-white hover:text-[#D4AF37] transition-colors"
                      aria-label={isPlaying ? "Pausar" : "Reproducir"}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" fill="white" />}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                      className="text-white/70 hover:text-white transition-colors"
                      aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    {title && (
                      <span className="text-white/50 text-xs font-medium truncate max-w-[200px] hidden sm:block">
                        {title}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                    className="text-white/70 hover:text-white transition-colors"
                    aria-label="Pantalla completa"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="text-center text-[11px] text-brand-gray/60 dark:text-white/30 mt-4 font-light tracking-wide">
            Video demostrativo del producto — La experiencia visual puede variar ligeramente del producto final
          </p>
        </div>
      </div>
    </section>
  )
}
