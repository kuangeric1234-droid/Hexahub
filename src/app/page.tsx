import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin, Clock, Zap, Shield, Package, Network } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import UnitCard from "@/components/units/UnitCard";
import { getFeaturedLeaseUnits, getFeaturedSaleUnits, getSiteSettings, getPartners, getMembers } from "@/lib/sanity/queries";

const SPACE_TYPES = [
  {
    type: "warehouse",
    category: "WAREHOUSE",
    title: "Warehouses",
    desc: "223–438m² with 3-phase power, roller doors, and mezzanine offices. Built for importers and e-commerce operators.",
    href: "/units?type=warehouse",
    img: "/renders/Internal.jpg",
  },
  {
    type: "storage",
    category: "STORAGE",
    title: "Storage Spaces",
    desc: "31–75m² drive-through storage with 24/7 wireless keypad access. Flexible monthly memberships available.",
    href: "/units?type=storage",
    img: "/renders/Storage Final Image LOW RES.jpg",
  },
  {
    type: "showroom-warehouse",
    category: "WAREHOUSE",
    title: "Showroom + Warehouse",
    desc: "Dual-purpose units combining street-facing showroom space with operational warehouse behind.",
    href: "/units?type=showroom-warehouse",
    img: "/renders/Block H Front.jpg",
  },
  {
    type: "office-warehouse",
    category: "WAREHOUSE",
    title: "Office + Warehouse",
    desc: "240m² over two levels — full-floor office above, warehouse with tilt door below. Street frontage.",
    href: "/units?type=office-warehouse",
    img: "/renders/Mezzanine.jpg",
  },
  {
    type: "office",
    category: "OFFICE",
    title: "Offices",
    desc: "128–136m² private offices with natural light and district views. Ground and first floor options.",
    href: "/units?type=office",
    img: "/renders/Block B Front.jpg",
  },
];

const TRUST_ITEMS = [
  { icon: Clock, title: "24/7 Access", desc: "Wireless keypad entry around the clock, every day of the year." },
  { icon: Shield, title: "Secure Site", desc: "24-hour CCTV throughout the estate and bollard protection." },
  { icon: Zap, title: "3-Phase Power", desc: "Warehouse units come with 3-phase power as standard." },
  { icon: MapPin, title: "Prime Location", desc: "Minutes from Monash Freeway, Oakleigh, and Clayton industrial precincts." },
];

