"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

/**
 * Renderizador de markdown con estilos TLBM para las guías del blog.
 * Server component friendly — react-markdown funciona en ambos.
 */
export default function GuideMarkdown({ content }: { content: string }) {
  return (
    <div className="guide-content prose prose-lg max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-strong:text-gray-900 dark:prose-strong:text-white prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-blockquote:border-gold prose-blockquote:bg-white dark:prose-blockquote:bg-card prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-ul:list-disc prose-ol:list-decimal prose-table:text-sm prose-th:bg-ink prose-th:text-white prose-th:font-semibold prose-th:px-4 prose-th:py-2.5 prose-td:px-4 prose-td:py-2.5 prose-td:border-b prose-td:border-gray-100 dark:prose-td:border-white/5 prose-tr:even:bg-white dark:prose-tr:even:bg-white/5 prose-h2:mt-10 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-3 prose-hr:border-gray-200 dark:prose-hr:border-white/10">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
