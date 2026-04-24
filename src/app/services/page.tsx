import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Boxes,
  Truck,
  Layers,
  PackageCheck,
  Send,
  Lock,
  Wrench,
  Building2,
  Zap,
  type LucideProps,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getServices, type Service } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Operational services at Hexa Hub — container handling, forklift hire, pallet logistics, packaging, dispatch, and site operations for members.",
};

export const dynamic = "force-dynamic";

// Lucide icon map — icon names stored as strings in Sanity resolve to components here
type IconComponent = React.ComponentType<LucideProps>;
const ICON_MAP: Record<string, IconComponent> = {
  Boxes,
  Truck,
  Layers,
  PackageCheck,
  Send,
  Lock,
  Wrench,
  Building2,
  Zap,
};

// Seed data — used when no services exist in Sanity yet.
// Add these 9 records in Sanity Studio to enable CMS-managed pricing.
const FALLBACK_SERVICES: Service[] = [
  {
    _id: "f1",
    title: "Container Loading / Unloading",
    icon: "Boxes",
    description: "Labour coordination and on-site handling for inbound or outbound containers.",
    pricing: "POA",
    category: "logistics",
    order: 1,
  },
  {
    _id: "f2",
    title: "Forklift Hire (on-site)",
    icon: "Truck",
    description: "Forklift access with trained operator for palletised goods.",
    pricing: "$120/hour",
    category: "logistics",
    order: 2,
  },
  {
    _id: "f3",
    title: "Pallet Handling",
    icon: "Layers",
    description: "Movement, staging, and positioning of pallets within loading zones.",
    pricing: "$25–$45 per pallet",
    category: "logistics",
    order: 3,
  },
  {
    _id: "f4",
    title: "Packaging & Dispatch Support",
    icon: "PackageCheck",
    description: "Pick, pack, labelling, and preparation for shipment.",
    pricing: "$2.50–$6.00/unit",
    category: "logistics",
    order: 4,
  },
  {
    _id: "f5",
    title: "Shipping & Parcel Processing",
    icon: "Send",
    description: "Daily parcel processing via Australia Post and partner couriers.",
    pricing: "Included",
    category: "shipping",
    order: 5,
  },
  {
    _id: "f6",
    title: "Goods-Out Cage / Secure Holding",
    icon: "Lock",
    description: "Dedicated secure outbound holding area prior to dispatch.",
    pricing: "$100/month",
    category: "logistics",
    order: 6,
  },
  {
    _id: "f7",
    title: "Shared Equipment Access",
    icon: "Wrench",
    description: "Use of pallet jacks, trolleys, and handling equipment.",
    pricing: "Included",
    category: "logistics",
    order: 7,
  },
  {
    _id: "f8",
    title: "Body Corporate & Site Operations",
    icon: "Building2",
    description: "Common area maintenance, security, insurance, and site management.",
    pricing: "POA",
    category: "site-ops",
    order: 8,
  },
  {
    _id: "f9",
    title: "Utilities & Operational Services",
    icon: "Zap",
    description: "Electricity, lighting, waste management, and shared infrastructure.",
    pricing: "POA",
    category: "site-ops",
    order: 9,
  },
];

const DIFFERENCE_GROUPS = [
  {
    title: "Core Logistics & Shipping Benefits",
    items: [
      "MyPost Business account setup and management support",
      "eParcel for high-volume shipping (subject to eligibility)",
      "StarTrack services with preferential member rates",
      "Courier familiarity with site access and loading zones",
    ],
  },
  {
    title: "Operations & Handling Capabilities",
    items: [
      "Container loading/unloading coordination",
      "On-site forklift access with trained operators",
      "Pallet handling, staging, and internal movement",
      "Goods-out cages and secure outbound holding",
      "Shared handling equipment (pallet jacks, trolleys)",
    ],
  },
  {
    title: "Site & Infrastructure Benefits",
    items: [
      "Business-grade loading and access zones",
      "Secure site access and controlled environments",
      "Shared operational infrastructure designed for logistics use",
      "Body corporate, site management, and common area maintenance handled centrally",
      "Utilities and waste management integrated into site operations",
    ],
  },
  {
    title: "Flexibility & Cost Structure",
    items: [
      "Usage-based pricing for operational services",
      "No requirement to lock into fixed service packages",
      "Ability to scale services during peak periods",
      "Reduced setup and coordination costs for new operators",
    ],
  },
  {
    title: "Business & Ecosystem Advantages",
    items: [
      "Access to aligned service partners familiar with the Hexa Hub environment",
      "Practical operational support when required",
      "Community of businesses operating in logistics, trade, and e-commerce",
      "Reduced reliance on external vendors unfamiliar with the site",
    ],
  },
];

