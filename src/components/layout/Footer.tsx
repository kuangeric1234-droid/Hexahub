import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F5] border-t border-[#E5E5E5] mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logo/hexahub-mark.svg"
                alt="HexaHub"
                width={36}
                height={36}
              />
              <span className="text-black font-bold text-xl tracking-tight">
                Hexa<span className="text-[#2a3065]">Hub</span>
              </span>
            </Link>
            <p className="text-[#6B6B6B] text-sm leading-relaxed max-w-sm">
              Warehouse units, storage lots, and office-warehouse spaces for lease at Huntingdale, Melbourne. Built for ecommerce operators, tradespeople, importers, and makers who need real space to grow.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://maps.google.com/?q=17-31+Franklyn+Street+Huntingdale+VIC"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-[#6B6B6B] hover:text-black text-sm transition-colors"
              >
                <MapPin size={14} className="mt-0.5 shrink-0 text-[#2a3065]" />
                17-31 Franklyn Street, Huntingdale VIC 3166
              </a>
              <a
                href="mailto:leasing@hexahub.com.au"
                className="flex items-center gap-3 text-[#6B6B6B] hover:text-black text-sm transition-colors"
              >
                <Mail size={14} className="shrink-0 text-[#2a3065]" />
                leasing@hexahub.com.au
              </a>
            </div>
          </div>

          {/* Units */}
          <div>
            <h3 className="text-black font-semibold text-sm uppercase tracking-widest mb-4">Units</h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/units?type=warehouse", label: "Warehouses" },
                { href: "/units?type=storage", label: "Storage Spaces" },
                { href: "/units?type=office-warehouse", label: "Office + Warehouse" },
                { href: "/units?type=office", label: "Offices" },
                { href: "/units", label: "All Available Units" },
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
                { href: "/about", label: "About HexaHub" },
                { href: "/services", label: "Services" },
                { href: "/events", label: "Events" },
                { href: "/contact", label: "Contact" },
                { href: "/contact#book-tour", label: "Book a Tour" },
                { href: "https://hexaspace.com.au", label: "Hexa Space ↗", external: true },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
            © {new Date().getFullYear()} HexaHub. A Hexa Group Company. All rights reserved.
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
