"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const AMENITIES = [
  {
    title: "Loading zones & roller doors",
    desc: "Dedicated loading zones with full-height roller doors for streamlined inbound and outbound freight.",
  },
  {
    title: "3-phase power",
    desc: "Industrial-grade 3-phase power standard across every unit to support machinery and high-draw operations.",
  },
  {
    title: "24/7 keypad access",
    desc: "Secure keypad entry to every unit and shared area, giving members round-the-clock access to their space.",
  },
  {
    title: "CCTV & perimeter security",
    desc: "Site-wide CCTV coverage and perimeter security monitoring day and night.",
  },
  {
    title: "High-speed NBN",
    desc: "Business-grade NBN internet available in every unit and across the shared facilities.",
  },
  {
    title: "The Hub",
    desc: "A shared lounge and meeting space where members and visitors can work, take calls, or host meetings.",
  },
  {
    title: "On-site carpark",
    desc: "Generous on-site parking for staff, customers, and deliveries — no scrambling for street parking.",
  },
  {
    title: "Carrier access",
    desc: "Regular pickup access for Australia Post, StarTrack, Couriers Please, and direct freight partners.",
  },
  {
    title: "Mezzanine offices",
    desc: "Selected warehouse units include built-in mezzanine offices, giving you workspace above your stock.",
  },
  {
    title: "Ecosystem partners",
    desc: "Direct access to our ecosystem partners — EIZ Technology, Digitec IT, and Australia Post logistics — with introductions included.",
  },
  {
    title: "Australian business address",
    desc: "A registered Melbourne business address at Huntingdale — ready for company registration, imports, and customs paperwork.",
  },
  {
    title: "Flexible monthly terms",
    desc: "Month-to-month membership with no long industrial lease. Scale up, scale down, or add services as your business changes.",
  },
];

export default function AmenitiesAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-start">
      {AMENITIES.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `amenity-panel-${i}`;
        return (
          <div
            key={item.title}
            className="border border-[#E5E5E5] rounded-lg overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-[#F5F5F5] transition-colors duration-150"
            >
              <span className="font-inter-tight font-semibold text-[15px] text-[rgb(36,43,43)]">
                {item.title}
              </span>
              <span
                className="shrink-0 w-6 h-6 rounded-full border border-[#E5E5E5] flex items-center justify-center transition-transform duration-200 ease-out"
                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                aria-hidden="true"
              >
                <Plus size={12} className="text-[#555555]" />
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              className="overflow-hidden transition-all duration-200 ease-out"
              style={{ maxHeight: isOpen ? "200px" : "0px" }}
            >
              <p className="px-5 pb-4 pt-1 text-[#6B6B6B] text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
