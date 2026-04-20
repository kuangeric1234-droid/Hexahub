import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Services",
  description: "Warehouse units, storage spaces, and office-warehouse hybrids available to lease at HexaHub Huntingdale.",
};

const SERVICES = [
  {
    id: "warehouse",
    title: "Warehouse Units",
    subtitle: "223–438m² · 3-phase power · Mezzanine office",
    img: "/renders/Internal.jpg",
    href: "/units?type=warehouse",
    startingFrom: 49000,
    desc: "Large-format warehouse units with roller door or tilt door access, 3-phase power, mezzanine office level, polished concrete floors, and LED high-bay lighting. Ideal for operations that need real volume and the infrastructure to match.",
    targets: ["Ecommerce operators with physical stock", "Importers and wholesale distributors", "Light manufacturers and assemblers", "Logistics and last-mile delivery operators"],
    features: ["171–342m² ground floor", "52–96m² mezzanine", "3-phase power", "Roller or tilt door", "Polished concrete", "24/7 secure access", "LED high-bay lighting", "Kitchenette + bathroom"],
  },
  {
    id: "storage",
    title: "Storage Spaces",
    subtitle: "31–75m² · 24/7 access · Wireless keypad",
    img: "/renders/Storage Final Image LOW RES.jpg",
    href: "/units?type=storage",
    startingFrom: 9920,
    desc: "Compact to mid-size storage units with 24/7 wireless keypad access, roller shutter doors, and drive-through options. Perfect for anyone outgrowing a garage or home storage setup who needs a clean, secure, accessible solution.",
    targets: ["Tradespeople and contractors", "Seasonal stock and event equipment", "Caravan, boat, and vehicle storage", "Small ecommerce businesses and makers"],
    features: ["31–75m² options", "Drive-through available", "24/7 wireless keypad", "Single-phase power", "Roller shutter door", "LED lighting", "24hr CCTV", "Bollard protection"],
  },
  {
    id: "office-warehouse",
    title: "Office + Warehouse",
    subtitle: "240m² across two levels · Street frontage",
    img: "/renders/Mezzanine.jpg",
    href: "/units?type=office-warehouse",
    startingFrom: 56500,
    desc: "Two-storey units combining a full-floor office above with a warehouse and tilt door below — 120m² of each. Street frontage on Distribution Circuit. Built for businesses that need a professional office presence alongside operational warehouse space.",
    targets: ["Growing SMEs needing office + ops under one roof", "Sales teams with a warehouse function", "Contractors and consultants with equipment", "Showrooms with storage requirements"],
    features: ["120m² ground warehouse", "120m² first floor office", "Rear tilt door access", "Street frontage", "5 car spaces", "3-phase power", "Split system A/C", "Full fit-out office"],
  },
  {
    id: "office",
    title: "Office Spaces",
    subtitle: "128–140m² · Natural light · District views",
    img: "/renders/Block B Front.jpg",
    href: "/units?type=office",
    startingFrom: 36000,
    desc: "Ground floor and first floor private office suites with natural light, split system air conditioning, and direct street access. Corner first-floor units offer district views across the south-east. Professional environment without the CBD price tag.",
    targets: ["Businesses leaving home offices", "Professional services firms", "Teams relocating from CBD or Box Hill", "Businesses needing a registered business address"],
    features: ["128–140m² options", "Ground or first floor", "Natural light (1st floor)", "District views (corner)", "Split system A/C", "NBN provision", "24/7 secure access", "2–3 car spaces"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">
        <div className="bg-[#F5F5F5] border-b border-[#E5E5E5] py-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-2">What we offer</p>
            <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">Services</h1>
            <p className="text-[#6B6B6B] mt-2 text-base max-w-xl">
              Four types of industrial space, all at 17-31 Franklyn Street, Huntingdale VIC 3166.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-24">
          {SERVICES.map((s, i) => (
            <div
              key={s.id}
              id={s.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
            >
              <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                <p className="text-[#2a3065] text-xs font-semibold uppercase tracking-widest mb-3">{s.subtitle}</p>
                <h2 className="text-3xl font-black text-black tracking-tight mb-4">{s.title}</h2>
                <p className="text-[#555555] text-base leading-relaxed mb-6">{s.desc}</p>

                <div className="mb-6">
                  <h3 className="text-black font-semibold text-sm mb-3">Ideal for:</h3>
                  <ul className="space-y-1.5">
                    {s.targets.map((t) => (
                      <li key={t} className="flex items-center gap-2 text-sm text-[#555555]">
                        <CheckCircle size={12} className="text-[#2a3065] shrink-0" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-black font-semibold text-sm mb-3">Inclusions:</h3>
                  <div className="flex flex-wrap gap-2">
                    {s.features.map((f) => (
                      <span key={f} className="text-xs bg-[#EBEBEB] border border-[#E5E5E5] text-[#555555] px-2.5 py-1">{f}</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-[#6B6B6B] text-xs mb-0.5">Starting from</div>
                    <div className="text-black font-black text-xl">${s.startingFrom.toLocaleString("en-AU")}/yr</div>
                    <div className="text-[#6B6B6B] text-xs">ex GST + outgoings</div>
                  </div>
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-5 py-3 text-sm transition-colors"
                  >
                    View units <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              <div className={`relative aspect-[4/3] overflow-hidden ${i % 2 === 1 ? "lg:col-start-1" : ""}`}>
                <Image src={s.img} alt={s.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
