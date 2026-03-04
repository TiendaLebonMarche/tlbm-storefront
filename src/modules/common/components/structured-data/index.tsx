export default function StructuredData() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Tienda Le Bon Marché",
        "url": "https://tlbm-storefront.vercel.app",
        "logo": "https://tlbm-storefront.vercel.app/logo.png",
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
