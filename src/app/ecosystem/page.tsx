import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, ExternalLink, MapPin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Ecosystem",
  description:
    "The Hexa Hub ecosystem — EIZ Technology, Digitec IT, Australia Post, mentorship, and retail presence across Melbourne. Every member plugs in from day one.",
};

const PARTNERS = [
  {
    id: "eiz-technology",
    category: "Supply Chain",
    name: "EIZ Technology",
    tagline: "Cross-border supply chain, made simple.",
    desc: "EIZ Technology is a cross-border supply chain platform purpose-built for brands moving goods between China and Australia. From customs clearance and bonded warehousing to inventory management and order fulfilment, EIZ compresses the operational complexity of cross-border commerce into a single integrated system.",
    body: "For Hexa Hub members, EIZ Technology is embedded directly into the platform — meaning your supply chain infrastructure is operational before your first shipment lands. No need to source a separate freight forwarder, customs broker, or 3PL. EIZ handles the end-to-end flow, and their team is on-site at Huntingdale.",
    benefits: [
      "Customs clearance and import compliance",
      "Bonded warehouse and inventory management",
      "Order fulfilment and last-mile preparation",
      "Cross-border logistics coordination",
      "Real-time inventory visibility",
    ],
    website: null,
  },
  {
    id: "digitec-it",
    category: "Digital",
    name: "Digitec IT",
    tagline: "Digital infrastructure for operators.",
    desc: "Digitec IT provides managed IT services, e-commerce platform setup, and digital operations support to businesses at Hexa Hub. Whether you're launching an Australian Shopify store, setting up a POS system, or building out your digital back-end, Digitec IT handles the technical layer so you can focus on the business.",
    body: "Digitec IT works closely with cross-border operators who need to localise their digital presence for the Australian market — Australian payment gateways, local SEO, logistics API integrations, and ongoing IT support. Hexa Hub members receive preferential access and on-site consultation.",
    benefits: [
      "E-commerce platform setup (Shopify, WooCommerce)",
      "Australian payment gateway integration",
      "IT infrastructure and network support",
      "Digital marketing and SEO for Australian market",
      "Ongoing managed IT services",
    ],
    website: null,
  },
  {
    id: "australia-post",
    category: "Shipping & Logistics",
    name: "Australia Post",
    tagline: "Australia's most trusted delivery network.",
    desc: "Hexa Hub members benefit from a direct Australia Post partnership — giving you access to competitive parcel rates, click-and-collect options, and reliable domestic delivery across Australia's entire network. Whether you're dispatching a handful of orders or thousands per week, the infrastructure is the same.",
    body: "The Australia Post partnership at Hexa Hub is built for e-commerce operators who need a professional domestic fulfilment solution on day one. No volume minimums, no long negotiations. As a Hexa Hub member, you plug directly into a pre-negotiated arrangement and start shipping immediately.",
    benefits: [
      "Competitive parcel rates across domestic network",
      "Same-day and next-day metro delivery options",
      "Returns management and prepaid labels",
      "MyPost Business account integration",
      "On-site collection and drop-off",
    ],
    website: "https://auspost.com.au",
  },
  {
    id: "mentorship",
    category: "Mentorship",
    name: "Founder Mentorship",
    tagline: "Direct access to someone who has done it.",
    desc: "Alex Xiao — founder of Tutti Kids, Fureeze, and Livvy — provides direct mentorship to Hexa Hub members navigating cross-border operations, Australian market entry, and business growth. Alex has successfully placed products into Australia's major retailers including Woolworths, Coles, and Costco, bringing firsthand experience in the realities of scaling a consumer brand in this market.",
    body: "This isn't a referral to a coaching programme — it's direct access to someone who has built and scaled consumer brands across two markets. Mentorship at Hexa Hub is particularly valuable for founders entering Australia from Chinese-speaking markets. Alex brings firsthand experience in cross-border e-commerce, product development, and the operational challenges of building a consumer brand in Australia. Sessions are available to members by arrangement.",
    benefits: [
      "Cross-border market entry strategy",
      "Australian business establishment guidance",
      "E-commerce and fulfilment operations",
      "Supplier and partner introductions",
      "Major retailer placement (Woolworths, Coles, Costco)",
      "Network access within the Hexa community",
    ],
    website: null,
  },
];

const RETAIL_LOCATIONS = [
  {
    name: "369 Lonsdale Street",
    area: "Melbourne CBD",
    desc: "Prime CBD retail and pop-up space in the heart of Melbourne. Suitable for product launches, brand activations, and short-term retail presence.",
  },
  {
    name: "878 Whitehorse Road",
    area: "Box Hill",
    desc: "High-foot-traffic retail in Box Hill — one of Melbourne's strongest Chinese-speaking commercial precincts. Ideal for brands targeting the Chinese-Australian consumer market.",
  },
];

