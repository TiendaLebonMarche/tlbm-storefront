import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url")
  
  if (!url) {
    return new NextResponse("Missing url parameter", { status: 400 })
  }

  try {
    // ⚠️ FIX (05-ago): reenviar el header Range del navegador a la fuente.
    // Sin esto el proxy respondía 200 con el archivo completo (18MB) en vez de
    // 206 parcial → el <video> no podía hacer streaming → timeout 10s →
    // "El video no pudo cargarse".
    const rangeHeader = req.headers.get("range")
    const fetchHeaders: Record<string, string> = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "Accept": "video/mp4,video/*;q=0.9,*/*;q=0.8",
    }
    if (rangeHeader) {
      fetchHeaders["Range"] = rangeHeader
    }

    const videoResp = await fetch(url, { headers: fetchHeaders })

    if (!videoResp.ok && videoResp.status !== 206) {
      console.error("[Video Proxy] Fetch failed:", videoResp.status, url.slice(0, 60))
      return new NextResponse("Failed to fetch video", { status: 502 })
    }

    const contentType = videoResp.headers.get("content-type") || "video/mp4"
    const contentLength = videoResp.headers.get("content-length")
    const contentRange = videoResp.headers.get("content-range")

    // Stream the video instead of loading it all into memory
    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Expose-Headers": "Content-Length, Content-Range, Accept-Ranges",
    }

    if (contentLength) {
      headers["Content-Length"] = contentLength
    }
    if (contentRange) {
      headers["Content-Range"] = contentRange
    }

    // 206 cuando la fuente respondió 206 (request con Range) — necesario para el streaming del <video>
    return new NextResponse(videoResp.body, {
      status: videoResp.status,
      headers,
    })
  } catch (error) {
    console.error("[Video Proxy] Error:", error)
    return new NextResponse("Video proxy error", { status: 500 })
  }
}
