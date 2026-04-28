import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Zap, Package, Network, ShieldCheck, RefreshCw } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import UnitCard from "@/components/units/UnitCard";
import AmenitiesAccordion from "@/components/home/AmenitiesAccordion";
import SpaceCard from "@/components/shared/SpaceCard";
import SpaceTypeSelector from "@/components/SpaceTypeSelector";
import { getFeaturedLeaseUnits, getFeaturedSaleUnits, getSiteSettings, getPartners, getMembersForScroll } from "@/lib/sanity/queries";
import MemberLogoScroll from "@/components/MemberLogoScroll";

const SPACE_TYPES = [
  {
    type: "storage",
    title: "Storage Spaces",
    specs: ["31–75m² drive-through storage", "24/7 wireless keypad access", "Flexible monthly membership"],
    img: "/renders/Storage Final Image LOW RES.jpg",
  },
  {
    type: "warehouse",
    title: "Warehouses",
    specs: ["223–438m² warehouse units", "3-phase power, roller doors", "Mezzanine offices included"],
    img: "/renders/Internal.jpg",
  },
  {
    type: "showroom-warehouse",
    title: "Showroom + Warehouse",
    specs: ["Dual-purpose units", "Street-facing showroom space", "Operational warehouse behind"],
    img: "/renders/Block H Front.jpg",
  },
  {
    type: "office-warehouse",
    title: "Office + Warehouse",
    specs: ["240m² over two levels", "Full-floor office above", "Warehouse with tilt door below", "Street frontage"],
    img: "/renders/Mezzanine.jpg",
  },
  {
    type: "office",
    title: "Offices",
    specs: ["128–136m² private offices", "Natural light, district views", "Ground and first floor options"],
    img: "/renders/Block B Front.jpg",
  },
];


const PILLARS = [
  {
    icon: Package,
    label: "Space",
    title: "Five types of space, one address.",
    body: "Warehouses, storage, showrooms, offices, and combined office-warehouse units from 31–438m² at Huntingdale. Purpose-built, high-spec, and available now.",
    href: "/spaces",
    img: "/renders/Internal.jpg",
    imgAlt: "Warehouse interior at Hexa Hub Huntingdale",
  },
  {
    icon: Zap,
    label: "Operations",
    title: "Infrastructure that works from day one.",
    body: "3-phase power, roller doors, loading zones, 24/7 keypad access, NBN, CCTV, and The Hub — a shared lounge and meeting space included for every tenant.",
    href: "/operations",
    img: "/renders/Storage Entry.jpg",
    imgAlt: "Loading and storage area at Hexa Hub Huntingdale",
  },
  {
    icon: Network,
    label: "Ecosystem",
    title: "A network of partners built in.",
    body: "Every member plugs into EIZ Technology, Digitec IT, Australia Post logistics, and direct mentorship — the partners you need to land and grow in Australia.",
    href: "/ecosystem",
    img: "/renders/The Hub @ Found Spaces.jpg",
    imgAlt: "The Hub communal lounge at Hexa Hub Huntingdale",
  },
];