export default function EcosystemPage() {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">

        {/* ── PAGE HEADER ── */}
        <div className="bg-[#F5F5F5] border-b border-[#E5E5E5] py-12">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-2">Platform</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
              The Hexa Hub Ecosystem
            </h1>
            <p className="text-[#6B6B6B] mt-3 text-base max-w-2xl leading-relaxed">
              Every Hexa Hub member gets access to a connected network of partners from day one — supply
              chain, digital, logistics, and mentorship, embedded into the platform so you don&apos;t have
              to source them yourself.
            </p>
          </div>
        </div>

        {/* ── WHAT'S INCLUDED ── */}
        <section className="py-16 bg-white border-b border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Supply Chain", name: "EIZ Technology", anchor: "#eiz-technology" },
                { label: "Digital", name: "Digitec IT", anchor: "#digitec-it" },
                { label: "Shipping", name: "Australia Post", anchor: "#australia-post" },
                { label: "Mentorship", name: "Founder Access", anchor: "#mentorship" },
              ].map(({ label, name, anchor }) => (
                <a
                  key={name}
                  href={anchor}
                  className="group border border-[#E5E5E5] hover:border-[#2a3065]/40 p-6 transition-colors"
                >
                  <p className="text-[#2a3065] text-xs font-semibold uppercase tracking-widest mb-2">{label}</p>
                  <p className="text-black font-bold text-base mb-3">{name}</p>
                  <div className="flex items-center gap-1 text-[#6B6B6B] group-hover:text-black text-xs transition-colors">
                    <span>Learn more</span>
                    <ArrowRight size={11} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── PARTNER SECTIONS ── */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 py-16 space-y-24">
          {PARTNERS.map((p, i) => (
            <div
              key={p.id}
              id={p.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                i % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Text */}
              <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                <p className="text-[#2a3065] text-xs font-semibold uppercase tracking-widest mb-3">
                  {p.category}
                </p>
                <h2 className="text-3xl font-bold text-black tracking-tight mb-2">{p.name}</h2>
                <p className="text-[#6B6B6B] text-base italic mb-6">{p.tagline}</p>
                <div className="space-y-4 text-[#555555] text-sm leading-relaxed mb-8">
                  <p>{p.desc}</p>
                  <p>{p.body}</p>
                </div>
                {p.website && (
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#2a3065] text-sm font-semibold hover:underline mb-8"
                  >
                    Visit {p.name} <ExternalLink size={12} />
                  </a>
                )}
              </div>

              {/* Benefits card */}
              <div
                className={`bg-[#F5F5F5] border border-[#E5E5E5] p-8 ${
                  i % 2 === 1 ? "lg:col-start-1" : ""
                }`}
              >
                <p className="text-black font-semibold text-sm mb-5">Member benefits</p>
                <ul className="space-y-3">
                  {p.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-[#555555]">
                      <CheckCircle size={14} className="text-[#2a3065] mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-[#E5E5E5]">
                  <p className="text-[#6B6B6B] text-xs leading-relaxed">
                    Access to {p.name} is included for all Hexa Hub members. Speak to the team for details.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── RETAIL PRESENCE ── */}
        <section id="retail" className="py-24 bg-[#F5F5F5] border-y border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <div className="mb-12">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                Retail network
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight mb-4">
                Physical retail presence in Melbourne.
              </h2>
              <p className="text-[#6B6B6B] text-base leading-relaxed max-w-2xl">
                Hexa Hub members can access retail and pop-up space at two strategic Melbourne locations —
                giving brands a physical presence in the CBD and the Chinese-Australian market hub of Box Hill,
                without a long-term retail lease.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RETAIL_LOCATIONS.map(({ name, area, desc }) => (
                <div key={name} className="bg-white border border-[#E5E5E5] p-8">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin size={16} className="text-[#2a3065] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[#6B6B6B] text-xs font-semibold uppercase tracking-widest mb-0.5">
                        {area}
                      </p>
                      <h3 className="text-black font-bold text-lg">{name}</h3>
                    </div>
                  </div>
                  <p className="text-[#555555] text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <p className="text-[#6B6B6B] text-sm mt-8">
              Retail access is available to Hexa Hub members. Contact the team to discuss availability and terms.
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-black tracking-tight mb-4">
              Ready to plug in?
            </h2>
            <p className="text-[#6B6B6B] text-lg mb-10 max-w-xl mx-auto">
              Speak to the team about spaces and what the full Hexa Hub ecosystem includes for your business.
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
