"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import SplitType from "split-type"
import { cn } from "@/lib/utils"

// Registrar plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextBlockAnimationProps {
    children: React.ReactNode;
    animateOnScroll?: boolean;
    delay?: number;
    blockColor?: string;
    stagger?: number;
    duration?: number;
}

export default function TextBlockAnimation({
    children,
    animateOnScroll = true,
    delay = 0,
    blockColor = "#000",
    stagger = 0.1,
    duration = 0.6
}: TextBlockAnimationProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // SplitType es la alternativa gratuita a SplitText de GSAP
        // Funciona de manera similar para dividir por líneas
        const split = new SplitType(containerRef.current, {
            types: "lines",
        });

        const lines = split.lines;
        if (!lines) return;

        const blocks: HTMLDivElement[] = [];

        lines.forEach((line) => {
            // Crear el wrapper
            const wrapper = document.createElement("div");
            wrapper.style.position = "relative";
            wrapper.style.display = "block";
            wrapper.style.overflow = "hidden";
            
            // Crear el Bloque Revelador
            const block = document.createElement("div");
            block.style.position = "absolute";
            block.style.top = "0";
            block.style.left = "0";
            block.style.width = "100%";
            block.style.height = "100%";
            block.style.backgroundColor = blockColor;
            block.style.zIndex = "2";
            block.style.transform = "scaleX(0)";
            block.style.transformOrigin = "left center";
            
            // Insertar wrapper y mover la línea dentro
            if (line.parentNode) {
                line.parentNode.insertBefore(wrapper, line);
                wrapper.appendChild(line);
                wrapper.appendChild(block);
            }
            
            // Estado inicial del texto
            gsap.set(line, { opacity: 0 });
            
            blocks.push(block);
        });

        // Crear la Timeline Maestra
        const tl = gsap.timeline({
            defaults: { ease: "expo.inOut" },
            scrollTrigger: animateOnScroll ? {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            } : null,
            delay: delay
        });

        // Secuencia de Animación
        tl.to(blocks, {
            scaleX: 1,
            duration: duration,
            stagger: stagger,
            transformOrigin: "left center",
        })
        .set(lines, {
            opacity: 1,
            stagger: stagger
        }, `<${duration / 2}`)
        .to(blocks, {
            scaleX: 0,
            duration: duration,
            stagger: stagger,
            transformOrigin: "right center"
        }, `<${duration * 0.4}`);

        // Cleanup
        return () => {
            split.revert();
        };

    }, { 
        scope: containerRef, 
        dependencies: [animateOnScroll, delay, blockColor, stagger, duration, children] 
    });
    
    return (
        <div ref={containerRef} className="relative">
            {children}
        </div>
    );
}