const PILLARS = [
  {
    icon: Package,
    label: "Space",
    title: "Five types of space, one address.",
    body: "Warehouses, storage, showrooms, offices, and combined office-warehouse units from 31–438m² at Huntingdale. Purpose-built, high-spec, and available now.",
  },
  {
    icon: Zap,
    label: "Operations",
    title: "Infrastructure that works from day one.",
    body: "3-phase power, roller doors, loading zones, 24/7 keypad access, NBN, CCTV, and The Hub — a shared lounge and meeting space included for every tenant.",
  },
  {
    icon: Network,
    label: "Ecosystem",
    title: "A network of partners built in.",
    body: "Every member plugs into EIZ Technology, Digitec IT, Australia Post logistics, and direct mentorship — the partners you need to land and grow in Australia.",
  },
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredLeaseUnits, featuredSaleUnits, settings, partners, members] = await Promise.all([
    getFeaturedLeaseUnits().catch(() => []),
    getFeaturedSaleUnits().catch(() => []),
    getSiteSettings().catch(() => null),
    getPartners().catch(() => []),
    getMembers().catch(() => []),
  ]);


  return (
    <>
      <Header />
      <main>
        {/* ── HERO ── */}
        <section className="bg-white pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* ── Left: text column ── */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#2a3065] leading-[1.1] tracking-tight mb-6">
                  Flexible{" "}
                  <span className="italic underline decoration-[#2a3065] decoration-[5px] underline-offset-[5px]">space</span>
                  , on-site{" "}
                  <span className="italic underline decoration-[#2a3065] decoration-[5px] underline-offset-[5px]">operations</span>
                  {" "}and an{" "}
                  <span className="italic underline decoration-[#2a3065] decoration-[5px] underline-offset-[5px]">ecosystem</span>
                  {" "}built for brands scaling in Australia
                </h1>

                <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl">
                  Hexa Hub is a business infrastructure platform at Huntingdale, Melbourne — giving brands the space, operations, and partners to land and scale in Australia.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-12">
                  <Link
                    href="/contact#book-tour"
                    className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-8 py-4 text-base transition-colors duration-200"
                  >
                    Book a tour
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[#2a3065] font-semibold text-base hover:underline transition-colors duration-200"
                  >
                    Speak to our team <ArrowRight size={16} />
                  </Link>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap gap-x-8 gap-y-4 pt-8 border-t border-[#E5E5E5]">
                  {[
                    ["5", "Space Types"],
                    ["31–438", "m² Range"],
                    ["4", "Ecosystem Partners"],
                    ["24/7", "Site Access"],
                  ].map(([val, label]) => (
                    <div key={label}>
                      <div className="text-[#2a3065] font-black text-2xl">{val}</div>
                      <div className="text-gray-500 text-xs uppercase tracking-wide mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right: media column ── */}
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="/renders/Aerial.jpg"
                    alt="Hexa Hub precinct aerial view, Huntingdale Melbourne"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Pull-quote overlay */}
                <div className="absolute bottom-6 left-6 bg-[#2a3065] text-white rounded-xl p-5 max-w-[260px] shadow-lg">
                  <p className="text-sm font-semibold leading-snug">
                    More than a lease. A business platform for brands landing and growing in Australia.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── THREE PILLARS ── */}
        <section className="py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="mb-14">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                The platform
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight max-w-xl">
                More than a lease. A complete operating platform.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PILLARS.map(({ icon: Icon, label, title, body }) => (
                <div key={label} className="border border-[#E5E5E5] p-8">
                  <div className="w-10 h-10 bg-[#2a3065]/10 flex items-center justify-center mb-6">
                    <Icon size={18} className="text-[#2a3065]" />
                  </div>
                  <p className="text-[#2a3065] text-xs font-semibold uppercase tracking-widest mb-3">{label}</p>
                  <h3 className="text-black font-bold text-lg leading-snug mb-3">{title}</h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">{body}</p>
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
                  <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
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
                <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
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

            <div className="space-types-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {SPACE_TYPES.map((card) => (
                <Link
                  key={card.type}
                  href={card.href}
                  className="space-type-card group relative overflow-hidden bg-[#F5F5F5] border border-[#E5E5E5] transition-all duration-300 ease-out aspect-[3/4] flex flex-col justify-end"
                >
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                  {/* Gradient overlay — fades on hover via CSS */}
                  <div className="space-card-overlay absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-300" />
                  {/* Sibling-dim overlay — becomes visible on non-hovered cards via CSS :has() */}
                  <div className="space-card-dim absolute inset-0 bg-black opacity-0 transition-opacity duration-300 pointer-events-none" />
                  <div className="relative p-4">
                    <p className="text-white/40 text-[10px] font-medium uppercase tracking-[0.09em] mb-1">{card.category}</p>
                    <h3 className="text-white font-bold text-sm leading-tight mb-1.5">{card.title}</h3>
                    <p className="text-white/60 text-xs leading-snug line-clamp-3">{card.desc}</p>
                    <div className="flex items-center gap-1 mt-2.5">
                      <span className="text-white/80 text-xs">View units</span>
                      <span className="space-card-arrow inline-flex transition-transform duration-300 ease-out">
                        <ArrowRight size={10} className="text-white/80" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
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
                      <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
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
                      <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
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
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight max-w-xl">
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
                  href: "/ecosystem#retail",
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

        {/* ── MEMBERS ── */}
        {members.length > 0 && (
          <section className="py-24 bg-white border-b border-[#E5E5E5]">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
              <div className="mb-12">
                <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                  Community
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
                  Businesses operating at Hexa Hub.
                </h2>
              </div>
              <div className="flex flex-wrap gap-4">
                {members.map((member) => (
                  <div
                    key={member._id}
                    className="border border-[#E5E5E5] px-6 py-4 flex items-center justify-center min-w-[140px]"
                  >
                    <span className="text-[#555555] text-sm font-medium">{member.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── WHY HEXA HUB ── */}
        <section className="py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                  Why Hexa Hub
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-6">
                  Built for brands<br />building in Australia.
                </h2>
                <p className="text-[#6B6B6B] text-base leading-relaxed mb-8">
                  Every unit at Hexa Hub is finished to a high specification — polished concrete, LED high-bay
                  lighting, NBN, and CCTV — so you start operating from day one. No setup friction, no hidden
                  infrastructure gaps.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {TRUST_ITEMS.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex gap-3">
                      <div className="shrink-0 w-8 h-8 bg-[#2a3065]/10 flex items-center justify-center mt-0.5">
                        <Icon size={15} className="text-[#2a3065]" />
                      </div>
                      <div>
                        <div className="text-black font-semibold text-sm">{title}</div>
                        <div className="text-[#6B6B6B] text-sm mt-0.5">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/renders/The Hub @ Found Spaces.jpg"
                    alt="The Hub — communal amenity at Hexa Hub"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white border border-[#E5E5E5] p-5 max-w-[220px]">
                  <div className="text-black font-black text-2xl mb-1">The Hub</div>
                  <div className="text-[#555555] text-xs leading-snug">
                    Exclusive communal lounge, pool table, meeting room, and kitchen — free for all tenants.
                  </div>
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
                <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-4">
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
            <h2 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
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
