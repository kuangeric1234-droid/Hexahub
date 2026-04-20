import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hexa Hub is a business infrastructure platform at Huntingdale, Melbourne — built by the Hexa Group to help brands land, operate, and grow in Australia.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">
        <div className="bg-[#F5F5F5] border-b border-[#E5E5E5] py-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-2">About us</p>
            <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">About Hexa Hub</h1>
            <p className="text-[#6B6B6B] mt-3 text-base max-w-2xl leading-relaxed">
              More than a leasing business — a platform built to give brands everything they need to operate in Australia.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-20">

          {/* Platform story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">Our story</p>
              <h2 className="text-3xl font-black text-black tracking-tight mb-6">
                Built for brands building in Australia.
              </h2>
              <div className="space-y-4 text-[#555555] text-base leading-relaxed">
                <p>
                  Hexa Hub is the operational core of Hexa Group — a Melbourne-based platform built to help businesses, particularly those from Chinese-speaking markets, land, set up, and grow in Australia.
                </p>
                <p>
                  Our precinct at 7 Distribution Circuit, Huntingdale is purpose-built with warehouses, storage, showrooms, and offices — plus a connected ecosystem of logistics, digital, and fulfilment partners embedded from day one.
                </p>
                <p>
                  Every unit is move-in ready. Every member gets immediate access to the Hexa ecosystem — Australia Post logistics, Digitec IT, EIZ Technology supply chain, and direct mentorship. You don&apos;t just get space. You get infrastructure.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/renders/Aerial.jpg"
                alt="Aerial view of Hexa Hub precinct at Huntingdale"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Founder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="bg-[#F5F5F5] border border-[#E5E5E5] p-8">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-4">Founder</p>
              <h2 className="text-2xl font-black text-black tracking-tight mb-1">Alex Xiao</h2>
              <p className="text-[#6B6B6B] text-sm mb-6">Founder &amp; Director, Hexa Group</p>
              <div className="space-y-4 text-[#555555] text-sm leading-relaxed">
                <p>
                  Alex founded Hexa Group to bridge the gap between Chinese-speaking markets and the Australian business landscape. With a background in cross-border e-commerce and property, he identified a recurring challenge: businesses entering Australia had the products and the ambition, but lacked the operational infrastructure to establish themselves quickly and credibly.
                </p>
                <p>
                  Hexa Hub is his answer — a physical and connected platform that compresses the time it takes to go from arriving in Australia to operating at scale. The ecosystem of partners embedded within Hexa Hub reflects the specific needs Alex observed across hundreds of brands navigating cross-border logistics, digital presence, and fulfilment.
                </p>
              </div>
            </div>
            <div>
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-4">Our approach</p>
              <div className="space-y-6">
                {[
                  {
                    title: "Physical infrastructure first",
                    desc: "A premium precinct — high-spec units, shared amenities, and 24/7 access — designed so you operate like an established business from day one.",
                  },
                  {
                    title: "Ecosystem, not just landlord",
                    desc: "Partners in supply chain, digital, logistics, and mentorship are built into the platform. You don't source them separately — they're already here.",
                  },
                  {
                    title: "Built for cross-border operators",
                    desc: "Hexa Hub is purpose-fit for brands entering Australia from Chinese-speaking markets — Chinese-speaking staff, bilingual support, and a network that understands the journey.",
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-1 bg-[#2a3065] shrink-0 mt-1" />
                    <div>
                      <div className="text-black font-semibold text-sm mb-1">{title}</div>
                      <div className="text-[#6B6B6B] text-sm leading-relaxed">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hexa Network */}
          <div>
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">The Hexa Network</p>
            <h2 className="text-3xl font-black text-black tracking-tight mb-4">
              Three nodes. One community.
            </h2>
            <p className="text-[#6B6B6B] text-base leading-relaxed mb-8 max-w-2xl">
              Hexa Hub is part of a wider network of Hexa spaces across Melbourne — connecting industrial operations, co-working, and retail presence.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  name: "Hexa Hub",
                  location: "Huntingdale",
                  desc: "Business infrastructure platform with warehouses, storage, showrooms, and offices. The operational core of the Hexa network.",
                  current: true,
                },
                {
                  name: "Hexa Space",
                  location: "Melbourne CBD",
                  desc: "Co-working and flexible office space for early-stage brands, remote teams, and entrepreneurs entering the Australian market.",
                  current: false,
                },
                {
                  name: "Retail Presence",
                  location: "369 Lonsdale St + 878 Whitehorse Rd",
                  desc: "Physical retail and pop-up space at Melbourne CBD and Box Hill — test, sell, and build brand presence.",
                  current: false,
                },
              ].map(({ name, location, desc, current }) => (
                <div
                  key={name}
                  className={`border p-6 ${current ? "border-[#2a3065]/40 bg-[#2a3065]/5" : "border-[#E5E5E5] bg-[#F5F5F5]"}`}
                >
                  <p className="text-[#6B6B6B] text-xs font-semibold uppercase tracking-widest mb-1">{location}</p>
                  <h3 className="text-black font-bold text-base mb-2">{name}</h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">Location</p>
            <h2 className="text-3xl font-black text-black tracking-tight mb-8">
              Huntingdale, Melbourne&apos;s south-east corridor.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  title: "Freeway access",
                  desc: "Minutes from Monash Freeway (M1) via Springvale Road — connect to the entire metro freight network.",
                },
                {
                  title: "Trade precinct",
                  desc: "Surrounded by Oakleigh, Clayton, and Mulgrave industrial hubs — be where your suppliers and customers already are.",
                },
                {
                  title: "Public transport",
                  desc: "Huntingdale and Oakleigh train stations nearby. Staff can get here without a car.",
                },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-[#F5F5F5] border border-[#E5E5E5] p-6">
                  <h3 className="text-black font-bold text-base mb-2">{title}</h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hexa Space link */}
          <div className="bg-[#F5F5F5] border border-[#E5E5E5] p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-2">Part of the network</p>
              <h3 className="text-black font-bold text-xl">Hexa Space</h3>
              <p className="text-[#6B6B6B] text-sm mt-1">
                Co-working and private offices in Melbourne CBD for brands building their Australian presence.
              </p>
            </div>
            <a
              href="https://hexaspace.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#E5E5E5] hover:border-[#999] text-black font-semibold px-6 py-3 text-sm transition-colors shrink-0"
            >
              Visit Hexa Space <ExternalLink size={13} />
            </a>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
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
      </main>
      <Footer />
    </>
  );
}
