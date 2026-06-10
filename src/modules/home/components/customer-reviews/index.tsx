"use client"

const CustomerReviews = () => {
  const reviews = [
    {
      rating: 5,
      name: "María González",
      location: "Medellín",
      text: "Excelente calidad y rapidez en la entrega. Los productos son tal como se describen. ¡Altamente recomendado!",
      product: "Reloj Suizo Premium",
      avatar: "👩‍💼",
    },
    {
      rating: 5,
      name: "Carlos Mendez",
      location: "Bogotá",
      text: "Servicio al cliente impecable. Mi experiencia de compra fue fluida y el empaque fue hermoso.",
      product: "Colección Assouline",
      avatar: "👨‍💼",
    },
    {
      rating: 5,
      name: "Ana Rodríguez",
      location: "Bucaramanga",
      text: "Productos auténticos garantizados. La tienda tiene un catálogo excelente. ¡Volveré a comprar!",
      product: "Auriculares Premium",
      avatar: "👩‍🎨",
    },
    {
      rating: 5,
      name: "Juan Pérez",
      location: "Cali",
      text: "Las mejores marcas en un solo lugar. Los precios son justos para la calidad que ofrecen.",
      product: "Florero Diseñador",
      avatar: "👨",
    },
  ]

  return (
    <section className="w-full bg-white pt-10 pb-20 md:pt-12 md:pb-28">
      <div className="content-container px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-brand-black font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
            Opiniones Verificadas
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-black italic mb-4">
            Nuestros Clientes Hablan
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-xl">⭐</span>
            ))}
            <span className="text-sm text-brand-gray ml-4 font-medium">4.9/5 - 1,250+ reseñas</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="p-6 md:p-5 border border-brand-gray-light rounded-lg hover:shadow-lg transition-all duration-300 hover:border-brand-black/30 bg-brand-gray-light/20 group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-lg">⭐</span>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm text-gray-700 mb-4 leading-relaxed font-light italic">
                &quot;{review.text}&quot;
              </p>

              {/* Product Tag */}
              <p className="text-[9px] font-bold uppercase tracking-widest text-brand-black mb-4 pb-4 border-b border-brand-gray-light">
                {review.product}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <span className="text-3xl">{review.avatar}</span>
                <div>
                  <p className="text-[10px] font-bold text-brand-black">{review.name}</p>
                  <p className="text-[9px] text-brand-gray">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 md:mt-20 grid grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 text-center py-12 border-t border-brand-gray-light">
          <div>
            <p className="text-3xl md:text-4xl font-bold text-brand-black mb-2">1250+</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gray">Clientes Satisfechos</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-brand-black mb-2">500+</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gray">Productos Curados</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-brand-black mb-2">99%</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gray">Recomendarían</p>
          </div>
          <div className="hidden md:block">
            <p className="text-3xl md:text-4xl font-bold text-brand-black mb-2">48h</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gray">Envío Promedio</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerReviews
