import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="bg-brand-black text-white pt-20 pb-10 px-6 mt-auto">
      <div className="max-w-[95rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div>
          <h3 className="font-serif text-2xl mb-6 text-white">Le Bon Marché</h3>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Rastreamos los productos más exóticos. Gadgets importados a los mejores precios.
          </p>
          <div className="flex gap-4 text-xs font-bold tracking-widest text-gray-400">
            <a href="https://instagram.com/tiendalebonmarche" className="hover:text-white transition" target="_blank" rel="noreferrer">IG</a>
            <a href="#" className="hover:text-white transition">FB</a>
            <a href="#" className="hover:text-white transition">TK</a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-brand-gold">TIENDA</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            {collections && collections.length > 0 ? (
              collections.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <LocalizedClientLink className="hover:text-white transition" href={`/collections/${c.handle}`}>
                    {c.title}
                  </LocalizedClientLink>
                </li>
              ))
            ) : (
              <>
                <li><LocalizedClientLink href="/store" className="hover:text-white transition">Catálogo</LocalizedClientLink></li>
                <li><LocalizedClientLink href="/store" className="hover:text-white transition">Nuevos</LocalizedClientLink></li>
              </>
            )}
            <li><LocalizedClientLink href="/store" className="hover:text-white transition">Ver todo el Catálogo</LocalizedClientLink></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-brand-gold">AYUDA</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition">Garantías</a></li>
            <li><a href="#" className="hover:text-white transition">Envíos</a></li>
            <li><a href="#" className="hover:text-white transition">Devoluciones</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-brand-gold">CONTACTO</h4>
          <a href="https://wa.me/573027567783" className="text-2xl font-serif text-white hover:text-brand-gold transition block mb-2" target="_blank" rel="noreferrer">
            +57 302 756 7783
          </a>
        </div>
      </div>

      <div className="max-w-[95rem] mx-auto border-t border-gray-800 pt-8 text-center text-xs text-gray-600">
        <p>&copy; {new Date().getFullYear()} Tienda Le Bon Marché. Medusa Storefront.</p>
      </div>
    </footer>
  )
}
