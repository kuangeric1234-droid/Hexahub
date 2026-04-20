import type { Metadata } from "next";
import { MapPin, Mail, Phone, Clock, ExternalLink } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EnquiryForm from "@/components/forms/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Hexa Hub to enquire about available spaces, membership options, or book a site tour at Huntingdale Melbourne.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">
        <div className="bg-[#F5F5F5] border-b border-[#E5E5E5] py-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-2">Get in touch</p>
            <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">Contact Us</h1>
            <p className="text-[#6B6B6B] mt-3 text-base max-w-xl leading-relaxed">
              Enquire about spaces, membership options, or book a tour — the team will get back to you within one business day.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info */}
            <div>
              <h2 className="text-black font-bold text-xl mb-8">We&apos;re available to show you around.</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin size={18} className="text-[#2a3065] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-black font-semibold text-sm mb-1">Address</div>
                    <div className="text-[#555555] text-sm">
                      7 Distribution Circuit<br />Huntingdale VIC 3166
                    </div>
                    <a
                      href="https://maps.google.com/?q=7+Distribution+Circuit+Huntingdale+VIC"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#2a3065] text-xs mt-2 hover:underline"
                    >
                      Get directions <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail size={18} className="text-[#2a3065] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-black font-semibold text-sm mb-1">Email</div>
                    <a
                      href="mailto:marketing@hexa.com.au"
                      className="text-[#555555] hover:text-black text-sm transition-colors"
                    >
                      marketing@hexa.com.au
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone size={18} className="text-[#2a3065] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-black font-semibold text-sm mb-1">Phone</div>
                    <a
                      href="tel:+61406016666"
                      className="text-[#555555] hover:text-black text-sm transition-colors"
                    >
                      +61 406 016 666
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock size={18} className="text-[#2a3065] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-black font-semibold text-sm mb-1">Business Hours</div>
                    <div className="text-[#555555] text-sm">Mon–Fri 9am–5pm AEST<br />Site access 24/7 for tenants</div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-10 bg-[#F5F5F5] border border-[#E5E5E5] aspect-video flex items-center justify-center">
                <a
                  href="https://maps.google.com/?q=7+Distribution+Circuit+Huntingdale+VIC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2a3065] text-sm underline"
                >
                  Open in Google Maps
                </a>
              </div>

              <div id="book-tour" className="mt-10 bg-[#F5F5F5] border border-[#2a3065]/40 p-6">
                <h3 className="text-black font-bold mb-2">Book a Site Tour</h3>
                <p className="text-[#555555] text-sm">
                  The best way to understand the space is to walk it. We offer tours Monday–Friday. Select
                  &ldquo;Book a site tour&rdquo; in the form, or mention it in your message, and we&apos;ll
                  find a time that works.
                </p>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-black font-bold text-xl mb-6">Send an Enquiry</h2>
              <EnquiryForm source="contact-page" showInterestField={true} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
