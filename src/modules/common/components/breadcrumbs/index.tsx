import Link from "next/link"
import { Fragment } from "react"

export type BreadcrumbItem = {
  label: string
  href?: string
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-brand-gray">
        <li>
          <Link href="/co" className="transition-colors hover:text-brand-navy">
            Inicio
          </Link>
        </li>
        {items.map((item, i) => (
          <Fragment key={i}>
            <span className="mx-1 text-brand-gray-light" aria-hidden="true">
              /
            </span>
            <li>
              {item.href ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-brand-navy"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-brand-navy font-medium" aria-current="page">
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
