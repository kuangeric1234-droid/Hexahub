import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Ecosystem",
  description:
    "The Hexa Hub ecosystem — EIZ Technology, Digitec IT, Australia Post, and founder mentorship. Every member plugs into our partner network from day one.",
};

// ── Partner data ──────────────────────────────────────────────────────────────
// [CONFIRM] Review all partner descriptions before launch — particularly body
// copy and benefits. Confirm with each partner that their description is accurate.

const PARTNERS = [
  {
    id: "eiz-technology",
    initials: "EIZ",
    name: "EIZ Technology",
    tagline: "imports & compliance",
    // [CONFIRM] Confirm this description with EIZ Technology before publishing
    body: "EIZ Technology helps Hexa Hub members navigate Australian imports, customs, and compliance. From customs clearance and bonded warehousing to inventory management and order fulfilment, EIZ compresses the complexity of cross-border commerce into a single integrated system — with their team embedded at Huntingdale.",
    benefits: [
      "Customs clearance and import compliance",
      "Bonded warehouse and inventory management",
      "Order fulfilment and last-mile preparation",
      "Cross-border logistics coordination",
      "Real-time inventory visibility",
    ],
    bg: "bg-[#eef0f8]",
    href: "/contact",
    external: false,
  },
  {
    id: "digitec-it",
    initials: "DIT",
    name: "Digitec IT",
    tagline: "systems & infrastructure",
    // [CONFIRM] Confirm this description with Digitec IT before publishing
    body: "Digitec IT provides technology infrastructure for Hexa Hub members — from setting up your business network and systems at your unit, through to ongoing IT support and hardware procurement at partner rates. Particularly valuable for cross-border operators localising their digital presence for the Australian market.",
    benefits: [
      "E-commerce platform setup (Shopify, WooCommerce)",
      "Australian payment gateway integration",
      "IT infrastructure and network support",
      "Digital marketing and SEO for Australian market",
      "Ongoing managed IT services",
    ],
    bg: "bg-[#eef5ee]",
    href: "/contact",
    external: false,
  },
  {
    id: "australia-post",
    initials: "AP",
    name: "Australia Post",
    tagline: "logistics & outbound",
    // [CONFIRM] Confirm partner terms and rate details with Australia Post before publishing
    body: "Hexa Hub members benefit from a direct Australia Post partnership — giving you access to competitive parcel rates, direct pickup access from Huntingdale, and integration with AusPost's commercial services for high-volume senders. No volume minimums, no long negotiations. Plug in from day one.",
    benefits: [
      "Competitive parcel rates across domestic network",
      "Same-day and next-day metro delivery options",
      "Returns management and prepaid labels",
      "MyPost Business account integration",
      "On-site collection and drop-off at Huntingdale",
    ],
    bg: "bg-[#faf9f6]",
    href: "https://auspost.com.au",
    external: true,
  },
  {
    id: "mentorship",
    initials: "FM",
    name: "Founder Mentorship",
    tagline: "market entry & growth",
    // [CONFIRM] Confirm mentor name, availability terms, and session format before publishing
    body: "Alex Xiao — founder of Tutti Kids, Fureeze, and Livvy — provides direct mentorship to Hexa Hub members navigating cross-border operations and Australian market entry. Alex has successfully placed products into Woolworths, Coles, and Costco, bringing firsthand experience in scaling a consumer brand in this market. Sessions available by arrangement.",
    benefits: [
      "Cross-border market entry strategy",
      "Australian business establishment guidance",
      "E-commerce and fulfilment operations",
      "Supplier and partner introductions",
      "Major retailer placement (Woolworths, Coles, Costco)",
      "Network access within the Hexa community",
    ],
    bg: "bg-[#f8f0f5]",
    href: "/contact",
    external: false,
  },
];