function PricingBadge({ pricing }: { pricing?: string }) {
  if (!pricing) return null;
  const isIncluded = pricing === "Included";
  return (
    <div className={`mt-4 pt-4 border-t border-[#E5E5E5]`}>
      <span className="text-[#6B6B6B] text-xs block mb-0.5">Pricing</span>
      <span
        className={`text-sm font-bold ${
          isIncluded ? "text-[#2a3065]" : "text-black"
        }`}
      >
        {isIncluded ? (
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle size={13} className="text-[#2a3065]" />
            Included
          </span>
        ) : (
          pricing
        )}
      </span>
    </div>
  );
}

export default async function ServicesPage() {
  const sanityServices = await getServices().catch(() => []);
  const services = sanityServices.length > 0 ? sanityServices : FALLBACK_SERVICES;

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">

        {/* ── HERO ── */}
        <div className="bg-[#2a3065] py-20">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <p className="text-white/50 text-sm font-semibold uppercase tracking-widest mb-3">
              Platform services
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.0] mb-6 max-w-3xl">
              Business-Ready Ecosystem
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">
              Hexa Hub is designed as a business-ready ecosystem for operators who need more than just space.
              Built around logistics, fulfilment, and scalable operations, Hexa Hub integrates physical
              infrastructure with trusted service partners — allowing businesses to move faster without
              rebuilding systems from scratch.
            </p>
          </div>
        </div>

        {/* ── SERVICES GRID ── */}
        <section className="py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="mb-12">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                What&apos;s available
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight mb-4">
                Breakdown of services
              </h2>
              <p className="text-[#6B6B6B] text-sm max-w-xl leading-relaxed">
                Services are charged per use or included as part of membership, depending on operational requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon: IconComponent = ICON_MAP[service.icon ?? ""] ?? Boxes;
                return (
                  <div
                    key={service._id}
                    className="border border-[#E5E5E5] p-6 flex flex-col"
                  >
                    <div className="w-10 h-10 bg-[#2a3065]/10 flex items-center justify-center mb-4 shrink-0">
                      <Icon size={18} className="text-[#2a3065]" />
                    </div>
                    <h3 className="text-black font-bold text-base mb-2">{service.title}</h3>
                    {service.description && (
                      <p className="text-[#6B6B6B] text-sm leading-relaxed flex-1">
                        {service.description}
                      </p>
                    )}
                    <PricingBadge pricing={service.pricing} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── THE HEXA HUB DIFFERENCE ── */}
        <section className="py-24 bg-[#F5F5F5] border-y border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="mb-14">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                Why it matters
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
                The Hexa Hub Difference
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {DIFFERENCE_GROUPS.map(({ title, items }) => (
                <div key={title} className="bg-white border border-[#E5E5E5] p-6">
                  <h3 className="text-black font-bold text-sm mb-5 leading-snug">{title}</h3>
                  <ul className="space-y-2.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#555555]">
                        <CheckCircle size={13} className="text-[#2a3065] mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AUSTRALIA POST PARTNERSHIP ── */}
        <section className="py-24 bg-white border-t border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="max-w-2xl">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                Partnership
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight mb-6">
                Australia Post Business
              </h2>
              <p className="text-[#6B6B6B] text-base leading-relaxed mb-4">
                As an Australia Post business partner, Hexa Hub tenants gain streamlined access to
                shipping and fulfilment services — including business shipping rates, parcel solutions,
                and integration options that support operating at scale from the Hub.
              </p>
              <p className="text-[#6B6B6B] text-base leading-relaxed mb-8">
                Visit{" "}
                <a
                  href="https://auspost.com.au/business"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2a3065] underline hover:no-underline"
                >
                  Australia Post Business
                </a>{" "}
                to explore their full range of services.
              </p>
              <a
                href="https://auspost.com.au/business"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-8 py-4 text-base transition-colors"
              >
                Visit Australia Post Business <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 bg-white border-t border-[#E5E5E5]">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-4xl font-bold text-black tracking-tight mb-4">
              Ready to put the platform to work?
            </h2>
            <p className="text-[#6B6B6B] text-lg mb-10 max-w-xl mx-auto">
              Speak to the team about your operational requirements and what services are available for your business.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-8 py-4 text-base transition-colors"
              >
                Enquire Now <ArrowRight size={16} />
              </Link>
              <a
                href="tel:+61406016666"
                className="inline-flex items-center gap-2 border border-[#E5E5E5] hover:border-[#999] text-black font-semibold px-8 py-4 text-base transition-colors"
              >
                +61 406 016 666
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
