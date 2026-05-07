"use client"

import React from 'react';
import { HeroSection } from '@/components/ui/hero-section-2';

export default function HeroSectionDemo() {
  return (
    <div className="w-full bg-brand-soft">
      <HeroSection
        logo={{
            url: "",
            alt: "Le Bon Marché",
            text: "Le Bon Marché"
        }}
        slogan="Selección Exclusiva"
        title={
          <>
            Piezas de <br />
            <span className="italic font-light">Deseo</span>
          </>
        }
        subtitle="Explora una cuidada selección exótica de piezas únicas que elevarán tu espacio y enriquecerán tu entorno con elementos sofisticados que inspiran innovación."
        callToAction={{
          text: "VER CATÁLOGO →",
          href: "/store",
        }}
        backgroundImage="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1500&auto=format&fit=crop"
        contactInfo={{
            website: "lebonmarche.com",
            phone: "+57 (300) 000-0000",
            address: "Bucaramanga, Col",
        }}
      />
    </div>
  );
}
