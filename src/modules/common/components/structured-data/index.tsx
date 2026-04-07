import { getBaseURL } from "@lib/util/env"

export default function StructuredData() {
    const baseUrl = getBaseURL()
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Tienda Le Bon Marché",
        "url": baseUrl,
        "logo": `${baseUrl}/logo.png`,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+573027567783",
            "contactType": "customer service",
            "areaServed": "CO",
            "availableLanguage": "Spanish"
        },
        "sameAs": [
            "https://www.instagram.com/tiendalebonmarche",
            "https://www.facebook.com/tiendalebonmarche"
        ]
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
