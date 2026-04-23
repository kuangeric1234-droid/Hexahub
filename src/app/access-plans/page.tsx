"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Building2, Package, Headphones, TrendingUp, Truck, Plus, CheckCircle, XCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// ── FAQ accordion ─────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "Do I get a unique business address or suite number?",
    a: "Yes. Every member is assigned a unique suite number at Huntingdale that can be used for ASIC business registration, ABN, banking, and shipping.",
  },
  {
    q: "How do the Access Plans support a scaling business?",
    a: "Virtual is the best starting point if you need a Melbourne business address, legitimacy, and access to our ecosystem network. Scale is the next step when you start receiving stock or need occasional workspace.",
  },
  {
    q: "What if I only ship a few times per month?",
    a: "Scale is designed for that. You only pay for receiving and shipping when you use it, so it works well for low or seasonal volume.",
  },
  {
    q: "What if I'm shipping and receiving every week?",
    a: "The Scale plan includes 100 packages and 10 pallets/month, which covers most growing brands. If you consistently exceed that, we'll help you look at a dedicated warehouse suite.",
  },
  {
    q: "Can I upgrade or downgrade later?",
    a: "Yes. Plans are designed to grow with you. You can upgrade or downgrade as your workspace and logistics needs change.",
  },
  {
    q: "Do I need to be local to Huntingdale?",
    a: "No. Virtual can be used from anywhere in Australia or overseas. Scale members usually live within driving distance of Huntingdale, since physical access is part of the plan.",
  },
];

// ── Comparison table data ─────────────────────────────────────────────────────

type CellValue = true | false | string;

const TABLE_ROWS: { feature: string; virtual: CellValue; scale: CellValue }[] = [
  { feature: "Professional business mailing address", virtual: true, scale: true },
  { feature: "Mail handling", virtual: true, scale: true },
  { feature: "Access to Hexa Hub ecosystem network", virtual: true, scale: true },
  { feature: "Physical access", virtual: "Day passes only ($40/day, business hours)", scale: "Included (6am–11pm)" },
  { feature: "Dedicated office or warehouse suite", virtual: false, scale: false },
  { feature: "Mail / Package receiving", virtual: "Mail only (no packages)", scale: "Up to 100 packages + 10 pallets/mo. Overage: $10/pkg, $20/pallet" },
  { feature: "Daily flex storage", virtual: false, scale: "$10/pallet/day" },
  { feature: "Labour (on-demand ops help)", virtual: false, scale: "Shipping, receiving, and flex storage only" },
  { feature: "Shipping / Carrier pickup", virtual: false, scale: "Unlimited access to on-site carrier pickups + partner rates" },
  { feature: "Conference rooms", virtual: false, scale: false },
  { feature: "Content studio (podcast studio)", virtual: false, scale: false },
  { feature: "Container receiving", virtual: false, scale: "$300/container" },
  { feature: "Parking – overnight", virtual: false, scale: "$199/mo" },
  { feature: "Parking – large vehicle", virtual: false, scale: "$299/mo" },
  { feature: "24/7 access", virtual: false, scale: false },
  { feature: "Additional member access options", virtual: false, scale: false },
];

function Cell({ value }: { value: CellValue }) {
  if (value === true)
    return <CheckCircle size={20} className="text-[#2a3065] mx-auto" />;
  if (value === false)
    return <XCircle size={20} className="text-[#D0D0D0] mx-auto" />;
  return <span className="text-[11px] md:text-[13px] leading-snug text-center block text-[#555555]">{value}</span>;
}

// ── Value props ───────────────────────────────────────────────────────────────

const VALUE_PROPS = [
  { icon: Building2, title: "Formalise your business", desc: "Professional Melbourne address at Huntingdale" },
  { icon: Package,   title: "Receive and ship",         desc: "Packages and inventory without leasing a full warehouse" },
  { icon: Headphones, title: "On-demand logistics help", desc: "From our operations team when you need it" },
  { icon: TrendingUp, title: "Upgrade when ready",       desc: "Move from virtual to a dedicated suite, all in one system" },
  { icon: Truck,     title: "Lower shipping costs",     desc: "Through our ecosystem partner rates with Australia Post" },
];

