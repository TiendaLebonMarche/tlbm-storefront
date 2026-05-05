import { getBaseURL } from '@lib/util/env'
import { blogPosts } from '@lib/data/blog'

const BASE_URL = "https://www.tiendalebonmarche.com"

export async function GET() {
  const baseUrl = getBaseURL()

  const rssItems = blogPosts.map((post) => {
    const postUrl = `${baseUrl}/co/blog/${post.handle}`
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.title} — Le Bon Marché Blog. Tendencias, lifestyle y selección editorial exclusiva.]]></description>
      <category><![CDATA[${post.tag || 'Lifestyle'}]]></category>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>`
  }).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
>
  <channel>
    <title>Blog Le Bon Marché — Bucaramanga, Colombia</title>
    <link>${baseUrl}/co/blog</link>
    <description>Lifestyle, tendencias y selección editorial exclusiva de Tienda Le Bon Marché. Boutique virtual en Bucaramanga con envíos a toda Colombia.</description>
    <language>es-co</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>hola@tiendalebonmarche.com (Tienda Le Bon Marché)</managingEditor>
    <webMaster>hola@tiendalebonmarche.com (Tienda Le Bon Marché)</webMaster>
    <image>
      <url>${BASE_URL}/logo.png</url>
      <title>Tienda Le Bon Marché</title>
      <link>${baseUrl}/co</link>
    </image>
    <category>Shopping</category>
    <category>Lifestyle</category>
    <category>Colombia</category>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