// ── Member strip — same data as homepage; swap for real logos when available
const MEMBER_STRIP: { name: string; img?: string }[] = [
  { name: "Digitec IT" },
  { name: "Tutti Kids" },
  { name: "Fureeze" },
  { name: "Member Business" },
  { name: "Member Business" },
  { name: "Member Business" },
  { name: "Member Business" },
  { name: "Member Business" },
  { name: "Member Business" },
  { name: "Member Business" },
  { name: "Member Business" },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function EcosystemPage() {
  return (
    <>
      <Header />
      <main>

        {/* ── 1. HERO ── */}
        <section className="bg-white pt-24 lg:pt-32 pb-20 lg:pb-28 min-h-[80vh] flex flex-col justify-center">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 w-full">

            {/* Eyebrow */}
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-6">
              The Ecosystem
            </p>

            {/* Headline */}
            <h1 className="font-inter-tight font-medium text-[40px] leading-[48px] sm:text-[52px] sm:leading-[62px] lg:text-[68px] lg:leading-[78px] text-[rgb(36,43,43)] tracking-tight mb-8 max-w-4xl">
              Partners{" "}
              <span className="font-besley font-medium italic underline decoration-[#2a3065] decoration-[3px] underline-offset-[5px]">
                built in
              </span>
              {" "}— not bolted on
            </h1>

            {/* Subhead */}
            <p className="text-[#555555] text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
              Every Hexa Hub member plugs into our network of operational partners — imports and compliance, IT systems, logistics, and more. Pre-negotiated, pre-introduced, ready to use.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-semibold px-8 py-4 text-base transition-colors duration-200"
              >
                Become a member
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[#2a3065] text-[#2a3065] hover:bg-[#2a3065] hover:text-white font-semibold px-8 py-4 text-base transition-colors duration-200"
              >
                Talk to our team <ArrowRight size={16} />
              </Link>
            </div>

            {/* Partner name row */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[#6B6B6B] text-sm">Partnered with</span>
              {["EIZ Technology", "Digitec IT", "Australia Post", "Founder Mentorship"].map((name, i, arr) => (
                <span key={name} className="flex items-center gap-3">
                  <span className="text-[rgb(36,43,43)] text-sm font-medium">{name}</span>
                  {i < arr.length - 1 && (
                    <span className="text-[#D0D0D0] select-none">·</span>
                  )}
                </span>
              ))}
            </div>

          </div>
        </section>

        {/* ── 2. PARTNER CARDS ── */}
        <section className="py-20 lg:py-28 bg-[#F5F5F5] border-t border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="mb-14">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                Our partners
              </p>
              <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl text-[rgb(36,43,43)] tracking-tight mb-4">
                Four partnerships. One ecosystem.
              </h2>
              <p className="text-[#6B6B6B] text-base leading-relaxed max-w-2xl">
                Each partner is selected to solve a specific operational challenge for brands scaling in Australia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PARTNERS.map((p) => (
                <div
                  key={p.id}
                  id={p.id}
                  className={`${p.bg} rounded-3xl p-8 lg:p-10 flex flex-col min-h-[420px]`}
                >
                  {/* Logo placeholder + name */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      {/* Initials badge — replace with <Image> when real logos available */}
                      <div className="w-12 h-12 rounded-xl bg-[#2a3065]/10 flex items-center justify-center shrink-0">
                        <span className="font-inter-tight font-bold text-[11px] text-[#2a3065] tracking-wider">
                          {p.initials}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-inter-tight font-semibold text-xl text-[rgb(36,43,43)] leading-snug">
                          {p.name}
                        </h3>
                        <p className="font-besley font-medium italic text-[#6B6B6B] text-sm mt-0.5">
                          {p.tagline}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <p className="text-[#555555] text-sm leading-relaxed mb-6 flex-1">
                    {p.body}
                  </p>

                  {/* Benefits */}
                  <ul className="flex flex-col gap-2 mb-8">
                    {p.benefits.slice(0, 4).map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-[#555555] text-sm">
                        <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-[#2a3065]/40 inline-block" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div>
                    {p.external ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#2a3065] font-semibold text-sm hover:underline"
                      >
                        Visit {p.name} <ExternalLink size={13} />
                      </a>
                    ) : (
                      <Link
                        href={p.href}
                        className="inline-flex items-center gap-2 text-[#2a3065] font-semibold text-sm hover:underline"
                      >
                        Learn more <ArrowRight size={13} />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. WHY ECOSYSTEM OVER DIY ── */}
        <section className="py-20 lg:py-28 bg-white border-t border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

              {/* Left: heading */}
              <div className="lg:sticky lg:top-32">
                <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-4">
                  The difference
                </p>
                <h2 className="font-inter-tight font-medium text-3xl sm:text-4xl text-[rgb(36,43,43)] tracking-tight">
                  Why{" "}
                  <span className="font-besley font-medium italic underline decoration-[#2a3065] decoration-[3px] underline-offset-[4px]">
                    ecosystem
                  </span>{" "}
                  over DIY
                </h2>
              </div>

              {/* Right: value props */}
              <div className="flex flex-col divide-y divide-[#E5E5E5]">
                {[
                  {
                    label: "Pre-vetted",
                    body: "Every partner is operating in-market and actively working with Hexa Hub members. No cold outreach, no guessing who's reliable.",
                  },
                  {
                    label: "Introductions included",
                    body: "Members get warm introductions from the Hexa Hub team — not a partner list to call yourself.",
                  },
                  {
                    label: "Partner rates",
                    body: "Most partners extend preferential rates or terms to Hexa Hub members that wouldn't be available to a walk-in customer.",
                  },
                ].map(({ label, body }) => (
                  <div key={label} className="py-8 first:pt-0 last:pb-0">
                    <p className="text-[#2a3065] text-[11px] font-semibold uppercase tracking-widest mb-3">
                      {label}
                    </p>
                    <p className="text-[#555555] text-base leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── 4. HOW IT WORKS ── */}
        <section className="py-20 lg:py-28 bg-[#faf9f6] border-t border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="mb-14">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                Getting started
              </p>
              <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl text-[rgb(36,43,43)] tracking-tight">
                How it works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "Step 1",
                  title: "Join as a member",
                  desc: "Sign up for any Hexa Hub membership — Virtual, Scale, or a dedicated unit — and you're in.",
                },
                {
                  step: "Step 2",
                  title: "Tell us what you need",
                  desc: "During onboarding we'll identify which ecosystem partners are relevant to your operation — imports, IT, logistics, or all of the above.",
                },
                {
                  step: "Step 3",
                  title: "We introduce you",
                  desc: "Warm introductions to the right partner contacts — you're talking to a decision-maker within days, not weeks.",
                },
              ].map(({ step, title, desc }, i) => (
                <div key={step} className="bg-white rounded-2xl p-8 border border-[#E5E5E5] flex flex-col">
                  <p className="text-[#2a3065] text-[11px] font-semibold uppercase tracking-widest mb-4">
                    {step}
                  </p>
                  <div className="w-10 h-10 rounded-full bg-[#2a3065] flex items-center justify-center mb-6 shrink-0">
                    <span className="text-white font-inter-tight font-bold text-base">{i + 1}</span>
                  </div>
                  <h3 className="font-inter-tight font-semibold text-xl text-[rgb(36,43,43)] mb-3">
                    {title}
                  </h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed flex-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. MEMBER STRIP ── */}
        <section className="py-16 lg:py-20 bg-white border-t border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 mb-10 text-center">
            {/* [CONFIRM] Swap text chips for real member logos once available */}
            <h2 className="font-inter-tight font-bold text-2xl sm:text-3xl text-[rgb(36,43,43)] tracking-tight">
              Trusted by brands operating at Hexa Hub.
            </h2>
          </div>

          <div
            className="overflow-hidden"
            aria-label="Businesses operating at Hexa Hub"
          >
            <div className="animate-scroll-left flex gap-6 w-max py-2">
              {[...MEMBER_STRIP, ...MEMBER_STRIP].map((member, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center px-6 py-3 rounded-full border border-[#E5E5E5] bg-white h-12"
                >
                  {member.img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.img}
                      alt={member.name}
                      className="h-7 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-[#555555] text-sm font-medium whitespace-nowrap">
                      {member.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. CLOSING CTA ── */}
        <section className="py-20 lg:py-28 bg-[#2a3065]">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
              Plug into the ecosystem
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Join brands scaling operations with partners already built in.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#2a3065] font-semibold px-8 py-4 text-base hover:bg-[#F5F5F5] transition-colors duration-200"
              >
                Become a member
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white text-white font-semibold px-8 py-4 text-base hover:bg-white/10 transition-colors duration-200"
              >
                Talk to our team <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
