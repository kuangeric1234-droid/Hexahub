import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Ecosystem",
  description:
    "The Hexa Hub ecosystem — EIZ Technology, Digitec IT, Australia Post, mentorship, and the Hexa network of spaces across Melbourne.",
};

export default function EcosystemPage() {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">
        <div className="bg-[#F5F5F5] border-b border-[#E5E5E5] py-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-2">
              Platform
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
              The Hexa Hub Ecosystem
            </h1>
            <p className="text-[#6B6B6B] mt-3 text-base max-w-2xl leading-relaxed">
              Hexa Hub is more than physical space. Every member gets access to a connected network of
              logistics, digital, fulfilment, and advisory partners — built into the platform from day one.
            </p>
          </div>
        </div>

        {/* Placeholder — full content built in Phase E */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
          <div className="max-w-xl">
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-4">
              Coming soon
            </p>
            <h2 className="text-2xl font-black text-black tracking-tight mb-4">
              Full ecosystem details launching shortly.
            </h2>
            <p className="text-[#555555] text-base leading-relaxed mb-8">
              We&apos;re building out this page to cover our ecosystem partners — EIZ Technology, Digitec IT,
              Australia Post logistics, and our mentorship programme. In the meantime, get in touch and
              we&apos;ll walk you through what membership includes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-6 py-3 text-sm transition-colors"
              >
                Enquire Now <ArrowRight size={14} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-[#E5E5E5] hover:border-[#999] text-black font-semibold px-6 py-3 text-sm transition-colors"
              >
                About Hexa Hub
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
