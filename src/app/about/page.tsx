import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about HexaHub — a Hexa Group industrial leasing business at Huntingdale, Melbourne.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">
        <div className="bg-[#F5F5F5] border-b border-[#E5E5E5] py-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-2">About us</p>
            <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">About HexaHub</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-20">
          {/* Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">Our story</p>
              <h2 className="text-3xl font-black text-black tracking-tight mb-6">
                Industrial space that works as hard as you do.
              </h2>
              <div className="space-y-4 text-[#555555] text-base leading-relaxed">
                <p>
                  HexaHub is the industrial leasing arm of Hexa Group — the Melbourne-based property company behind Hexa Space coworking in Box Hill. Where Hexa Space serves knowledge workers, HexaHub is built for operators: ecommerce brands, tradespeople, importers, event companies, and makers who need real floor space to grow their business.
                </p>
                <p>
                  Our units are located at HexaHub Huntingdale — a brand-new, purpose-built industrial precinct at 17-31 Franklyn Street, developed to a high specification with polished concrete floors, LED high-bay lighting, 3-phase power, and 24/7 CCTV throughout.
                </p>
                <p>
                  Every unit is move-in ready. No fit-out cost, no construction timeline. Just space, security, and flexibility.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/renders/Aerial.jpg"
                alt="Aerial view of HexaHub Huntingdale precinct"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Location benefits */}
          <div>
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">Location</p>
            <h2 className="text-3xl font-black text-black tracking-tight mb-8">
              Huntingdale, Melbourne&apos;s south-east corridor.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: "Freeway access", desc: "Minutes from Monash Freeway (M1) via Springvale Road — connect to the entire metro freight network." },
                { title: "Trade precinct", desc: "Surrounded by Oakleigh, Clayton, and Mulgrave industrial hubs — be where your suppliers and customers already are." },
                { title: "Public transport", desc: "Huntingdale and Oakleigh train stations nearby. Staff can get here without a car." },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-[#F5F5F5] border border-[#E5E5E5] p-6">
                  <h3 className="text-black font-bold text-base mb-2">{title}</h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team placeholder */}
          <div>
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">Team</p>
            <h2 className="text-3xl font-black text-black tracking-tight mb-4">The people behind HexaHub</h2>
            <div className="bg-[#F5F5F5] border border-[#E5E5E5] p-8 text-center">
              <p className="text-[#6B6B6B] text-sm">Team profiles coming soon.</p>
            </div>
          </div>

          {/* Hexa Space link */}
          <div className="bg-[#F5F5F5] border border-[#E5E5E5] p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-2">Sibling brand</p>
              <h3 className="text-black font-bold text-xl">Hexa Space</h3>
              <p className="text-[#6B6B6B] text-sm mt-1">Premium coworking and private offices in Box Hill, Melbourne.</p>
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
          <div className="text-center">
            <Link
              href="/units"
              className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-8 py-4 text-base transition-colors"
            >
              Browse Available Units <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
