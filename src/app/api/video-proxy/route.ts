import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url")
  
  if (!url) {
    return new NextResponse("Missing url parameter", { status: 400 })
  }

  try {
    const videoResp = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "video/mp4,video/*;q=0.9,*/*;q=0.8",
      },
    })

    if (!videoResp.ok) {
      console.error("[Video Proxy] Fetch failed:", videoResp.status, url.slice(0, 60))
      return new NextResponse("Failed to fetch video", { status: 502 })
    }

    const contentType = videoResp.headers.get("content-type") || "video/mp4"
    const contentLength = videoResp.headers.get("content-length")

    // Stream the video instead of loading it all into memory
    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Expose-Headers": "Content-Length, Accept-Ranges",
    }

    if (contentLength) {
      headers["Content-Length"] = contentLength
    }

    return new NextResponse(videoResp.body, {
      headers,
    })
  } catch (error) {
    console.error("[Video Proxy] Error:", error)
    return new NextResponse("Video proxy error", { status: 500 })
  }
}
