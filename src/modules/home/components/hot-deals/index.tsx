"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const HotDeals = () => {
  const deals = [
    {
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800",
      category: "Relojería",
      title: "Reloj de Lujo Suizo",
      oldPrice: "$450.000",
      newPrice: "$299.000",
      discount: "-34%",
      badge: "Limitado",
    },
    {
      image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=800",
      category: "Assouline",
      title: "Colección de Libros de Arte",
      oldPrice: "$380.000",
      newPrice: "$249.000",
      discount: "-34%",
      badge: "Oferta Flash",
    },
    {
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800",
      category: "Sonido",
      title: "Auriculares Premium Inalámbricos",
      oldPrice: "$320.000",
      newPrice: "$189.000",
      discount: "-41%",
      badge: "Top Ventas",
    },
    {
      image: "https://images.unsplash.com/photo-1493514789560-586cb221d11d?q=80&w=800",
      category: "Decoración",
      title: "Florero de Diseñador",
      oldPrice: "$220.000",
      newPrice: "$149.000",
      discount: "-32%",
      badge: "Agotándose",
    },
  ]

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-20 md:py-28">
      <div className="content-container px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">⚡ Ofertas Limitadas</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-black italic">Hot Deals</h2>
            <p className="text-gray-600 text-sm mt-3 font-light">Los mejores precios de la temporada</p>
          </div>
          <LocalizedClientLink
            href="/store"
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-black border-b-2 border-brand-gold pb-2 hover:text-brand-gold transition-colors whitespace-nowrap"
          >
            Ver Todas las Ofertas →
          </LocalizedClientLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5">
          {deals.map((deal, idx) => (
            <div
              key={idx}
              className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-[3/4] mb-5 bg-gray-100 shadow-md">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded-full">
                  <span className="text-[10px] font-bold">{deal.discount}</span>
                </div>
                {/* Availability Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur text-brand-black px-3 py-1.5 rounded-full">
                  <span className="text-[9px] font-bold uppercase tracking-widest">{deal.badge}</span>
                </div>
              </div>

              {/* Content */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                  {deal.category}
                </p>
                <h3 className="font-serif text-lg text-brand-black mb-3 line-clamp-2 group-hover:text-brand-gold transition-colors">
                  {deal.title}
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-bold text-brand-black">{deal.newPrice}</span>
                  <span className="text-xs text-gray-400 line-through">{deal.oldPrice}</span>
                </div>
                <button className="w-full py-2.5 px-3 border border-brand-black text-brand-black text-[10px] font-bold uppercase tracking-widest hover:bg-brand-black hover:text-white transition-all duration-300 rounded-sm">
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bottom */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-sm mb-4">
            ¿No encontraste lo que buscabas?
          </p>
          <LocalizedClientLink
            href="/store"
            className="inline-block px-10 py-4 bg-brand-black text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-brand-gold hover:text-white transition-all duration-300"
          >
            Explorar Catálogo Completo
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default HotDeals
