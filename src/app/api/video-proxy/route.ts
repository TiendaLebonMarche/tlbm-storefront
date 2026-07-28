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
        "Referer": "https://www.amazon.com/",
      },
    })

    if (!videoResp.ok) {
      return new NextResponse("Failed to fetch video", { status: 502 })
    }

    // Get the video data as a blob/array buffer
    const videoBuffer = await videoResp.arrayBuffer()
    
    // Return with proper headers for browser playback
    return new NextResponse(videoBuffer, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Length": videoBuffer.byteLength.toString(),
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=86400",
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (error) {
    console.error("[Video Proxy] Error:", error)
    return new NextResponse("Video proxy error", { status: 500 })
  }
}
