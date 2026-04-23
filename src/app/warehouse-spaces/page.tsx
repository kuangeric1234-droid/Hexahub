"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AmenitiesAccordion from "@/components/home/AmenitiesAccordion";
import SpaceCard from "@/components/shared/SpaceCard";

// ── Carousel data ─────────────────────────────────────────────────────────────

const CAROUSEL_TILES = [
  { label: "Inventory",    sub: "Spaces", img: "/renders/Internal.jpg" },
  { label: "Fulfilment",   sub: "Spaces", img: "/renders/Storage Final Image LOW RES.jpg" },
  { label: "Showroom",     sub: "Spaces", img: "/renders/Block H Front.jpg" },
  { label: "Security",     sub: "Spaces", img: "/renders/External Block A.jpg" },
];

// ── Unit cards ────────────────────────────────────────────────────────────────

const UNIT_CARDS = [
  {
    title: "Storage Spaces",
    img: "/renders/Storage Final Image LOW RES.jpg",
    specs: ["31–75m² drive-through storage", "24/7 wireless keypad access", "Flexible monthly membership"],
  },
  {
    title: "Hexa Warehouse",
    img: "/renders/Internal.jpg",
    specs: ["223–438m² warehouse units", "3-phase power, roller doors", "Mezzanine offices included"],
  },
  {
    title: "Showroom Warehouse",
    img: "/renders/Block H Front.jpg",
    specs: ["Dual-purpose units", "Street-facing showroom", "Operational warehouse behind"],
  },
];

// ── Feature blocks ────────────────────────────────────────────────────────────

