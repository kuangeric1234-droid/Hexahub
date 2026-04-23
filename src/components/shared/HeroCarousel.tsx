"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CarouselTile = {
  label: string;
  sub: string;
  img: string;
};

export default function HeroCarousel({ tiles }: { tiles: CarouselTile[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const scrollToSlide = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const tileWidth = el.clientWidth * 0.78;
    el.scrollTo({ left: tileWidth * index, behavior: "smooth" });
    setActiveSlide(index);
  };

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const tileWidth = el.clientWidth * 0.78;
    setActiveSlide(Math.round(el.scrollLeft / tileWidth));
  };

  return (
    <div className="relative">
      {/* Tiles */}
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto scroll-smooth px-6 sm:px-8 lg:px-16 xl:px-20 pb-6"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
      >
        {tiles.map((tile, i) => (
          <div
            key={tile.label}
            className="relative shrink-0 rounded-2xl overflow-hidden aspect-[4/3]"
            style={{ width: "78vw", maxWidth: "700px", scrollSnapAlign: "start" }}
          >
            <Image
              src={tile.img}
              alt={`${tile.label} at Hexa Hub`}
              fill
              className="object-cover"
              sizes="78vw"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
            <div className="absolute top-4 left-5">
              <p className="text-white font-inter-tight font-semibold text-lg uppercase tracking-wide leading-tight">
                {tile.label}
              </p>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mt-0.5">
                {tile.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-end gap-4 px-6 sm:px-8 lg:px-16 xl:px-20 pb-8">
        <div className="flex items-center gap-2">
          {tiles.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                activeSlide === i ? "bg-[#2a3065]" : "bg-[#D0D0D0]"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
            disabled={activeSlide === 0}
            aria-label="Previous slide"
            className="w-9 h-9 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:border-[#2a3065] hover:text-[#2a3065] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollToSlide(Math.min(tiles.length - 1, activeSlide + 1))}
            disabled={activeSlide === tiles.length - 1}
            aria-label="Next slide"
            className="w-9 h-9 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:border-[#2a3065] hover:text-[#2a3065] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
