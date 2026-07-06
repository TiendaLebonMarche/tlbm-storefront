"use client"

import { useState } from "react"

type CollapsibleDescriptionProps = {
  description: string
}

const CollapsibleDescription = ({ description }: CollapsibleDescriptionProps) => {
  const [descExpanded, setDescExpanded] = useState(false)
  const descLines = description.split('\n')
  const hasLongDesc = descLines.length > 3 || description.length > 200
  const displayDesc = descExpanded || !hasLongDesc
    ? description
    : descLines.slice(0, 2).join('\n') + (descLines.length > 2 ? '...' : '')

  return (
    <div>
      <div className="text-[clamp(0.875rem,2.5vw,1rem)] text-brand-gray font-light leading-relaxed font-sans max-w-xl">
        {displayDesc.includes('\n')
          ? displayDesc.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < displayDesc.split('\n').length - 1 && <br />}
              </span>
            ))
          : displayDesc}
      </div>
      {hasLongDesc && (
        <button
          onClick={() => setDescExpanded(!descExpanded)}
          className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-black/60 hover:text-brand-black transition-colors duration-200 min-h-[44px] inline-flex items-center"
        >
          {descExpanded ? (
            <>Mostrar menos <span className="ml-1.5">↑</span></>
          ) : (
            <>Leer descripción completa <span className="ml-1.5">↓</span></>
          )}
        </button>
      )}
    </div>
  )
}

export default CollapsibleDescription
