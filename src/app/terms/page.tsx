import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <h1 className="text-3xl font-bold text-black tracking-tight mb-4">Terms of Use</h1>
          <p className="text-[#6B6B6B] text-sm mb-8">Last updated: {new Date().toLocaleDateString("en-AU")}</p>
          <div className="bg-[#F5F5F5] border border-[#E5E5E5] p-8 text-[#555555] text-sm leading-relaxed">
            <p>Terms of use content to be provided by HexaHub / Hexa Group legal team.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
