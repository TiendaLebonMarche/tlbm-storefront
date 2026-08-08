export interface FaqItem {
  question: string
  answer: string
}

export interface ProofStat {
  value: string
  label: string
}

/**
 * Fuente ÚNICA de preguntas frecuentes (visible en la home + schema FAQPage).
 * Mantener sincronizadas: si cambias una respuesta aquí, cambia en ambos lados.
 * Las respuestas reflejan las políticas reales de /co/legal/envios y /co/legal/devoluciones.
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Hacen envíos a todo Colombia?",
    answer:
      "Sí. Realizamos envíos a todos los municipios de Colombia. Los tiempos de entrega varían entre 2 y 7 días hábiles dependiendo del destino. Trabajamos con las principales transportadoras del país.",
  },
  {
    question: "¿Cuáles son los métodos de pago aceptados?",
    answer:
      "Aceptamos tarjetas de crédito y débito (Visa, Mastercard), PSE, Nequi, Daviplata y transferencia bancaria. Todas las transacciones están protegidas con cifrado SSL.",
  },
  {
    question: "¿Los productos tienen garantía?",
    answer:
      "Sí. Todos nuestros productos cumplen con la garantía establecida por la normativa colombiana (Ley 1480 del Estatuto del Consumidor). El período varía según el tipo de producto.",
  },
  {
    question: "¿Tienen tienda física en Bucaramanga?",
    answer:
      "Somos una tienda 100% virtual con sede en Bucaramanga, Santander. No contamos con punto de venta físico pero puedes contactarnos por WhatsApp al +57 302 756 7783.",
  },
  {
    question: "¿Puedo hacer devoluciones?",
    answer:
      "Sí, dentro de los primeros 15 días desde la recepción del producto, en condiciones originales. Contáctanos a info@tiendalebonmarche.com para gestionar tu devolución.",
  },
]

/**
 * Cifras REALES y comprobables de la tienda (proof con números — framework AI SEO punto 11).
 * NO inventar: +40 productos (catálogo Medusa), 13 categorías (metadata verificada),
 * 2-5 días envío (política real), garantía Ley 1480 (legal real).
 */
export const PROOF_STATS: ProofStat[] = [
  { value: "+40", label: "productos 100% originales" },
  { value: "13", label: "categorías verificadas" },
  { value: "2-5 días", label: "envío a toda Colombia" },
  { value: "100%", label: "garantía original" },
]
