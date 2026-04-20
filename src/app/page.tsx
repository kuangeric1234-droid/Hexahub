import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin, Clock, Zap, Shield } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import UnitCard from "@/components/units/UnitCard";
import { getFeaturedLeaseUnits, getFeaturedSaleUnits, getSiteSettings } from "@/lib/sanity/queries";

const SERVICE_CARDS = [
  {
    type: "warehouse",
    title: "Warehouse Units",
    desc: "223–438m² with 3-phase power, roller doors, and mezzanine offices. Built for ecommerce operators, importers, and light manufacturers.",
    href: "/units?type=warehouse",
    img: "/renders/Internal.jpg",
  },
  {
    type: "storage",
    title: "Storage Spaces",
    desc: "31–75m² drive-through storage with 24/7 wireless keypad access. Perfect for tradespeople, seasonal stock, and equipment.",
    href: "/units?type=storage",
    img: "/renders/Storage Final Image LOW RES.jpg",
  },
  {
    type: "office-warehouse",
    title: "Office + Warehouse",
    desc: "240m² over two levels — full floor office above, warehouse with tilt door below. Street frontage on Distribution Circuit.",
    href: "/units?type=office-warehouse",
    img: "/renders/Mezzanine.jpg",
  },
  {
    type: "office",
    title: "Office Spaces",
    desc: "128–136m² private offices with natural light and district views. Ground floor and first floor options with direct street access.",
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

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredLeaseUnits, featuredSaleUnits, settings] = await Promise.all([
    getFeaturedLeaseUnits().catch(() => []),
    getFeaturedSaleUnits().catch(() => []),
    getSiteSettings().catch(() => null),
  ]);

  const headline = settings?.heroHeadline ?? "Your business needs space. We have it.";
  const subheadline = settings?.heroSubheadline ?? "Warehouse units, storage lots, and office spaces available now at Huntingdale, Melbourne.";

  return (
    <>
      <Header />
      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-end pb-24 pt-16 overflow-hidden">
          <Image
            src="/renders/Block H Front.jpg"
            alt="HexaHub warehouse units at Huntingdale"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
          {/* Right-side vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />

          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <div className="max-w-3xl">
              {/* Location tag */}
              <div className="flex items-center gap-2 mb-6">
                <MapPin size={14} className="text-[#2a3065]" />
                <span className="text-white/70 text-sm font-medium tracking-wide">
                  Huntingdale, Melbourne VIC
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.0] tracking-tight mb-6">
                {headline}
              </h1>
              <p className="text-white/60 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
                {subheadline}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/units"
                  className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-8 py-4 text-base transition-colors duration-200"
                >
                  Browse Available Units
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact#book-tour"
                  className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 text-base transition-colors duration-200"
                >
                  Book a Tour
                </Link>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-10 pt-10 border-t border-white/10">
                {[
                  ["16", "Units Available"],
                  ["31–438", "m² Range"],
                  ["12mo", "Min. Lease Term"],
                  ["24/7", "Site Access"],
                ].map(([val, label]) => (
                  <div key={label}>
                    <div className="text-white font-black text-2xl">{val}</div>
                    <div className="text-white/50 text-xs mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                  What&apos;s available
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
                  Four types of space.<br />One address.
                </h2>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-black text-sm transition-colors shrink-0"
              >
                View all services <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICE_CARDS.map((card) => (
                <Link
                  key={card.type}
                  href={card.href}
                  className="group relative overflow-hidden bg-[#F5F5F5] border border-[#E5E5E5] hover:border-[#2a3065]/50 transition-all duration-300 aspect-[4/5] flex flex-col justify-end"
                >
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-50"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="relative p-5">
                    <h3 className="text-white font-bold text-lg leading-tight mb-2">{card.title}</h3>
                    <p className="text-white/60 text-sm leading-snug line-clamp-3">{card.desc}</p>
                    <div className="flex items-center gap-1 text-[#2a3065] text-xs font-medium mt-3 group-hover:gap-2 transition-all">
                      <span className="text-white/80">View units</span>
                      <ArrowRight size={11} className="text-white/80" />
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
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

              {/* For Lease row */}
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

              {/* For Sale row */}
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

        {/* ── WHY HEXA HUB ── */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                  Why HexaHub
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-6">
                  Built for businesses<br />that mean business.
                </h2>
                <p className="text-[#6B6B6B] text-base leading-relaxed mb-8">
                  HexaHub Huntingdale is a brand-new industrial precinct purpose-built for modern operators. Every unit is finished to a high spec — polished concrete, LED high-bay lighting, CCTV, and NBN — so you can start operating on day one.
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
                    alt="The Hub — communal amenity at HexaHub"
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
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                  Location
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-4">
                  Huntingdale, Melbourne.
                </h2>
                <p className="text-[#6B6B6B] text-base leading-relaxed mb-8">
                  Positioned in Melbourne&apos;s south-east industrial corridor, HexaHub sits minutes from the Monash Freeway and is surrounded by Oakleigh, Clayton, and Mulgrave trade precincts.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Minutes to Monash Freeway (M1) via Springvale Rd",
                    "Close to Oakleigh and Clayton commercial hubs",
                    "Nearby Huntingdale and Oakleigh train stations",
                    "17-31 Franklyn Street, Huntingdale VIC 3166",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#555555]">
                      <CheckCircle size={14} className="text-[#2a3065] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-6 py-3 text-sm transition-colors"
                >
                  Get directions <ArrowRight size={14} />
                </Link>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EBEBEB]">
                <Image
                  src="/renders/Aerial.jpg"
                  alt="Aerial view of HexaHub estate at Huntingdale"
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
              Ready to find your space?
            </h2>
            <p className="text-[#6B6B6B] text-lg mb-10 max-w-xl mx-auto">
              All units are available now on 12-month minimum leases. Prices exclude GST and outgoings.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/units"
                className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-8 py-4 text-base transition-colors"
              >
                Browse Available Units <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[#E5E5E5] hover:border-[#999] text-black font-semibold px-8 py-4 text-base transition-colors"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
