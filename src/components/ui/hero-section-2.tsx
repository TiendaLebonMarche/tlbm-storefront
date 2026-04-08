"use client"

import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { Globe, Phone, MapPin } from 'lucide-react';

// Icon component for contact details
const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
    const icons = {
        website: <Globe className="h-5 w-5 text-brand-brown" />,
        phone: <Phone className="h-5 w-5 text-brand-brown" />,
        address: <MapPin className="h-5 w-5 text-brand-brown" />,
    };
    return <div className="mr-2 flex-shrink-0">{icons[type]}</div>;
};

// Prop types for the HeroSection component
interface HeroSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  logo?: {
    url: string;
    alt: string;
    text?: string;
  };
  slogan?: string;
  title: React.ReactNode;
  subtitle: string;
  callToAction: {
    text: string;
    href: string;
  };
  backgroundImage: string;
  contactInfo?: {
    website: string;
    phone: string;
    address: string;
  };
}

const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  ({ className, logo, slogan, title, subtitle, callToAction, backgroundImage, contactInfo, ...props }, ref) => {
    
    // Animation variants for the container to orchestrate children animations
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    };

    // Animation variants for individual text/UI elements
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut" as any,
        },
      },
    };
    
    return (
      <motion.section
        ref={ref}
        className={cn(
          "relative flex w-full flex-col overflow-hidden md:flex-row",
          className
        )}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "100px" }}
        variants={containerVariants}
        {...(props as any)}
      >
        {/* Left Side: Content */}
        <div className="flex w-full flex-col justify-between p-8 md:w-1/2 md:p-12 lg:w-3/5 lg:p-16">
            {/* Top Section: Logo & Main Content */}
            <div>
                <motion.header className="mb-12" variants={itemVariants}>
                    {logo && (
                        <div className="flex items-center">
                            {logo.url && <img src={logo.url} alt={logo.alt} className="mr-3 h-8" />}
                            <div>
                                {logo.text && <p className="text-lg font-bold text-brand-brown uppercase">{logo.text}</p>}
                                {slogan && <p className="text-[10px] tracking-[0.4em] text-brand-olive uppercase font-bold mt-1">{slogan}</p>}
                            </div>
                        </div>
                    )}
                </motion.header>

                <motion.div variants={containerVariants}>
                    <motion.h1 className="text-4xl font-sans font-bold leading-tight text-brand-brown md:text-5xl lg:text-7xl" variants={itemVariants}>
                        {title}
                    </motion.h1>
                    <motion.div className="my-8 h-[2px] w-24 bg-brand-brown/20" variants={itemVariants}></motion.div>
                    <motion.p className="mb-10 max-w-lg text-base md:text-lg leading-relaxed text-brand-gray font-normal" variants={itemVariants}>
                        {subtitle}
                    </motion.p>
                    <motion.a href={callToAction.href} className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-brand-brown border-b border-brand-brown/20 pb-2 hover:text-brand-olive hover:border-brand-olive transition-colors whitespace-nowrap" variants={itemVariants}>
                        {callToAction.text}
                    </motion.a>
                </motion.div>
            </div>

            {/* Bottom Section: Footer Info */}
            {contactInfo && (
              <motion.footer className="mt-16 w-full pt-8 border-t border-brand-brown/10" variants={itemVariants}>
                  <div className="grid grid-cols-1 gap-6 text-sm text-brand-gray sm:grid-cols-3">
                      <div className="flex items-center">
                          <InfoIcon type="website" />
                          <span>{contactInfo.website}</span>
                      </div>
                      <div className="flex items-center">
                          <InfoIcon type="phone" />
                          <span>{contactInfo.phone}</span>
                      </div>
                      <div className="flex items-center">
                          <InfoIcon type="address" />
                          <span>{contactInfo.address}</span>
                      </div>
                  </div>
              </motion.footer>
            )}
        </div>

        {/* Right Side: Image with Clip Path Animation */}
        <motion.div 
          className="w-full min-h-[400px] bg-cover bg-center md:w-1/2 md:min-h-full lg:w-2/5"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
          }}
          initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          whileInView={{ clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)' }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 1.2, ease: "circOut" as any }}
        >
        </motion.div>
      </motion.section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };
