"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "/units", label: "Available Units" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="HexaHub home">
            <Image
              src="/logo/hexahub-mark.svg"
              alt=""
              width={36}
              height={36}
            />
            <span className="text-black font-bold text-xl tracking-tight">
              Hexa<span className="text-[#2a3065]">Hub</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#555555] hover:text-black text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+61000000000"
              className="flex items-center gap-2 text-[#555555] hover:text-black text-sm transition-colors"
            >
              <Phone size={14} />
              <span>Call us</span>
            </a>
            <Link
              href="/units"
              className="bg-[#2a3065] hover:bg-[#1e2a54] text-white text-sm font-semibold px-4 py-2 transition-colors duration-200"
            >
              Browse Units
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-black p-2"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#E5E5E5]">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black text-base font-medium py-3 border-b border-[#E5E5E5] last:border-0"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/units"
              className="mt-4 bg-[#2a3065] hover:bg-[#1e2a54] text-white text-sm font-semibold px-4 py-3 text-center transition-colors"
              onClick={() => setOpen(false)}
            >
              Browse Available Units
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