// ── Steps ─────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    step: "Step 1",
    title: "Choose plan",
    desc: "Two options — Virtual (online signup) or Scale (book a call with our team).",
  },
  {
    step: "Step 2",
    title: "Tell us about your business",
    desc: "Complete a quick form so we can set up your access plan and match you with the right Hexa Hub services.",
  },
  {
    step: "Step 3",
    title: "Checkout",
    desc: "Secure checkout through Stripe. No hidden fees, no long-term contracts.",
  },
  {
    step: "Step 4",
    title: "Start operating",
    desc: "You'll receive your agreement and onboarding details by the end of the next business day. Welcome to Hexa Hub.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AccessPlansPage() {
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set());

  const toggleFaq = (i: number) =>
    setOpenFaqs((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <>
      <Header />
      <main>

        {/* ── 1. HERO ── */}
        <section className="bg-white pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              {/* Left */}
              <div>
                <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-4">
                  Memberships
                </p>
                <h1 className="font-inter-tight font-medium text-[36px] leading-[44px] sm:text-[44px] sm:leading-[54px] lg:text-[56px] lg:leading-[67px] text-[rgb(36,43,43)] tracking-tight mb-6">
                  Land{" "}
                  <span className="font-besley font-medium italic underline decoration-[#2a3065] decoration-[3px] underline-offset-[4px]">legit</span>
                  . Ship{" "}
                  <span className="font-besley font-medium italic underline decoration-[#2a3065] decoration-[3px] underline-offset-[4px]">smart</span>
                  . Scale{" "}
                  <span className="font-besley font-medium italic underline decoration-[#2a3065] decoration-[3px] underline-offset-[4px]">confidently</span>
                  .
                </h1>
                <p className="text-[#555555] text-lg leading-relaxed mb-10 max-w-xl">
                  Business address, shipping support, and on-site operations at Huntingdale — without the lease.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#compare"
                    className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-semibold px-8 py-4 text-base transition-colors duration-200"
                  >
                    Compare plans
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border border-[#2a3065] text-[#2a3065] hover:bg-[#2a3065] hover:text-white font-semibold px-8 py-4 text-base transition-colors duration-200"
                  >
                    Get started <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Right — image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/renders/Aerial.jpg"
                  alt="Hexa Hub precinct at Huntingdale, Melbourne"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. WHY BRANDS START HERE ── */}
        <section className="py-20 lg:py-28 bg-[#eef0f8]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="max-w-2xl mb-12">
              <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl text-[#1e2a54] tracking-tight mb-4">
                Why brands start with Access Plans
              </h2>
              <p className="text-[#2a3065]/80 text-base leading-relaxed">
                Whether you're launching a new brand or scaling an existing one, Access Plans give you a flexible foundation at Hexa Hub. Start with a Melbourne business address, grow into storage, shipping support, and workspace — without committing to a lease.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {VALUE_PROPS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 w-9 h-9 rounded-lg bg-[#2a3065]/10 flex items-center justify-center">
                    <Icon size={16} className="text-[#2a3065]" />
                  </span>
                  <span>
                    <p className="font-inter-tight font-semibold text-[14px] text-[#1e2a54] mb-0.5">{title}</p>
                    <p className="text-[#2a3065]/70 text-[13px] leading-snug">{desc}</p>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. WHO IT'S FOR ── */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="mb-12">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                Real scenarios
              </p>
              <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl text-[rgb(36,43,43)] tracking-tight">
                Who it&apos;s for
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  img: "/renders/Block B Front.jpg",
                  title: "Form your business",
                  desc: "Use the Virtual plan to launch with a Melbourne business address plus mail handling. Ideal for new brands registering a company and needing a local presence before committing to a space.",
                },
                {
                  img: "/renders/Internal.jpg",
                  title: "Bridge to a suite",
                  desc: "Use the Scale plan to access Hexa Hub physically, receive stock, and prep for growth — before committing to a dedicated warehouse or office.",
                },
              ].map((card) => (
                <div key={card.title} className="bg-[#F5F5F5] rounded-2xl overflow-hidden">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={card.img}
                      alt={card.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-inter-tight font-semibold text-[rgb(36,43,43)] text-xl mb-2">{card.title}</h3>
                    <p className="text-[#6B6B6B] text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. COMPARISON TABLE ── */}
        <section id="compare" className="py-20 lg:py-28 bg-[#F5F5F5] border-t border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="mb-12">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                Pricing
              </p>
              <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl text-[rgb(36,43,43)] tracking-tight mb-3">
                Compare membership plans
              </h2>
              <p className="text-[#6B6B6B] text-base">
                Not sure which plan you need?{" "}
                <Link href="/contact" className="text-[#2a3065] underline hover:no-underline">
                  Speak to our team
                </Link>
                .
              </p>
            </div>

            {/* Scrollable wrapper on mobile */}
            <div className="overflow-x-auto -mx-6 sm:-mx-8 lg:mx-0">
              <div className="px-6 sm:px-8 lg:px-0">

                {/* Plan header cards */}
                <div className="grid grid-cols-[2fr_3fr_3fr] md:grid-cols-[3fr_3.5fr_3.5fr] gap-2 md:gap-3 mb-3">
                  <div />
                  {/* Virtual */}
                  <div className="bg-[#eef0f8] rounded-xl p-3 md:p-5">
                    <p className="font-inter-tight font-semibold text-[#2a3065] text-xs md:text-sm uppercase tracking-wider mb-2">
                      Virtual
                    </p>
                    <p className="font-inter-tight font-bold text-[rgb(36,43,43)] text-2xl md:text-3xl leading-none">
                      $150
                      <span className="text-base font-medium text-[#6B6B6B]">/mo</span>
                    </p>
                    <Link
                      href="/contact"
                      className="mt-4 inline-flex items-center gap-1 text-[#2a3065] text-sm font-semibold hover:underline"
                    >
                      Get started <ArrowRight size={13} />
                    </Link>
                  </div>
                  {/* Scale */}
                  <div className="bg-[#2a3065] rounded-xl p-3 md:p-5">
                    <p className="font-inter-tight font-semibold text-white/70 text-xs md:text-sm uppercase tracking-wider mb-2">
                      Scale
                    </p>
                    <p className="font-inter-tight font-bold text-white text-2xl md:text-3xl leading-none">
                      $400
                      <span className="text-base font-medium text-white/60">/mo</span>
                    </p>
                    <Link
                      href="/contact"
                      className="mt-4 inline-flex items-center gap-1 text-white text-sm font-semibold hover:underline"
                    >
                      Get started <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Feature rows */}
                {TABLE_ROWS.map((row, i) => (
                  <div
                    key={row.feature}
                    className={`grid grid-cols-[2fr_3fr_3fr] md:grid-cols-[3fr_3.5fr_3.5fr] gap-2 md:gap-3 items-center border-b border-[#E5E5E5] px-3 py-2 md:px-4 md:py-3 ${
                      i % 2 === 0 ? "bg-white" : "bg-transparent"
                    }`}
                    style={{ borderRadius: i % 2 === 0 ? "8px" : undefined }}
                  >
                    <span className="text-[rgb(36,43,43)] text-xs md:text-[14px] font-medium leading-snug">{row.feature}</span>
                    <div className="flex items-center justify-center px-1 md:px-4">
                      <Cell value={row.virtual} />
                    </div>
                    <div className="flex items-center justify-center px-1 md:px-4">
                      <Cell value={row.scale} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. HOW IT WORKS ── */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="mb-12">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                Process
              </p>
              <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl text-[rgb(36,43,43)] tracking-tight">
                How it works
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map(({ step, title, desc }) => (
                <div key={step} className="bg-[#faf9f6] rounded-2xl p-6 lg:p-7">
                  <p className="text-[#9B8B6E] text-[11px] font-semibold uppercase tracking-widest mb-4">
                    {step}
                  </p>
                  <h3 className="font-inter-tight font-semibold text-[rgb(36,43,43)] text-lg mb-2">{title}</h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. FAQ ── */}
        <section className="py-20 lg:py-28 bg-[#F5F5F5] border-t border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">

              {/* Left heading col */}
              <div className="lg:sticky lg:top-24">
                <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                  FAQs
                </p>
                <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl text-[rgb(36,43,43)] tracking-tight mb-6">
                  Frequently asked questions
                </h2>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[#2a3065] font-semibold text-sm hover:underline"
                >
                  Still have questions? Contact us <ArrowRight size={14} />
                </Link>
              </div>

              {/* Right FAQ col */}
              <div className="flex flex-col gap-3">
                {FAQS.map((faq, i) => {
                  const isOpen = openFaqs.has(i);
                  return (
                    <div key={i} className="border border-[#E5E5E5] rounded-lg overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() => toggleFaq(i)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[#F5F5F5] transition-colors duration-150"
                      >
                        <span className="font-inter-tight font-semibold text-[15px] text-[rgb(36,43,43)]">
                          {faq.q}
                        </span>
                        <span
                          className="shrink-0 w-6 h-6 rounded-full border border-[#E5E5E5] flex items-center justify-center transition-transform duration-200 ease-out"
                          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                          aria-hidden="true"
                        >
                          <Plus size={12} className="text-[#555555]" />
                        </span>
                      </button>
                      <div
                        className="overflow-hidden transition-all duration-200 ease-out"
                        style={{ maxHeight: isOpen ? "400px" : "0px" }}
                      >
                        <p className="px-5 pb-4 pt-1 text-[#6B6B6B] text-sm leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. CLOSING CTA ── */}
        <section className="py-20 lg:py-28 bg-[#2a3065]">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
              Find your new workspace today
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Join a community of brands scaling their operations at Huntingdale.
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
