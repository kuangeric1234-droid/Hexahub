import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AmenitiesAccordion from "@/components/home/AmenitiesAccordion";
import SpaceCard from "@/components/shared/SpaceCard";
import HeroCarousel from "@/components/shared/HeroCarousel";

// ── Carousel data ─────────────────────────────────────────────────────────────

const CAROUSEL_TILES = [
  { label: "Office",        sub: "Spaces", img: "/renders/Mezzanine.jpg" },
  { label: "Collaboration", sub: "Spaces", img: "/renders/The Hub @ Found Spaces.jpg" },
  { label: "Communal",      sub: "Spaces", img: "/renders/Aerial.jpg" },
];

// ── Unit cards ────────────────────────────────────────────────────────────────

const UNIT_CARDS = [
  {
    title: "Office + Warehouse",
    titleNode: (
      <>
        Office +{" "}
        <span className="font-besley font-medium italic">warehouse</span>
      </>
    ),
    img: "/renders/Mezzanine.jpg",
    specs: [
      "240m² over two levels",
      "Full-floor office above, warehouse with tilt door below",
      "Street frontage with roller door",
    ],
  },
  {
    title: "Private Offices",
    titleNode: (
      <>
        Private{" "}
        <span className="font-besley font-medium italic">offices</span>
      </>
    ),
    img: "/renders/Block B Front.jpg",
    specs: [
      "128–136m² private offices",
      "Natural light, district views",
      "Ground and first floor options",
    ],
  },
];

// ── Feature blocks ────────────────────────────────────────────────────────────

const FEATURE_BLOCKS = [
  {
    eyebrow: "Operations",
    headingParts: ["Workspace paired with ", "operations"],
    italics: [false, true],
    subhead:
      "Most office space puts you on the 12th floor of a CBD tower, miles from your inventory. At Hexa Hub, your office sits alongside your actual operations — receiving, stock, shipping, and the teams that run them.",
    features: [
      {
        label: "All-in-one site",
        desc: "Your office, warehouse, and ecosystem partners all at Huntingdale — no commuting between CBD meetings and industrial sites.",
      },
      {
        label: "Hub access included",
        desc: "Every office tenant gets access to The Hub, our shared lounge and meeting space, for visitor meetings and team collaboration.",
      },
    ],
    cta: { label: "See what's included", href: "#amenities" },
    img: "/renders/Mezzanine (Floor Boards).jpg",
    imgAlt: "Office interior at Hexa Hub Huntingdale",
    imgRight: true,
  },
  {
    eyebrow: "Growth",
    headingParts: ["Office space that ", "scales", " with you"],
    italics: [false, true, false],
    subhead:
      "Start in a stand-alone office, expand into a combined office-warehouse unit, or grow across multiple suites — all on month-to-month terms.",
    features: [
      {
        label: "Month-to-month",
        desc: "No long commercial lease. Upgrade to a larger suite or combined unit when ready — no break fees, no renegotiation.",
      },
      {
        label: "Upgrade paths",
        desc: "Move between office tiers as your team grows — from solo office, to shared team office, to full Office + Warehouse combined unit.",
      },
    ],
    cta: { label: "Explore combined units", href: "/warehouse-spaces" },
    img: "/renders/The Hub @ Found Spaces.jpg",
    imgAlt: "The Hub communal space at Hexa Hub",
    imgRight: false,
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function OfficeSpacesPage() {
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
                  Office Suites
                </p>
                <h1 className="font-inter-tight font-medium text-[36px] leading-[44px] sm:text-[44px] sm:leading-[54px] lg:text-[56px] lg:leading-[67px] text-[rgb(36,43,43)] tracking-tight mb-8">
                  Office spaces built for{" "}
                  <span className="font-besley font-medium italic underline decoration-[#2a3065] decoration-[3px] underline-offset-[4px]">
                    operators
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
                  Private office suites at Huntingdale — purpose-built for brands that need a professional workspace alongside their physical operations. Month-to-month, with pathways to larger combined office-warehouse units as your team grows.
                </p>
              </div>
            </div>
          </div>

          {/* Carousel — full bleed below text */}
          <HeroCarousel tiles={CAROUSEL_TILES} />
        </section>

        {/* ── 2. UNIT TYPE CARDS ── */}
        <section className="py-20 lg:py-28 bg-white border-t border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="mb-12">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                Flexible memberships
              </p>
              <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl text-[rgb(36,43,43)] tracking-tight mb-4">
                Office suites
              </h2>
              <p className="text-[#6B6B6B] text-base leading-relaxed max-w-2xl">
                Whether you&apos;re solo or growing a team, get the right workspace now and expand when ready.
              </p>
            </div>

            <div className="space-types-grid grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {UNIT_CARDS.map((card) => (
                <SpaceCard
                  key={card.title}
                  title={card.title}
                  titleNode={card.titleNode}
                  specs={card.specs}
                  img={card.img}
                  buttonText="Explore"
                  buttonHref="/contact"
                  aspectClass="aspect-[4/3]"
                  sizes="(max-width: 768px) 100vw, 50vw"
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
        <section id="amenities" className="py-20 lg:py-28 bg-white border-t border-[#E5E5E5]">
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
                Every amenity included across Hexa Hub office and warehouse spaces.
              </p>
            </div>
            <AmenitiesAccordion />
          </div>
        </section>

        {/* ── 5. CLOSING CTA ── */}
        <section className="py-20 lg:py-28 bg-[#2a3065]">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
              Find your office today
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Join brands building their Australian operations at Huntingdale.
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
