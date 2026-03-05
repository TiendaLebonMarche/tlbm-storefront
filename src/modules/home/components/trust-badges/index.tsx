"use client"

const TrustBadges = () => {
  const badges = [
    {
      icon: "🚚",
      title: "Envío Gratis",
      description: "En compras mayores a $100.000",
    },
    {
      icon: "✓",
      title: "Productos 100% Auténticos",
      description: "Todos verificados y certificados",
    },
    {
      icon: "↩",
      title: "Devoluciones Garantizadas",
      description: "30 días sin preguntas",
    },
    {
      icon: "💬",
      title: "Soporte Personalizado",
      description: "Chat en vivo & WhatsApp",
    },
  ]

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="content-container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {badges.map((badge, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl md:text-5xl mb-4">{badge.icon}</div>
              <h3 className="font-bold text-xs uppercase tracking-widest text-brand-black mb-2">
                {badge.title}
              </h3>
              <p className="text-[11px] text-gray-600 leading-snug">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustBadges
