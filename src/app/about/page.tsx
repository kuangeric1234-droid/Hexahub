import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hexa Hub is part of a deliberate vision — to build commercial environments where businesses don't just occupy space, but operate, grow, and connect.",
};

const ECOSYSTEM_NODES = [
  {
    name: "Hexa Space",
    desc: "Coworking and community for founders and early-stage businesses.",
    href: "https://hexaspace.com.au",
    external: true,
    current: false,
  },
  {
    name: "Hexa Hub",
    location: "Found Huntingdale",
    desc: "Operational infrastructure for scaling businesses, at Found Huntingdale.",
    href: "/",
    external: false,
    current: true,
  },
  {
    name: "369 Lonsdale Street",
    location: "Melbourne CBD",
    desc: "Indoor pop-up retail space in Melbourne CBD for brand showcases, product launches, and offline-to-online activation.",
    href: "/ecosystem#retail",
    external: false,
    current: false,
  },
  {
    name: "878 Whitehorse Road",
    location: "Box Hill",
    desc: "Outdoor pop-up location for events, hospitality activations, and small pop-up stands.",
    href: "/ecosystem#retail",
    external: false,
    current: false,
  },
];

const LEADERSHIP = [
  {
    name: "William Yang",
    title: "Co-founder & CEO, Hexa Group",
    bio: "As CEO of Hexa Group, William brings extensive expertise in finance, capital, legal, development management, and marketing. He has delivered landmark projects in Melbourne, including Swanston Central, Light House, and The William. With master's degrees in Business Law and Accounting, William's leadership drives Hexa's continued growth.",
  },
  // Additional leadership profiles can be added here
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">

        {/* ── PAGE HEADER ── */}
        <div className="bg-[#F5F5F5] border-b border-[#E5E5E5] py-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-2">About us</p>
            <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">About Hexa Hub</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-20">

          {/* ── SECTION 1: A new kind of business infrastructure ── */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">Vision</p>
              <h2 className="text-3xl font-black text-black tracking-tight mb-6">
                A new kind of business infrastructure
              </h2>
              <div className="space-y-4 text-[#555555] text-base leading-relaxed">
                <p>
                  Hexa Hub is part of a deliberate vision — to build commercial environments where businesses
                  don&apos;t just occupy space, but operate, grow, and connect. Built around logistics,
                  fulfilment, and scalable operations, Hexa Hub brings together physical infrastructure,
                  trusted service partners, and an active business community into a single platform.
                </p>
                <p>
                  For cross-border brands entering Australia, and for local businesses consolidating
                  fragmented operations, Hexa Hub offers something most commercial properties don&apos;t:
                  an ecosystem that&apos;s ready on day one.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:pt-14">
              {[
                { title: "Freeway access", desc: "Minutes from Monash Freeway (M1) via Springvale Road — connect to the entire metro freight network." },
                { title: "Trade precinct", desc: "Surrounded by Oakleigh, Clayton, and Mulgrave industrial hubs — be where your suppliers already are." },
                { title: "Public transport", desc: "Huntingdale and Oakleigh train stations nearby. Staff can get here without a car." },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-[#F5F5F5] border border-[#E5E5E5] p-5">
                  <h3 className="text-black font-bold text-sm mb-2">{title}</h3>
                  <p className="text-[#6B6B6B] text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── SECTION 2: Found Huntingdale ── */}
          <section className="border-t border-[#E5E5E5] pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">The precinct</p>
                <h2 className="text-3xl font-black text-black tracking-tight mb-6">Found Huntingdale</h2>
                <div className="space-y-4 text-[#555555] text-base leading-relaxed">
                  <p>
                    Found Huntingdale is the precinct where Hexa Hub has taken shape. More than 22,000 square
                    metres of purpose-built warehouses, storage spaces, office suites, and showroom combinations
                    — all connected by shared amenities, a communal hub, and integrated operational services.
                  </p>
                  <p>
                    It&apos;s a development designed around how modern businesses actually work: efficient
                    loading zones, 24/7 secure access, high-clearance warehouses alongside premium offices,
                    and on-site logistics support. Every detail reflects a core belief that physical space is
                    only useful when it enables the operations that happen inside it.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/units"
                    className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-6 py-3 text-sm transition-colors"
                  >
                    Browse spaces <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 border border-[#E5E5E5] hover:border-[#999] text-black font-semibold px-6 py-3 text-sm transition-colors"
                  >
                    View services
                  </Link>
                </div>
              </div>
              <div className="bg-[#F5F5F5] border border-[#E5E5E5] p-8">
                <p className="text-[#2a3065] text-xs font-semibold uppercase tracking-widest mb-6">At a glance</p>
                <div className="space-y-5">
                  {[
                    ["22,000+", "square metres"],
                    ["5", "space types"],
                    ["7 Distribution Circuit", "Huntingdale VIC 3166"],
                    ["24/7", "site access"],
                  ].map(([val, label]) => (
                    <div key={label} className="flex items-baseline gap-3 border-b border-[#E5E5E5] pb-5 last:border-0 last:pb-0">
                      <span className="text-black font-black text-2xl shrink-0">{val}</span>
                      <span className="text-[#6B6B6B] text-sm">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── SECTION 3: Part of a larger ecosystem ── */}
          <section className="border-t border-[#E5E5E5] pt-20">
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">The Hexa Group</p>
            <h2 className="text-3xl font-black text-black tracking-tight mb-4">
              Part of a larger ecosystem
            </h2>
            <p className="text-[#555555] text-base leading-relaxed mb-10 max-w-2xl">
              Hexa Hub doesn&apos;t stand alone. It&apos;s one part of a connected network developed by Hexa Group:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {ECOSYSTEM_NODES.map((node) => (
                <Link
                  key={node.name}
                  href={node.href}
                  {...(node.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group border p-6 flex flex-col gap-3 transition-colors ${
                    node.current
                      ? "border-[#2a3065]/40 bg-[#2a3065]/5"
                      : "border-[#E5E5E5] hover:border-[#2a3065]/30 bg-[#F5F5F5] hover:bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {node.location && (
                        <p className="text-[#6B6B6B] text-[10px] font-semibold uppercase tracking-widest mb-0.5">
                          {node.location}
                        </p>
                      )}
                      <h3 className="text-black font-bold text-base leading-snug">{node.name}</h3>
                    </div>
                    {node.current && (
                      <span className="text-[#2a3065] bg-[#2a3065]/10 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 shrink-0 mt-0.5">
                        Here
                      </span>
                    )}
                    {node.external && (
                      <ExternalLink size={12} className="text-[#999] shrink-0 mt-0.5" />
                    )}
                  </div>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed flex-1">{node.desc}</p>
                </Link>
              ))}
            </div>
            <p className="text-[#555555] text-sm leading-relaxed mt-8 max-w-3xl border-l-2 border-[#2a3065] pl-4">
              Together, these properties form the <strong className="text-black">Hexa Community</strong> — a
              continuum that supports businesses from first idea through local market entry, operational scale,
              and retail presence.
            </p>
          </section>

          {/* ── SECTION 4: Leadership ── */}
          <section className="border-t border-[#E5E5E5] pt-20">
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">Leadership</p>
            <h2 className="text-3xl font-black text-black tracking-tight mb-10">
              The people behind Hexa Group
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {LEADERSHIP.map(({ name, title, bio }) => (
                <div key={name} className="border border-[#E5E5E5] p-8">
                  <div className="w-12 h-12 bg-[#2a3065] flex items-center justify-center mb-6">
                    <span className="text-white font-black text-lg">{name.charAt(0)}</span>
                  </div>
                  <h3 className="text-black font-bold text-xl mb-1">{name}</h3>
                  <p className="text-[#2a3065] text-xs font-semibold uppercase tracking-widest mb-5">{title}</p>
                  <p className="text-[#555555] text-sm leading-relaxed">{bio}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── SECTION 5: Get in touch ── */}
          <section className="border-t border-[#E5E5E5] pt-20">
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">Contact</p>
            <h2 className="text-3xl font-black text-black tracking-tight mb-8">Get in touch</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <a
                href="https://maps.google.com/?q=7+Distribution+Circuit+Huntingdale+VIC"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 border border-[#E5E5E5] hover:border-[#2a3065]/40 p-6 transition-colors"
              >
                <MapPin size={18} className="text-[#2a3065] shrink-0 mt-0.5" />
                <div>
                  <p className="text-black font-semibold text-sm mb-1">Address</p>
                  <p className="text-[#555555] text-sm leading-relaxed">
                    7 Distribution Circuit<br />Huntingdale VIC 3166
                  </p>
                </div>
              </a>
              <a
                href="mailto:marketing@hexa.com.au"
                className="group flex items-start gap-4 border border-[#E5E5E5] hover:border-[#2a3065]/40 p-6 transition-colors"
              >
                <Mail size={18} className="text-[#2a3065] shrink-0 mt-0.5" />
                <div>
                  <p className="text-black font-semibold text-sm mb-1">Email</p>
                  <p className="text-[#555555] text-sm">marketing@hexa.com.au</p>
                </div>
              </a>
              <a
                href="tel:+61406016666"
                className="group flex items-start gap-4 border border-[#E5E5E5] hover:border-[#2a3065]/40 p-6 transition-colors"
              >
                <Phone size={18} className="text-[#2a3065] shrink-0 mt-0.5" />
                <div>
                  <p className="text-black font-semibold text-sm mb-1">Phone</p>
                  <p className="text-[#555555] text-sm">+61 406 016 666</p>
                </div>
              </a>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-6 py-3 text-sm transition-colors"
            >
              Send an enquiry <ArrowRight size={14} />
            </Link>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
