import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { blogPosts } from "@lib/data/blog"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { sanitizeHtml } from "@lib/util/sanitize"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const post = blogPosts.find((p) => p.handle === handle)

  if (!post) {
    return {
      title: "Noticia no encontrada",
    }
  }

  return {
    title: `${post.title} | Journal Le Bon Marché`,
    description: post.description,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const post = blogPosts.find((p) => p.handle === handle)

  if (!post) {
    notFound()
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Article Header */}
      <header className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-brand-black">
        {/* Background Image with Blur & Dark Overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src={post.img}
            fill
            priority
            className="object-cover blur-[10px] scale-110"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-brand-black/40 to-white" />
        </div>

        <div className="content-container max-w-5xl px-4 relative z-10">
          <div className="flex flex-col items-center text-center space-y-10">
            <div className="flex items-center gap-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-black bg-white/5 backdrop-blur-md px-4 py-2 border border-white/10">
                {post.tag}
              </span>
              <span className="w-2 h-2 rounded-full bg-brand-black shadow-[0_0_10px_rgba(196,164,132,0.5)]" />
              <time className="text-[11px] text-white/70 font-bold uppercase tracking-[0.4em]">
                {post.date}
              </time>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white italic leading-[0.9] drop-shadow-2xl">
              {post.title.split(':').map((part, i) => (
                <span key={i} className={i === 1 ? "not-italic block mt-4 text-brand-black text-4xl md:text-6xl tracking-tight" : ""}>
                  {part}{i === 0 && post.title.includes(':') ? ':' : ''}
                </span>
              ))}
            </h1>
            
            <p className="max-w-2xl text-xl md:text-3xl text-white/90 font-light leading-relaxed italic border-l-2 border-brand-black/30 pl-8">
              {post.description}
            </p>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <section className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-gray-100">
        <Image
          src={post.img}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          alt={post.title}
        />
      </section>

      {/* Article Content */}
      <main className="py-24 md:py-32">
        <div className="content-container max-w-3xl px-4">
          <div 
            className="prose prose-lg prose-gray max-w-none 
              prose-headings:font-serif prose-headings:italic prose-headings:text-brand-black
              prose-p:text-brand-gray prose-p:leading-loose prose-p:font-light
              prose-strong:text-brand-black prose-strong:font-bold
              prose-blockquote:border-l-brand-gold prose-blockquote:italic
              prose-img:rounded-sm shadow-sm"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
          />

          {/* Share & Back Link */}
          <footer className="mt-24 pt-12 border-t border-brand-gray-light flex flex-col md:flex-row justify-between items-center gap-8">
            <LocalizedClientLink 
              href="/blog" 
              className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-black"
            >
              <div className="w-8 h-[1px] bg-brand-black group-hover:w-12 transition-all"></div>
              <span>Volver al Journal</span>
            </LocalizedClientLink>

            <div className="flex items-center gap-8">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-gray">Compartir</span>
              <div className="flex gap-6">
                 {/* Icons or links could go here */}
                 <span className="text-[11px] font-bold uppercase tracking-widest cursor-pointer hover:text-brand-black transition-colors">FB</span>
                 <span className="text-[11px] font-bold uppercase tracking-widest cursor-pointer hover:text-brand-black transition-colors">IG</span>
                 <span className="text-[11px] font-bold uppercase tracking-widest cursor-pointer hover:text-brand-black transition-colors">TW</span>
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* Related Posts section (optional, keeping it clean for now) */}
    </div>
  )
}
