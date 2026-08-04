import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = () => {
  return (
    <div className="mt-6">
      <Heading className="text-base-semi">¿Necesitas ayuda?</Heading>
      <div className="text-base-regular my-2">
        <ul className="gap-y-2 flex flex-col">
          <li>
            <a href="https://wa.me/573027567783" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
              Contáctanos por WhatsApp
            </a>
          </li>
          <li>
            <a href="https://wa.me/573027567783" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
              Cambios y Devoluciones
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
