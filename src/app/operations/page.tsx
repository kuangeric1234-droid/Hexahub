import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AmenitiesAccordion from "@/components/home/AmenitiesAccordion";
import SpaceCard from "@/components/shared/SpaceCard";
import HeroCarousel from "@/components/shared/HeroCarousel";

// ── Carousel ──────────────────────────────────────────────────────────────────

const CAROUSEL_TILES = [
  { label: "Receiving",      sub: "Spaces", img: "/renders/Storage Entry.jpg" },
  { label: "Pick & Pack",    sub: "Spaces", img: "/renders/Storage Final Image LOW RES.jpg" },
  { label: "Outbound",       sub: "Spaces", img: "/renders/Internal.jpg" },
  { label: "Projects",       sub: "Spaces", img: "/renders/Mezzanine.jpg" },
];

// ── Service cards ─────────────────────────────────────────────────────────────

const SERVICE_CARDS = [
  {
    title: "Receiving & Storage",
    img: "/renders/Storage Entry.jpg",
    specs: [
      "Inbound freight handling",
      "Pallet and parcel check-in",
      "Short-term flex storage available",
    ],
  },
  {
    title: "Pick, Pack, Ship",
    img: "/renders/Storage Final Image LOW RES.jpg",
    specs: [
      "Order picking from your inventory",
      "Custom packing to your spec",
      "Outbound labelling and carrier handoff",
    ],
  },
  {
    title: "Special Projects",
    img: "/renders/Internal.jpg",
    specs: [
      "Kitting and bundling",
      "Product photography prep",
      "Seasonal launches and promotions",
    ],
  },
];

// ── Feature blocks ────────────────────────────────────────────────────────────

const FEATURE_BLOCKS = [
  {
    eyebrow: "Pricing",
    headingParts: ["Pay for ", "what", " you use"],
    italics: [false, true, false],
    subhead:
      "No minimum hours, no long-term commitment. Book our on-site team by the hour as your business needs change.",
    features: [
      {
        label: "Hourly rates",
        desc: "Transparent per-hour pricing for ops support, no hidden fees or fixed packages.",
      },
      {
        label: "Same-day availability",
        desc: "Short-notice requests handled where capacity allows — message us and we'll confirm within hours.",
      },
    ],
    cta: { label: "See current rates", href: "/contact" },
    img: "/renders/Hero Storage.jpg",
    imgAlt: "Operations activity at Hexa Hub Huntingdale",
    imgRight: true,
  },
  {
    eyebrow: "Flexibility",
    headingParts: ["Scale up, scale ", "down"],
    italics: [false, true],
    subhead:
      "Hire extra hands for Black Friday, EOFY, or a product launch — and wind back when the season ends. No staff to let go, no commitments to unwind.",
    features: [
      {
        label: "Peak season cover",
        desc: "Dedicated support during high-volume periods without hiring, training, and managing seasonal staff yourself.",
      },
      {
        label: "Team leave cover",
        desc: "Keep operations running when your own team is on leave, sick, or spread thin.",
      },
    ],
    cta: { label: "Talk to our ops team", href: "/contact" },
    img: "/renders/Mezzanine (Floor Boards).jpg",
    imgAlt: "Warehouse floor at Hexa Hub Huntingdale",
    imgRight: false,
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function OperationsPage() {
  return (
    <>
      <Header />
      <main>

        {/* ── 1. HERO ── */}
        <section className="bg-white pt-24 pb-0 lg:pt-32">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 pb-12 lg:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

              <div>
                <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-4">
                  Operations &amp; Fulfillment
                </p>
                <h1 className="font-inter-tight font-medium text-[36px] leading-[44px] sm:text-[44px] sm:leading-[54px] lg:text-[56px] lg:leading-[67px] text-[rgb(36,43,43)] tracking-tight mb-8">
                  Extra{" "}
                  <span className="font-besley font-medium italic underline decoration-[#2a3065] decoration-[3px] underline-offset-[4px]">
                    hands
                  </span>{" "}
                  when you need them
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

              <div className="lg:pt-6">
                <p className="text-[#555555] text-lg leading-relaxed max-w-lg">
                  On-demand operations support at Huntingdale — hire our on-site team by the hour to help with receiving, pick-and-pack, and special projects without hiring a permanent ops team of your own.
                </p>
              </div>
            </div>
          </div>

          <HeroCarousel tiles={CAROUSEL_TILES} />
        </section>

        {/* ── 2. SERVICE CARDS ── */}
        <section className="py-20 lg:py-28 bg-white border-t border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="mb-12">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                On-demand services
              </p>
              <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl text-[rgb(36,43,43)] tracking-tight mb-4">
                Flexible help, no permanent hires
              </h2>
              <p className="text-[#6B6B6B] text-base leading-relaxed max-w-2xl">
                Get the support you need during peak season, team leave, or one-off projects — without the overhead of building an ops team.
              </p>
            </div>

            <div className="space-types-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {SERVICE_CARDS.map((card) => (
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
                Every Hexa Hub member has full access to our facility amenities and ecosystem.
              </p>
            </div>
            <AmenitiesAccordion />
          </div>
        </section>

        {/* ── 5. CLOSING CTA ── */}
        <section className="py-20 lg:py-28 bg-[#2a3065]">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
              Get the ops support you need
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Tell us what your operation needs — we&apos;ll tell you how we can help.
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