export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredLeaseUnits, featuredSaleUnits, settings, partners, scrollMembers] = await Promise.all([
    getFeaturedLeaseUnits().catch(() => []),
    getFeaturedSaleUnits().catch(() => []),
    getSiteSettings().catch(() => null),
    getPartners().catch(() => []),
    getMembersForScroll().catch(() => []),
  ]);


  return (
    <>
      <Header />
      <main>
        {/* ── HERO ── */}
        <section className="bg-white pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              {/* ── Left: text column ── */}
              <div>
                <h1 className="font-inter-tight font-medium text-[36px] leading-[44px] sm:text-[44px] sm:leading-[54px] lg:text-[56px] lg:leading-[67px] text-[rgb(36,43,43)] tracking-tight mb-6">
                  Flexible{" "}
                  <span className="font-besley font-medium italic underline decoration-[#2a3065] decoration-[5px] underline-offset-[5px]">space</span>
                  , on-site{" "}
                  <span className="font-besley font-medium italic underline decoration-[#2a3065] decoration-[5px] underline-offset-[5px]">operations</span>
                  {" "}and an{" "}
                  <span className="font-besley font-medium italic underline decoration-[#2a3065] decoration-[5px] underline-offset-[5px]">ecosystem</span>
                  {" "}built for brands scaling in Australia
                </h1>

                <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl">
                  Hexa Hub is a business infrastructure platform at Huntingdale, Melbourne — giving brands the space, operations, and partners to land and scale in Australia.
                </p>

                <SpaceTypeSelector />

                {/* Stats row */}
                <div className="flex flex-wrap gap-x-8 gap-y-4 pt-8 border-t border-[#E5E5E5]">
                  {[
                    ["5", "Space Types"],
                    ["31–438", "m² Range"],
                    ["4", "Ecosystem Partners"],
                    ["24/7", "Site Access"],
                  ].map(([val, label]) => (
                    <div key={label}>
                      <div className="text-[#2a3065] font-bold text-2xl">{val}</div>
                      <div className="text-gray-500 text-xs uppercase tracking-wide mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right: media column ── */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EBEBEB]">
                <video
                  src="/videos/hexahub-walkthrough.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

            </div>
          </div>
        </section>

        {/* ── MEMBERS — infinite scroll strip (social proof, directly below hero) ── */}
        <MemberLogoScroll members={scrollMembers} />

        {/* ── THREE PILLARS ── */}
        <section className="py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="mb-14">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                The platform
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight max-w-xl">
                More than a lease. A complete operating platform.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {PILLARS.map(({ label, title, body, href, img, imgAlt }) => (
                <div key={label} className="bg-[#F5F5F5] rounded-3xl p-6 lg:p-8 flex flex-col">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 shrink-0">
                    <Image
                      src={img}
                      alt={imgAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Eyebrow */}
                  <p className="text-[#2a3065] text-xs font-semibold uppercase tracking-widest mb-3">{label}</p>

                  {/* Headline */}
                  <h3 className="font-inter-tight font-semibold text-[rgb(36,43,43)] text-xl leading-snug mb-3">{title}</h3>

                  {/* Body */}
                  <p className="text-[#6B6B6B] text-sm leading-relaxed mb-8 flex-1">{body}</p>

                  {/* CTA */}
                  <div>
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200"
                    >
                      Learn more <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ECOSYSTEM PARTNERS ── */}
        {partners.length > 0 && (
          <section className="py-24 bg-[#F5F5F5] border-y border-[#E5E5E5]">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
                <div>
                  <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                    Ecosystem
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
                    Partners built into the platform.
                  </h2>
                </div>
                <Link
                  href="/ecosystem"
                  className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-black text-sm transition-colors shrink-0"
                >
                  View full ecosystem <ArrowRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {partners.map((partner) => (
                  <div key={partner._id} className="bg-white border border-[#E5E5E5] p-6 flex flex-col">
                    <p className="text-[#2a3065] text-xs font-semibold uppercase tracking-widest mb-3">
                      {partner.category === "supply-chain"
                        ? "Supply Chain"
                        : partner.category === "digital"
                        ? "Digital"
                        : partner.category === "shipping"
                        ? "Shipping & Logistics"
                        : "Mentorship"}
                    </p>
                    <h3 className="text-black font-bold text-base mb-2">{partner.name}</h3>
                    {partner.shortDescription && (
                      <p className="text-[#6B6B6B] text-sm leading-relaxed mb-4 flex-1">
                        {partner.shortDescription}
                      </p>
                    )}
                    {partner.memberBenefits && partner.memberBenefits.length > 0 && (
                      <ul className="space-y-1.5">
                        {partner.memberBenefits.slice(0, 3).map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2 text-xs text-[#555555]">
                            <CheckCircle size={11} className="text-[#2a3065] mt-0.5 shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── SPACES ── */}
        <section className="py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                  Spaces
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
                  Five types of space.<br />One address.
                </h2>
              </div>
              <Link
                href="/units"
                className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-black text-sm transition-colors shrink-0"
              >
                View all spaces <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
              {SPACE_TYPES.map((card) => (
                <SpaceCard
                  key={card.type}
                  title={card.title}
                  specs={card.specs}
                  img={card.img}
                  buttonText="View spaces"
                  buttonHref={`/units?type=${card.type}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── AMENITIES ── */}
        <section className="py-20 lg:py-28 bg-[#F5F5F5] border-t border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="mb-12">
              <p className="text-[#6B6B6B] text-sm font-semibold uppercase tracking-widest mb-3">
                Amenities
              </p>
              <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl text-[rgb(36,43,43)] tracking-tight mb-3">
                What&apos;s included
              </h2>
              <p className="text-[#6B6B6B] text-base max-w-xl leading-relaxed">
                Everything built into Hexa Hub at Huntingdale — from infrastructure to ecosystem.
              </p>
            </div>
            <AmenitiesAccordion />
          </div>
        </section>

        {/* ── FEATURED LISTINGS ── */}
        {(featuredLeaseUnits.length > 0 || featuredSaleUnits.length > 0) && (
          <section className="py-24 bg-[#F5F5F5]">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
              {featuredLeaseUnits.length > 0 && (
                <div className={featuredSaleUnits.length > 0 ? "mb-20" : ""}>
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
                    <div>
                      <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                        Available for lease
                      </p>
                      <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
                        Featured lease listings
                      </h2>
                    </div>
                    <Link
                      href="/units?listing=for-lease"
                      className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-black text-sm transition-colors shrink-0"
                    >
                      View all lease units <ArrowRight size={14} />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredLeaseUnits.map((unit) => (
                      <UnitCard key={unit._id} unit={unit} />
                    ))}
                  </div>
                </div>
              )}

              {featuredSaleUnits.length > 0 && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
                    <div>
                      <p className="text-[#C8922A] text-sm font-semibold uppercase tracking-widest mb-3">
                        Available for purchase
                      </p>
                      <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
                        Featured sale listings
                      </h2>
                    </div>
                    <Link
                      href="/units?listing=for-sale"
                      className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-black text-sm transition-colors shrink-0"
                    >
                      View all sale units <ArrowRight size={14} />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredSaleUnits.map((unit) => (
                      <UnitCard key={unit._id} unit={unit} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── HEXA NETWORK ── */}
        <section className="py-24 bg-[#2a3065]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="mb-14">
              <p className="text-white/50 text-sm font-semibold uppercase tracking-widest mb-3">
                The Hexa Network
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight max-w-xl">
                Three nodes. One community.
              </h2>
              <p className="text-white/60 text-base leading-relaxed mt-4 max-w-2xl">
                Hexa Hub sits within a broader network of Hexa spaces across Melbourne — connecting industrial operations, co-working, and retail presence into a single community.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Hexa Hub",
                  location: "Huntingdale",
                  desc: "Business infrastructure platform. Warehouses, storage, showrooms, and offices with an integrated partner ecosystem.",
                  href: "/" as string,
                  badge: "You are here",
                  current: true,
                  external: false,
                },
                {
                  name: "Hexa Space",
                  location: "Box Hill",
                  desc: "Co-working and flexible office space for early-stage brands, remote teams, and entrepreneurs entering the Australian market.",
                  href: "https://hexaspace.com.au",
                  badge: null,
                  current: false,
                  external: true,
                },
                {
                  name: "Retail Presence",
                  location: "369 Lonsdale St + 878 Whitehorse Rd",
                  desc: "Physical retail and pop-up space at Melbourne CBD and Box Hill — test, sell, and build brand presence without a long-term commitment.",
                  href: "/retail",
                  badge: null,
                  current: false,
                  external: false,
                },
              ].map((node) => (
                <Link
                  key={node.name}
                  href={node.href}
                  {...(node.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group border p-8 transition-colors ${
                    node.current
                      ? "border-white/40 bg-white/10"
                      : "border-white/20 hover:border-white/40 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-1">
                        {node.location}
                      </p>
                      <h3 className="text-white font-bold text-xl">{node.name}</h3>
                    </div>
                    {node.badge && (
                      <span className="text-[#2a3065] bg-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 shrink-0">
                        {node.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{node.desc}</p>
                  <div className="flex items-center gap-1 text-white/40 group-hover:text-white/70 text-xs transition-colors">
                    <span>Learn more</span>
                    <ArrowRight size={11} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── SIMPLE PRICING ── */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left: content */}
              <div>
                <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-4">
                  Simple Pricing
                </p>
                <h2 className="font-inter-tight font-medium text-3xl sm:text-4xl text-[rgb(36,43,43)] tracking-tight mb-5">
                  Scale without upfront{" "}
                  <span className="font-besley font-medium italic underline decoration-[#2a3065] decoration-[3px] underline-offset-[4px]">
                    chaos
                  </span>
                </h2>
                <p className="text-[#555555] text-base leading-relaxed mb-10 max-w-lg">
                  Our flexible month-to-month memberships grow as you do. No long-term industrial leases — just the space and support you need.
                </p>
                <div className="flex flex-col gap-6">
                  {[
                    {
                      Icon: ShieldCheck,
                      title: "Transparent costs",
                      desc: "Know exactly what you pay for space and support.",
                    },
                    {
                      Icon: RefreshCw,
                      title: "Month-to-month",
                      desc: "Flex up or down as your business changes.",
                    },
                  ].map(({ Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-4">
                      <div className="shrink-0 w-9 h-9 rounded-full bg-[#2a3065]/8 flex items-center justify-center mt-0.5">
                        <Icon size={16} className="text-[#2a3065]" />
                      </div>
                      <div>
                        <div className="font-inter-tight font-semibold text-[rgb(36,43,43)] text-sm mb-0.5">
                          {title}
                        </div>
                        <div className="text-[#6B6B6B] text-sm leading-relaxed">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: pricing card */}
              <div className="bg-[#2a3065] rounded-2xl p-10 lg:p-12 flex flex-col min-h-[420px] justify-between">
                <div>
                  <p className="text-[#C8922A] text-[11px] font-semibold uppercase tracking-widest mb-6">
                    Starting at
                  </p>
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="font-inter-tight font-semibold text-[72px] leading-none text-white">
                      $400
                    </span>
                    <span className="text-white/50 text-xl">/month</span>
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed max-w-xs">
                    Pricing varies by location, suite size, and availability. All units include basic amenities and member perks.
                  </p>
                </div>
                <div className="mt-10">
                  <Link
                    href="/spaces"
                    className="inline-flex items-center gap-2 bg-white hover:bg-[#F5F5F5] text-[#2a3065] font-semibold px-8 py-3.5 rounded-full transition-colors duration-200 text-sm"
                  >
                    See pricing &amp; availability <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── LOCATION ── */}
        <section className="py-24 bg-[#F5F5F5] border-y border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                  Location
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight mb-4">
                  Huntingdale, Melbourne.
                </h2>
                <p className="text-[#6B6B6B] text-base leading-relaxed mb-8">
                  Positioned in Melbourne&apos;s south-east industrial corridor, Hexa Hub sits minutes from the
                  Monash Freeway and is surrounded by Oakleigh, Clayton, and Mulgrave trade precincts.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Minutes to Monash Freeway (M1) via Springvale Rd",
                    "Close to Oakleigh and Clayton commercial hubs",
                    "Nearby Huntingdale and Oakleigh train stations",
                    "7 Distribution Circuit, Huntingdale VIC 3166",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#555555]">
                      <CheckCircle size={14} className="text-[#2a3065] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://maps.google.com/?q=7+Distribution+Circuit+Huntingdale+VIC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-6 py-3 text-sm transition-colors"
                >
                  Get directions <ArrowRight size={14} />
                </a>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EBEBEB]">
                <Image
                  src="/renders/Aerial.jpg"
                  alt="Aerial view of Hexa Hub estate at Huntingdale"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-black tracking-tight mb-4">
              Ready to operate at Hexa Hub?
            </h2>
            <p className="text-[#6B6B6B] text-lg mb-10 max-w-xl mx-auto">
              Speak to the team about spaces, membership options, and what the Hexa Hub ecosystem can do for
              your business.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-8 py-4 text-base transition-colors"
              >
                Enquire Now <ArrowRight size={16} />
              </Link>
              <Link
                href="/units"
                className="inline-flex items-center gap-2 border border-[#E5E5E5] hover:border-[#999] text-black font-semibold px-8 py-4 text-base transition-colors"
              >
                Browse Spaces
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
