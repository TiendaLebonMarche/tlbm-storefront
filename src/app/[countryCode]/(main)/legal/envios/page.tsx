import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Envíos y Entregas | Tienda Le Bon Marché",
  description: "Políticas de envío y tiempos de despacho.",
}

export default function EnviosPage() {
  return (
    <div className="bg-[#fafaf5] min-h-screen pb-20">
      {/* Hero */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-brand-brown">
        <Image
          src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2000"
          alt="Logística y Entregas Rapidas"
          fill
          className="object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf5] to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-brand-gold mb-4">
            Logística Integral
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Envíos y Entregas
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 -mt-16 md:-mt-24 relative z-10">
        <div className="bg-white p-8 md:p-16 shadow-xl border border-gray-100 rounded-sm">
          <div className="prose prose-lg max-w-none text-brand-gray">
            
            <p className="font-medium text-brand-brown mb-8">Sabemos que cuando compra algo excepcional, lo quiere lo antes posible. Hemos diseñado nuestra logística en dos frentes para acelerar los tiempos en todo el país, desde nuestro despacho en Bucaramanga.</p>

            <h2 className="text-2xl font-serif font-bold text-brand-brown mb-4">1. El Modelo Fast-Track (Bucaramanga y AM)</h2>
            <p className="mb-8">
              Contamos con una promesa de valor denominada <strong>Fast-Track</strong> exclusiva para el Área Metropolitana de Bucaramanga y alrededores cercanos. Los pedidos recibidos y verificados (pago confirmado) antes de las 13:00 hrs de un día hábil gozan de entrega ultra rápida <strong>en menos de 24 horas</strong>. Nuestras rutas VIP entregan la caja bajo altos protocolos de seguridad.
            </p>

            <h2 className="text-2xl font-serif font-bold text-brand-brown mb-4">2. Nacional (Resto de Colombia)</h2>
            <p className="mb-4">
              Para despachos fuera de nuestra base metropolitana, confiamos el transporte de sus artículos, drones, relojes y dispositivos a empresas de mensajería altamente consolidadas a nivel nacional. 
            </p>
            <ul className="list-inside list-disc pl-2 mb-8 space-y-2">
              <li>El tiempo estimado de entrega fluctúa entre <strong>2 a 5 días hábiles</strong> dependiendo de la interconectividad de su región.</li>
              <li>Aplica un costo de envío dinámico que se refleja transparentemente en la pantalla "Checkout". Para algunos rangos de compra, este flete podría estar subsidiado (envío gratuito).</li>
              <li>Toda encomienda externa se despacha asegurada. Recibirá su guía de rastreo el mismo día hábil.</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-brand-brown mb-4">3. Contingencias Contractuales</h2>
            <p className="mb-8">
              Una vez la caja es recolectada por la transportadora, entra a regir el ecosistema externo de dicha empresa. Retrasos climáticos, cierres viales o emergencias nacionales escapan del control operativo de Tienda Le Bon Marché y no constituyen base para reembolsos inmediatos, aunque nuestro equipo <strong>siempre</strong> presionará por priorizar su paquete actuando como su puente VIP de servicio al cliente.
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}
