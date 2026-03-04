import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-center text-center" data-testid="empty-cart-message">
      <h1 className="text-4xl md:text-5xl font-serif text-brand-black mb-6 italic">
        Tu Bolsa está vacía
      </h1>
      <Text className="text-sm md:text-base text-gray-500 mt-4 mb-10 max-w-[30rem] leading-loose uppercase tracking-widest font-medium">
        Parece que aún no has descubierto lo exótico. Explora nuestra curaduría luxury y encuentra piezas únicas para ti.
      </Text>
      <div>
        <InteractiveLink href="/store" className="text-brand-gold hover:text-brand-black transition-colors font-bold uppercase tracking-[0.3em] text-xs">
          Explorar el Catálogo
        </InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
