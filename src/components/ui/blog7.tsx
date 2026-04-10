"use client";

import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { motion } from "framer-motion";
import Image from "next/image";

interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
}

interface Blog7Props {
  tagline?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  posts: Post[];
}

const Blog7 = ({
  tagline = "Lifestyle & Tendencias",
  heading = "Crónicas de Estilo",
  description = "Descubre las piezas que definen el lujo moderno y las historias detrás de nuestra selección exclusiva. Inspiración editorial para los más exigentes.",
  buttonText = "Ver todos los artículos",
  buttonUrl = "/blog",
  posts,
}: Blog7Props) => {
  return (
    <section className="py-16 md:py-24 bg-brand-soft">
      <div className="content-container px-6 flex flex-col items-center gap-12">
        {/* Header */}
        <div className="text-center max-w-2xl">
          <Badge variant="secondary" className="mb-6 uppercase tracking-[0.2em] text-[10px] font-bold text-brand-olive bg-white border-0 shadow-sm">
            {tagline}
          </Badge>
          <h2 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-brand-brown leading-tight">
            {heading}
          </h2>
          <p className="mb-8 text-brand-gray text-sm md:text-base leading-relaxed">
            {description}
          </p>
          <LocalizedClientLink
            href={buttonUrl}
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-brown border-b border-brand-brown/30 pb-2 hover:text-brand-olive hover:border-brand-olive transition-all duration-300"
          >
            {buttonText}
            <ArrowRight className="size-3" />
          </LocalizedClientLink>
        </div>

        {/* Cards grid */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as any }}
            >
              <Card className="grid grid-rows-[auto_auto_1fr_auto] h-full overflow-hidden group">
                {/* Image */}
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <LocalizedClientLink href={post.url} className="block w-full h-full">
                    <div className="relative h-full w-full bg-gray-50">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                          Sin imagen
                        </div>
                      )}
                    </div>
                  </LocalizedClientLink>
                </div>

                <CardHeader className="pb-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-olive mb-2 block">
                    {post.label}
                  </span>
                  <h3 className="text-lg md:text-xl font-serif font-semibold text-brand-brown leading-snug group-hover:text-brand-olive transition-colors duration-300">
                    <LocalizedClientLink href={post.url}>
                      {post.title}
                    </LocalizedClientLink>
                  </h3>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-brand-gray leading-relaxed">{post.summary}</p>
                </CardContent>

                <CardFooter className="border-t border-gray-50 mt-2">
                  <div className="flex items-center justify-between w-full pt-4">
                    <span className="text-[10px] text-brand-gray/60 font-medium">{post.published} · {post.author}</span>
                    <LocalizedClientLink
                      href={post.url}
                      className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-brown hover:text-brand-olive transition-colors group/link"
                    >
                      Leer
                      <ArrowRight className="size-3 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </LocalizedClientLink>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog7 };
