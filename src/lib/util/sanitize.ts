/**
 * Sanitiza HTML permitiendo solo etiquetas seguras.
 * Previene XSS eliminando scripts, event handlers y atributos peligrosos.
 */

const ALLOWED_TAGS = [
  "p", "br", "strong", "b", "em", "i", "u", "s", "span", "div",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li", "dl", "dt", "dd",
  "a", "img", "figure", "figcaption",
  "blockquote", "cite", "q",
  "code", "pre", "kbd",
  "table", "thead", "tbody", "tr", "th", "td",
  "hr", "sub", "sup", "small",
  "section", "article", "header", "footer",
]

const ALLOWED_ATTRS = ["href", "target", "rel", "src", "alt", "class", "id", "width", "height", "loading"]

export function sanitizeHtml(html: string): string {
  if (!html) return ""

  // Remove script and style tags completely
  let cleaned = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/on\w+\s*=\s*"[^"]*"/gi, "")   // Remove on* attributes (onclick, etc.)
    .replace(/on\w+\s*=\s*'[^']*'/gi, "")   // Remove on* with single quotes
    .replace(/on\w+\s*=\s*[^\s>]+/gi, "")   // Remove on* without quotes
    .replace(/javascript\s*:/gi, "")        // Remove javascript: protocol
    .replace(/<[^>]*>/g, (tag) => {
      // Only allow safe tags
      const tagName = tag.match(/<\/?(\w+)/)?.[1]?.toLowerCase()
      if (!tagName || !ALLOWED_TAGS.includes(tagName)) {
        return tagName ? "" : tag // Keep text nodes, remove unknown tags
      }
      // Strip dangerous attributes
      return tag.replace(/\s[\w-]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?/g, (attr) => {
        const attrName = attr.split("=")[0]?.trim().toLowerCase()
        if (ALLOWED_ATTRS.includes(attrName!) || !attrName) return attr
        return ""
      })
    })

  return cleaned
}
