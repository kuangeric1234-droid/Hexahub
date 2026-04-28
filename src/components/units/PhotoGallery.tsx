"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Photo {
  thumb: string;
  full: string;
  alt: string;
}

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => i !== null ? (i - 1 + photos.length) % photos.length : null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => i !== null ? (i + 1) % photos.length : null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, photos.length]);

  if (photos.length <= 1) return null;

  return (
    <>
      {/* Thumbnail strip */}
      <div className="bg-[#F5F5F5] border-b border-[#E5E5E5]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 py-3 flex gap-3 overflow-x-auto">
          {photos.slice(0, 6).map((photo, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="relative shrink-0 w-28 h-16 overflow-hidden border border-[#E5E5E5] hover:border-[#2a3065] transition-colors"
            >
              <Image
                src={photo.thumb}
                alt={photo.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="112px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 text-white hover:text-[#C8C8C8] transition-colors z-10"
          >
            <X size={28} />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white text-sm font-medium tracking-wide">
            {lightboxIndex + 1} / {photos.length}
          </div>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => i !== null ? (i - 1 + photos.length) % photos.length : null);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#C8C8C8] transition-colors z-10 p-2"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Full image */}
          <div
            className="relative w-full max-w-5xl max-h-[85vh] h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIndex].full}
              alt={photos[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => i !== null ? (i + 1) % photos.length : null);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#C8C8C8] transition-colors z-10 p-2"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </>
  );
}
