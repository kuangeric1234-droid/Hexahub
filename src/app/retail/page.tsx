import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Users,
  Calendar,
  Globe,
  Megaphone,
  Briefcase,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RetailPage() {
  return (
    <>
      <Header />
      <main>

        {/* ── 1. HERO ── */}
        <section className="bg-white pt-24 pb-20 lg:pt-32 lg:pb-28">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="max-w-3xl">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-4">
                Retail Presence
              </p>
              <h1 className="font-inter-tight font-medium text-[36px] leading-[44px] sm:text-[44px] sm:leading-[54px] lg:text-[56px] lg:leading-[67px] text-[rgb(36,43,43)] tracking-tight mb-6">
                Test, sell,{" "}
                <span className="font-besley font-medium italic underline decoration-[#2a3065] decoration-[3px] underline-offset-[4px]">
                  activate
                </span>{" "}
                — without a retail lease
              </h1>
              <p className="text-[#555555] text-lg leading-relaxed max-w-xl mb-10">
                Two Melbourne retail locations for Hexa Hub members — CBD and Box Hill. Use them for pop-ups, product launches, wholesale showcases, or rolling brand presence without the commitment of a long-term retail lease.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-semibold px-8 py-4 text-base transition-colors duration-200"
                >
                  Book a location
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-[#2a3065] text-[#2a3065] hover:bg-[#2a3065] hover:text-white font-semibold px-8 py-4 text-base transition-colors duration-200"
                >
                  Talk to our team <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. THE TWO LOCATIONS ── */}
        <section className="py-20 lg:py-28 bg-white border-t border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="mb-12">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                Two locations
              </p>
              <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl text-[rgb(36,43,43)] tracking-tight mb-4">
                CBD foot traffic. Suburban anchor.
              </h2>
              <p className="text-[#6B6B6B] text-base leading-relaxed max-w-2xl">
                Two distinct retail environments — each giving your brand a different slice of the Melbourne market.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

              {/* Card 1 — Melbourne CBD */}
              <div className="rounded-2xl border border-[#E5E5E5] overflow-hidden flex flex-col">
                {/* TODO: Replace this placeholder with:
                     <div className="relative aspect-[3/2] overflow-hidden">
                       <Image src="/retail/369-lonsdale-storefront.jpg" alt="369 Lonsdale Street, Melbourne CBD" fill className="object-cover" />
                     </div> */}
                <div className="aspect-[3/2] bg-[#1a1a2e] flex items-center justify-center shrink-0">
                  <div className="text-center px-6">
                    <p className="text-white/35 text-xs font-semibold uppercase tracking-widest mb-2">
                      Storefront photo coming soon
                    </p>
                    <p className="text-white font-inter-tight font-semibold text-base uppercase tracking-wide">
                      369 Lonsdale St
                    </p>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <p className="text-[#2a3065] text-[11px] font-semibold uppercase tracking-widest mb-2">
                    Melbourne CBD
                  </p>
                  <h3 className="font-inter-tight font-bold text-2xl text-[rgb(36,43,43)] mb-4">
                    369 Lonsdale Street
                  </h3>
                  <p className="text-[#555555] text-sm leading-relaxed mb-6">
                    In the heart of the Melbourne CBD retail grid. High daily foot traffic, walking distance to Bourke St Mall, Myer, and Emporium. Ideal for consumer brand activations, product launches, and direct-to-customer sales.
                  </p>

                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {[
                      { Icon: MapPin,    label: "Location",     desc: "Melbourne CBD, walking distance from Bourke St Mall" },
                      { Icon: Users,     label: "Foot traffic",  desc: "High daily pedestrian volume in established retail precinct" },
                      { Icon: Calendar,  label: "Flexible terms", desc: "Short-term bookings available, no long lease" },
                    ].map(({ Icon, label, desc }) => (
                      <li key={label} className="flex items-start gap-3">
                        <div className="shrink-0 w-7 h-7 rounded-full bg-[#2a3065]/8 flex items-center justify-center mt-0.5">
                          <Icon size={13} className="text-[#2a3065]" />
                        </div>
                        <div>
                          <span className="font-semibold text-[rgb(36,43,43)] text-xs uppercase tracking-widest">
                            {label}
                          </span>
                          <p className="text-[#6B6B6B] text-sm leading-snug mt-0.5">{desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[#2a3065] font-semibold text-sm hover:underline"
                  >
                    Enquire about Lonsdale <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Card 2 — Box Hill */}
              <div className="rounded-2xl border border-[#E5E5E5] overflow-hidden flex flex-col">
                {/* TODO: Replace this placeholder with:
                     <div className="relative aspect-[3/2] overflow-hidden">
                       <Image src="/retail/878-whitehorse-storefront.jpg" alt="878 Whitehorse Road, Box Hill" fill className="object-cover" />
                     </div> */}
                <div className="aspect-[3/2] bg-[#1a2a1e] flex items-center justify-center shrink-0">
                  <div className="text-center px-6">
                    <p className="text-white/35 text-xs font-semibold uppercase tracking-widest mb-2">
                      Storefront photo coming soon
                    </p>
                    <p className="text-white font-inter-tight font-semibold text-base uppercase tracking-wide">
                      878 Whitehorse Rd
                    </p>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <p className="text-[#2a3065] text-[11px] font-semibold uppercase tracking-widest mb-2">
                    Box Hill
                  </p>
                  <h3 className="font-inter-tight font-bold text-2xl text-[rgb(36,43,43)] mb-4">
                    878 Whitehorse Road
                  </h3>
                  <p className="text-[#555555] text-sm leading-relaxed mb-6">
                    A suburban retail anchor on Whitehorse Road, serving Box Hill and Melbourne&apos;s eastern suburbs. Strong Asian-Australian consumer base, ideal for cross-border e-commerce brands building local presence.
                  </p>

                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {[
                      { Icon: MapPin,    label: "Location",    desc: "Box Hill, on Whitehorse Road near Box Hill Central" },
                      { Icon: Globe,     label: "Market fit",  desc: "Strong cross-border e-commerce and Asian-Australian consumer catchment" },
                      { Icon: Calendar,  label: "Flexible terms", desc: "Short-term bookings available, no long lease" },
                    ].map(({ Icon, label, desc }) => (
                      <li key={label} className="flex items-start gap-3">
                        <div className="shrink-0 w-7 h-7 rounded-full bg-[#2a3065]/8 flex items-center justify-center mt-0.5">
                          <Icon size={13} className="text-[#2a3065]" />
                        </div>
                        <div>
                          <span className="font-semibold text-[rgb(36,43,43)] text-xs uppercase tracking-widest">
                            {label}
                          </span>
                          <p className="text-[#6B6B6B] text-sm leading-snug mt-0.5">{desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[#2a3065] font-semibold text-sm hover:underline"
                  >
                    Enquire about Box Hill <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 3. WHY RETAIL PRESENCE MATTERS ── */}
        <section className="py-20 lg:py-28 bg-[#F5F5F5] border-t border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

              <div className="lg:sticky lg:top-32">
                <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-4">
                  Why it matters
                </p>
                <h2 className="font-inter-tight font-medium text-3xl sm:text-4xl text-[rgb(36,43,43)] tracking-tight">
                  Physical retail, without the{" "}
                  <span className="font-besley font-medium italic underline decoration-[#2a3065] decoration-[3px] underline-offset-[4px]">
                    commitment
                  </span>
                </h2>
              </div>

              <div className="flex flex-col divide-y divide-[#E5E5E5]">
                {[
                  {
                    label: "Test before you lease",
                    body: "Validate whether a product or category has legs in a physical environment before committing to a permanent retail footprint.",
                  },
                  {
                    label: "Build brand presence",
                    body: "Give customers, press, wholesale buyers, and investors somewhere to physically experience your brand — not just a warehouse tour.",
                  },
                  {
                    label: "Cross-border launch",
                    body: "For overseas brands landing in Australia, physical retail presence builds trust with local consumers and wholesale partners who want to see the product before they commit.",
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
                  title: "Tell us your goal",
                  desc: "Pop-up, product launch, wholesale showcase, or rolling brand presence — tell us what you're trying to achieve and which location fits.",
                },
                {
                  step: "Step 2",
                  title: "Pick your window",
                  desc: "Short-term bookings from one week up to multi-month activations. We'll confirm availability at your chosen location.",
                },
                {
                  step: "Step 3",
                  title: "Move in and launch",
                  desc: "We'll help with setup logistics, signage, and connecting back to your Hexa Hub Huntingdale operations for restock and inventory.",
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

        {/* ── 5. WHO IT'S FOR ── */}
        <section className="py-20 lg:py-28 bg-white border-t border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="mb-12">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                Good fit
              </p>
              <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl text-[rgb(36,43,43)] tracking-tight">
                Who retail presence is built for
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  Icon: Globe,
                  title: "Cross-border e-commerce brands",
                  desc: "Overseas brands landing in Australia who need physical presence to build trust and close wholesale deals — without signing a 5-year retail lease sight-unseen.",
                },
                {
                  Icon: Megaphone,
                  title: "Product launches & pop-ups",
                  desc: "Brands launching a new product, collection, or category that benefits from a physical activation event — press, influencers, and early customers all welcome.",
                },
                {
                  Icon: Briefcase,
                  title: "Wholesale & trade showcase",
                  desc: "Brands showing to retail buyers, distributors, or trade partners who want to experience the product in a real retail environment rather than a boardroom.",
                },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="bg-[#F5F5F5] rounded-2xl p-8 flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-[#2a3065]/8 flex items-center justify-center mb-6">
                    <Icon size={18} className="text-[#2a3065]" />
                  </div>
                  <h3 className="font-inter-tight font-semibold text-lg text-[rgb(36,43,43)] mb-3">
                    {title}
                  </h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. CLOSING CTA ── */}
        <section className="py-20 lg:py-28 bg-[#2a3065]">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="font-inter-tight font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
              Ready to launch?
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Tell us what you want to activate and we&apos;ll tell you which location fits.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#2a3065] font-semibold px-8 py-4 text-base hover:bg-[#F5F5F5] transition-colors duration-200"
              >
                Book a location
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
