"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Package, Building2, Boxes, ArrowRight } from "lucide-react";
import Link from "next/link";

const TYPES = [
  {
    id: "warehouse",
    label: "Warehouse",
    icon: Package,
    href: "/units?type=warehouse",
  },
  {
    id: "office",
    label: "Private Office",
    icon: Building2,
    href: "/units?type=office-warehouse",
  },
  {
    id: "storage",
    label: "Storage",
    icon: Boxes,
    href: "/units?type=storage",
  },
] as const;

type TypeId = (typeof TYPES)[number]["id"];

export default function SpaceTypeSelector() {
  const [selected, setSelected] = useState<TypeId>("warehouse");
  const router = useRouter();

  const selectedHref = TYPES.find((t) => t.id === selected)!.href;

  return (
    <div className="mb-12">
      {/* Type toggles */}
      <div className="flex flex-wrap gap-3 mb-5">
        {TYPES.map(({ id, label, icon: Icon }) => {
          const active = selected === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setSelected(id)}
              aria-pressed={active}
              className={`flex flex-col items-center gap-2 px-5 py-3.5 rounded-xl border-2 text-sm font-semibold transition-all duration-150 min-w-[110px]
                ${active
                  ? "border-[#2a3065] bg-[#2a3065] text-white shadow-sm"
                  : "border-[#E5E5E5] bg-white text-[#555555] hover:border-[#2a3065]/50 hover:text-[#2a3065]"
                }`}
            >
              <Icon size={20} strokeWidth={1.75} />
              {label}
            </button>
          );
        })}
      </div>

      {/* Browse button + secondary link */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => router.push(selectedHref)}
          className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-8 py-4 text-base transition-colors duration-200"
        >
          Browse <ArrowRight size={16} />
        </button>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-[#2a3065] font-semibold text-base hover:underline transition-colors duration-200"
        >
          Speak to our team <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
