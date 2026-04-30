import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F5] border-t border-[#E5E5E5] mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex mb-4">
              <Image
                src="/hexahub-logo.png"
                alt="HexaHub"
                width={108}
                height={36}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-[#6B6B6B] text-sm leading-relaxed max-w-sm">
              A business infrastructure platform where brands land, operate, and grow in Australia. Space, operations, and ecosystem — all in one place.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://maps.google.com/?q=7+Distribution+Circuit+Huntingdale+VIC"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-[#6B6B6B] hover:text-black text-sm transition-colors"
              >
                <MapPin size={14} className="mt-0.5 shrink-0 text-[#2a3065]" />
                7 Distribution Circuit, Huntingdale VIC 3166
              </a>
              <a
                href="mailto:info@hexahub.com.au"
                className="flex items-center gap-3 text-[#6B6B6B] hover:text-black text-sm transition-colors"
              >
                <Mail size={14} className="shrink-0 text-[#2a3065]" />
                info@hexahub.com.au
              </a>
              <a
                href="tel:+61406016666"
                className="flex items-center gap-3 text-[#6B6B6B] hover:text-black text-sm transition-colors"
              >
                <Phone size={14} className="shrink-0 text-[#2a3065]" />
                +61 406 016 666
              </a>
            </div>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              <a href="https://www.instagram.com/hexahub.au/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center border border-[#E5E5E5] hover:border-[#2a3065] hover:text-[#2a3065] text-[#6B6B6B] transition-colors rounded-full">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61585543572531" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center border border-[#E5E5E5] hover:border-[#2a3065] hover:text-[#2a3065] text-[#6B6B6B] transition-colors rounded-full">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/hexa-hub/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center border border-[#E5E5E5] hover:border-[#2a3065] hover:text-[#2a3065] text-[#6B6B6B] transition-colors rounded-full">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Spaces */}
          <div>
            <h3 className="text-black font-semibold text-sm uppercase tracking-widest mb-4">Spaces</h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/units?type=warehouse", label: "Warehouses" },
                { href: "/units?type=storage", label: "Storage Spaces" },
                { href: "/units?type=showroom-warehouse", label: "Showroom + Warehouse" },
                { href: "/units?type=office-warehouse", label: "Office + Warehouse" },
                { href: "/units?type=office", label: "Offices" },
                { href: "/units", label: "All Available Spaces" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#6B6B6B] hover:text-black text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-black font-semibold text-sm uppercase tracking-widest mb-4">Company</h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/about", label: "About Hexa Hub" },
                { href: "/ecosystem", label: "Ecosystem Partners" },
                { href: "/members", label: "Members" },
                { href: "/events", label: "Events" },
                { href: "/contact", label: "Contact" },
                { href: "/contact#book-tour", label: "Book a Tour" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#6B6B6B] hover:text-black text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-black font-semibold text-sm uppercase tracking-widest mt-8 mb-4">The Hexa Network</h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: "https://hexaspace.com.au", label: "Hexa Space ↗", external: true },
                { href: "/ecosystem#retail", label: "369 Lonsdale St" },
                { href: "/ecosystem#retail", label: "878 Whitehorse Rd" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    {...("external" in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-[#6B6B6B] hover:text-black text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#6B6B6B] text-xs">
            © {new Date().getFullYear()} Hexa Hub. A Hexa Group Company. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[#6B6B6B] hover:text-black text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[#6B6B6B] hover:text-black text-xs transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
