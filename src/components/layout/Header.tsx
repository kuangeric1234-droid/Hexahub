"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import {
  Menu, X, Phone, ChevronDown,
  Key, Package, Building2,
  Truck, MailPlus,
} from "lucide-react";

// ── Nav config ────────────────────────────────────────────────────────────────

type DropdownItem = {
  title: string;
  href: string;
  description: string;
  icon: React.ElementType;
};

type DropdownGroup = {
  heading?: string; // optional — Spaces has no heading, Services does
  items: DropdownItem[];
};

type NavItem =
  | { type: "link"; label: string; href: string }
  | { type: "dropdown"; label: string; groups: DropdownGroup[] };

const NAV_CONFIG: NavItem[] = [
  { type: "link", label: "Spaces", href: "/spaces" },
  {
    type: "dropdown",
    label: "Services",
    groups: [
      {
        heading: "Hexa Hub Plans",
        items: [
          {
            title: "Access Plans",
            href: "/access-plans",
            description: "Business address and flexible access to Huntingdale — without a full lease",
            icon: Key,
          },
          {
            title: "Warehouse Spaces",
            href: "/warehouse-spaces",
            description: "Dedicated warehouse units from 223–438m² with 3-phase power and roller doors",
            icon: Package,
          },
          {
            title: "Office Spaces",
            href: "/office-spaces",
            description: "Private offices with natural light and district views — 128–136m²",
            icon: Building2,
          },
        ],
      },
      {
        heading: "Hexa Hub Services",
        items: [
          {
            title: "Operations & Fulfilment",
            href: "/operations",
            description: "On-site support for receiving, storage, and outbound shipping",
            icon: Truck,
          },
          {
            title: "Australia Post Business Partner",
            href: "/australia-post",
            description: "Direct carrier pickup and partner access through our Australia Post integration",
            icon: MailPlus,
          },
        ],
      },
    ],
  },
  { type: "link", label: "Ecosystem", href: "/ecosystem" },
  { type: "link", label: "Members",   href: "/members" },
  { type: "link", label: "Events",    href: "/events" },
  { type: "link", label: "About",     href: "/about" },
  { type: "link", label: "Contact",   href: "/contact" },
];

// ── Shared item row ───────────────────────────────────────────────────────────

function DropdownItemRow({
  item,
  onClose,
}: {
  item: DropdownItem;
  onClose: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onClose}
      className="flex items-start gap-4 px-4 py-3 rounded-lg hover:bg-[#F5F5F5] transition-colors duration-150 group"
    >
      <span className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-[#2a3065]/8 flex items-center justify-center">
        <Icon size={15} className="text-[#2a3065]" />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="font-inter-tight font-semibold text-[14px] text-[rgb(36,43,43)] group-hover:text-black">
          {item.title}
        </span>
        <span className="text-[#6B6B6B] text-[13px] leading-snug">
          {item.description}
        </span>
      </span>
    </Link>
  );
}

// ── Dropdown panel (single-group = 1 col; multi-group = 2+ cols) ──────────────

function DropdownPanel({
  groups,
  onClose,
}: {
  groups: DropdownGroup[];
  onClose: () => void;
}) {
  const isMultiColumn = groups.length > 1;

  return (
    <div
      className={`absolute top-full left-0 mt-1 bg-white border border-[#E5E5E5] rounded-xl shadow-lg p-2 z-50
                  animate-in fade-in slide-in-from-top-1 duration-200
                  ${isMultiColumn ? "w-[700px]" : "w-[440px]"}`}
    >
      <div className={isMultiColumn ? "grid grid-cols-2 gap-2 p-4" : ""}>
        {groups.map((group, gi) => (
          <div key={gi}>
            {group.heading && (
              <p className="px-4 pt-2 pb-3 text-[11px] font-semibold uppercase tracking-wider text-[#6B6B6B]">
                {group.heading}
              </p>
            )}
            <div className="flex flex-col">
              {group.items.map((item) => (
                <DropdownItemRow key={item.href} item={item} onClose={onClose} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Desktop dropdown trigger ──────────────────────────────────────────────────

function DesktopDropdown({ item }: { item: Extract<NavItem, { type: "dropdown" }> }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((v) => !v);
    }
    if (e.key === "Escape") {
      setOpen(false);
      triggerRef.current?.focus();
    }
    if (e.key === "ArrowDown" && !open) {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onKeyDown={handleKeyDown}
        className="flex items-center gap-1 text-[#555555] hover:text-black text-sm font-medium transition-colors duration-200 py-1"
      >
        {item.label}
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <DropdownPanel
          groups={item.groups}
          onClose={() => { setOpen(false); triggerRef.current?.focus(); }}
        />
      )}
    </div>
  );
}

// ── Mobile accordion item ─────────────────────────────────────────────────────

function MobileDropdown({
  item,
  onNavClose,
}: {
  item: Extract<NavItem, { type: "dropdown" }>;
  onNavClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#E5E5E5]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between text-black text-base font-medium py-3 text-left"
      >
        {item.label}
        <ChevronDown
          size={15}
          className={`text-[#6B6B6B] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="pb-3 flex flex-col gap-4">
          {item.groups.map((group, gi) => (
            <div key={gi}>
              {group.heading && (
                <p className="px-1 pb-1 text-[11px] font-semibold uppercase tracking-wider text-[#6B6B6B]">
                  {group.heading}
                </p>
              )}
              <div className="flex flex-col gap-0.5">
                {group.items.map((sub) => {
                  const Icon = sub.icon;
                  return (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={onNavClose}
                      className="flex items-center gap-3 pl-2 pr-2 py-2 rounded-lg hover:bg-[#F5F5F5] transition-colors"
                    >
                      <Icon size={14} className="text-[#2a3065] shrink-0" />
                      <span className="font-inter-tight font-semibold text-[14px] text-[rgb(36,43,43)]">
                        {sub.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label="Hexa Hub home">
            <Image
              src="/hexahub-logo.png"
              alt="Hexa Hub"
              width={108}
              height={36}
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {NAV_CONFIG.map((item) =>
              item.type === "dropdown" ? (
                <DesktopDropdown key={item.label} item={item} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[#555555] hover:text-black text-sm font-medium transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+61406016666"
              className="flex items-center gap-2 text-[#555555] hover:text-black text-sm transition-colors"
            >
              <Phone size={14} />
              <span>+61 406 016 666</span>
            </a>
            <Link
              href="/contact"
              className="bg-[#2a3065] hover:bg-[#1e2a54] text-white text-sm font-semibold px-4 py-2 transition-colors duration-200"
            >
              Enquire Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-black p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#E5E5E5]">
          <nav
            className="max-w-[1440px] mx-auto px-6 py-4 flex flex-col"
            aria-label="Mobile navigation"
          >
            {NAV_CONFIG.map((item) =>
              item.type === "dropdown" ? (
                <MobileDropdown
                  key={item.label}
                  item={item}
                  onNavClose={() => setMobileOpen(false)}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-black text-base font-medium py-3 border-b border-[#E5E5E5] last:border-0"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}

            <Link
              href="/contact"
              className="mt-4 bg-[#2a3065] hover:bg-[#1e2a54] text-white text-sm font-semibold px-4 py-3 text-center transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Enquire Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
