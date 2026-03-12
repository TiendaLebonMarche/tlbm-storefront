import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { blogPosts } from "@lib/data/blog"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

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
      <header className="pt-24 pb-16 md:pt-32 md:pb-24 border-b border-gray-50">
        <div className="content-container max-w-4xl px-4">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">
                {post.tag}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
              <time className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">
                {post.date}
              </time>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-brand-black italic leading-[1.1]">
              {post.title}
            </h1>
            
            <p className="max-w-2xl text-xl md:text-2xl text-gray-500 font-light leading-relaxed italic">
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
              prose-p:text-gray-600 prose-p:leading-loose prose-p:font-light
              prose-strong:text-brand-black prose-strong:font-bold
              prose-blockquote:border-l-brand-gold prose-blockquote:italic
              prose-img:rounded-sm shadow-sm"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share & Back Link */}
          <footer className="mt-24 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <LocalizedClientLink 
              href="/blog" 
              className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-black"
            >
              <div className="w-8 h-[1px] bg-brand-gold group-hover:w-12 transition-all"></div>
              <span>Volver al Journal</span>
            </LocalizedClientLink>

            <div className="flex items-center gap-8">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">Compartir</span>
              <div className="flex gap-6">
                 {/* Icons or links could go here */}
                 <span className="text-[11px] font-bold uppercase tracking-widest cursor-pointer hover:text-brand-gold transition-colors">FB</span>
                 <span className="text-[11px] font-bold uppercase tracking-widest cursor-pointer hover:text-brand-gold transition-colors">IG</span>
                 <span className="text-[11px] font-bold uppercase tracking-widest cursor-pointer hover:text-brand-gold transition-colors">TW</span>
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* Related Posts section (optional, keeping it clean for now) */}
    </div>
  )
}
