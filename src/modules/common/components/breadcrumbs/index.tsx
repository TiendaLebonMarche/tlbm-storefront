import Link from "next/link"
import { Fragment } from "react"

export type BreadcrumbItem = {
  label: string
  href?: string
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {items.map((item, i) => (
          <Fragment key={i}>
            {i > 0 && (
              <span className="mx-1 text-brand-gray-light" aria-hidden="true">
                /
              </span>
            )}
            <li>
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-brand-gray transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-brand-black font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}
