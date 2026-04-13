import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Privacidad y Habeas Data | Tienda Le Bon Marché",
  description: "Política de tratamiento de datos y privacidad.",
}

export default function PrivacidadPage() {
  return (
    <div className="bg-[#fafaf5] min-h-screen pb-20">
      {/* Hero */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-[#322214]">
        <Image
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000"
          alt="Seguridad y Protección de Datos"
          fill
          className="object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf5] to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-brand-gold mb-4">
            Ley 1581 de 2012
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Privacidad y Habeas Data
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 -mt-16 md:-mt-24 relative z-10">
        <div className="bg-white p-8 md:p-16 shadow-2xl border border-gray-100 rounded-sm">
          <div className="prose prose-lg max-w-none text-brand-gray">
            
            <p className="font-bold text-brand-brown text-xl mb-8">
              En Tienda Le Bon Marché la privacidad no es letra pequeña, es parte de nuestro servicio premium. Nos tomamos en serio la custodia de su información bajo estrictos estándares criptográficos (SSL).
            </p>

            <h2 className="text-2xl font-serif font-bold text-brand-brown mb-4">1. Finalidad en el Uso de Datos</h2>
            <p>
              Requerimos información primaria (nombre, correo, celular y dirección física civil) estrictamente para:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 mb-8">
              <li>Efectuar la logística, despacho y entrega eficiente mediante nuestro modelo Fast-Track y operadores nacionales.</li>
              <li>Tramitar la facturación electrónica correspondiente.</li>
              <li>Atención personalizada directa (VIP) a través de canales como WhatsApp.</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-brand-brown mt-12 mb-4">2. Transparencia Algorítmica e Inteligencia Artificial</h2>
            <p>
              Como pilar de nuestro modelo de negocio, Tienda Le Bon Marché integra algoritmos de recopilación automatizada ("bots") e Inteligencia Artificial para el monitoreo y arbitraje de precios globales de proveedores exóticos y tecnológicos. Los datos de navegación de nuestros usuarios nos permiten afinar este modelo matemático para encontrar oportunidades reales y ofrecer el <strong>mejor precio ético posible</strong> en Colombia, mitigando la asimetría de la información a su favor. No comercializamos su data con terceros ajenos al ecosistema de compra.
            </p>

            <h2 className="text-2xl font-serif font-bold text-brand-brown mt-12 mb-4">3. Seguridad Transaccional</h2>
            <p>
              Toda su experiencia, especialmente la pasarela de pagos, se procesa bajo conexiones seguras <code>HTTPS</code> e infraestructuras con certificación bancaria internacional. Nosotros no almacenamos los datos completos de su tarjeta de crédito.
            </p>

            <h2 className="text-2xl font-serif font-bold text-brand-brown mt-12 mb-4">4. Política de Cookies</h2>
            <p>
              Utilizamos <strong>cookies técnicas estrictamente necesarias</strong> requeridas para mantener activa su sesión, habilitar el carrito de compras nativo de nuestro ecosistema (MedusaJS) y validar los tokens de seguridad.
            </p>

            <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm">Para consultas sobre sus datos o ejercer sus derechos de actualización/supresión, escríbanos a: <strong>soporte@tiendalebonmarche.com</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