const FEATURE_BLOCKS = [
  {
    eyebrow: "Operations",
    headingParts: ["We ", "ship", " and ", "receive", " for you"],
    italics: [false, true, false, true, false],
    subhead:
      "Our on-site operations team handles inbound freight, package receiving, and outbound shipping — so you can focus on growing your brand instead of standing at the loading bay.",
    features: [
      {
        label: "Carrier Pickup",
        desc: "Direct pickup access for Australia Post, StarTrack, Couriers Please, and other major carriers — no trips to the post office.",
      },
      {
        label: "Loading Zones",
        desc: "Dedicated loading zones with full-height roller doors for freight, container, and pallet movements.",
      },
    ],
    cta: { label: "Explore our logistics services", href: "/operations" },
    img: "/renders/Storage Entry.jpg",
    imgAlt: "Loading area at Hexa Hub Huntingdale",
    imgRight: true,
  },
  {
    eyebrow: "Growth",
    headingParts: ["A warehouse that ", "scales", " with you"],
    italics: [false, true, false],
    subhead:
      "Start with the space you need today and expand across units as your operations grow. Month-to-month terms, with pathways to larger warehouses and combined office-warehouse units when ready.",
    features: [
      {
        label: "Flexible Terms",
        desc: "Month-to-month memberships with no long industrial lease commitment. Scale up or down as your inventory, team, or season changes.",
      },
      {
        label: "Ecosystem Partners",
        desc: "Direct access to our ecosystem — EIZ Technology for imports and compliance, Digitec IT for systems, and Australia Post for outbound logistics — all built in.",
      },
    ],
    cta: { label: "See our ecosystem partners", href: "/ecosystem" },
    img: "/renders/Aerial.jpg",
    imgAlt: "Hexa Hub precinct aerial view, Huntingdale Melbourne",
    imgRight: false,
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WarehouseSpacesPage() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const scrollToSlide = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const tileWidth = el.clientWidth * 0.78; // ~78vw per tile
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
    <>
      <Header />
      <main>

        {/* ── 1. HERO ── */}
        <section className="bg-white pt-24 pb-0 lg:pt-32">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 pb-12 lg:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

              {/* Left — headline + CTAs */}
              <div>
                <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-4">
                  Warehouse Spaces
                </p>
                <h1 className="font-inter-tight font-medium text-[36px] leading-[44px] sm:text-[44px] sm:leading-[54px] lg:text-[56px] lg:leading-[67px] text-[rgb(36,43,43)] tracking-tight mb-8">
                  Give your brand room to{" "}
                  <span className="font-besley font-medium italic underline decoration-[#2a3065] decoration-[3px] underline-offset-[4px]">
                    grow
                  </span>
                </h1>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-semibold px-8 py-4 text-base transition-colors duration-200"
                  >
                    Book a tour
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border border-[#2a3065] text-[#2a3065] hover:bg-[#2a3065] hover:text-white font-semibold px-8 py-4 text-base transition-colors duration-200"
                  >
                    Talk to our team <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Right — subhead */}
              <div className="lg:pt-6">
                <p className="text-[#555555] text-lg leading-relaxed max-w-lg">
                  Warehouse spaces at Huntingdale with the infrastructure, ecosystem, and on-site support to scale — purpose-built for brands operating in Australia.
                </p>
              </div>
            </div>
          </div>

          {/* Carousel — full bleed below text */}
          <div className="relative">
            {/* Tiles */}
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="flex gap-3 overflow-x-auto scroll-smooth px-6 sm:px-8 lg:px-16 xl:px-20 pb-6"
              style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
            >
              {CAROUSEL_TILES.map((tile, i) => (
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
                  {/* Top gradient for label readability */}
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
              {/* Dots */}
              <div className="flex items-center gap-2">
                {CAROUSEL_TILES.map((_, i) => (
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
              {/* Arrows */}
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
                  onClick={() => scrollToSlide(Math.min(CAROUSEL_TILES.length - 1, activeSlide + 1))}
                  disabled={activeSlide === CAROUSEL_TILES.length - 1}
                  aria-label="Next slide"
                  className="w-9 h-9 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:border-[#2a3065] hover:text-[#2a3065] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. UNIT TYPE CARDS ── */}
        <section className="py-20 lg:py-28 bg-white border-t border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="mb-12">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                Flexible memberships
              </p>
              <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl text-[rgb(36,43,43)] tracking-tight mb-4">
                Warehouse spaces
              </h2>
              <p className="text-[#6B6B6B] text-base leading-relaxed max-w-2xl">
                Whether you&apos;re storing your first pallet or scaling across multiple units, get the right amount of space now — and scale up or down as your business changes.
              </p>
            </div>

            <div className="space-types-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {UNIT_CARDS.map((card) => (
                <SpaceCard
                  key={card.title}
                  title={card.title}
                  specs={card.specs}
                  img={card.img}
                  buttonText="Explore"
                  buttonHref="/contact"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. ALTERNATING FEATURE BLOCKS ── */}
        {FEATURE_BLOCKS.map((block) => {
          const ContentCol = (
            <div className="flex flex-col justify-center">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-4">
                {block.eyebrow}
              </p>
              <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl text-[rgb(36,43,43)] tracking-tight mb-5">
                {block.headingParts.map((part, pi) =>
                  block.italics[pi] ? (
                    <span
                      key={pi}
                      className="font-besley font-medium italic underline decoration-[#2a3065] decoration-[3px] underline-offset-[4px]"
                    >
                      {part}
                    </span>
                  ) : (
                    <span key={pi}>{part}</span>
                  )
                )}
              </h2>
              <p className="text-[#555555] text-base leading-relaxed mb-8 max-w-xl">
                {block.subhead}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {block.features.map((f) => (
                  <div key={f.label}>
                    <p className="text-[#2a3065] text-[11px] font-semibold uppercase tracking-widest mb-2">
                      {f.label}
                    </p>
                    <p className="text-[#555555] text-sm leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
              <Link
                href={block.cta.href}
                className="inline-flex items-center gap-2 text-[#2a3065] font-semibold text-sm hover:underline"
              >
                {block.cta.label} <ArrowRight size={14} />
              </Link>
            </div>
          );

          const ImageCol = (
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={block.img}
                alt={block.imgAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          );

          return (
            <section key={block.eyebrow} className="py-20 lg:py-28 bg-[#F5F5F5] border-t border-[#E5E5E5]">
              <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {block.imgRight ? (
                    <>{ContentCol}{ImageCol}</>
                  ) : (
                    <>{ImageCol}{ContentCol}</>
                  )}
                </div>
              </div>
            </section>
          );
        })}

        {/* ── 4. AMENITIES ── */}
        <section className="py-20 lg:py-28 bg-white border-t border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="mb-12">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                Amenities
              </p>
              <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl text-[rgb(36,43,43)] tracking-tight mb-3">
                <span className="font-besley font-medium italic underline decoration-[#2a3065] decoration-[3px] underline-offset-[4px]">
                  All
                </span>{" "}
                under one roof
              </h2>
              <p className="text-[#6B6B6B] text-base max-w-xl leading-relaxed">
                Explore all the amenities built into every Hexa Hub warehouse space.
              </p>
            </div>
            <AmenitiesAccordion />
          </div>
        </section>

        {/* ── 5. CLOSING CTA ── */}
        <section className="py-20 lg:py-28 bg-[#2a3065]">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
              Find your warehouse today
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Join brands scaling their operations at Huntingdale.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#2a3065] font-semibold px-8 py-4 text-base hover:bg-[#F5F5F5] transition-colors duration-200"
              >
                Speak to our team
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white text-white font-semibold px-8 py-4 text-base hover:bg-white/10 transition-colors duration-200"
              >
                Book a tour <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
