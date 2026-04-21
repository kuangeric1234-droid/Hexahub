"use client";

import { useState } from "react";
import Image from "next/image";
import { Member, MemberCategory } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

const CATEGORIES: { label: string; value: MemberCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "E-commerce & Retail", value: "ecommerce-retail" },
  { label: "Logistics & Fulfilment", value: "logistics-fulfilment" },
  { label: "Technology & Digital", value: "technology-digital" },
  { label: "Health & Beauty", value: "health-beauty" },
  { label: "Food & Beverage", value: "food-beverage" },
  { label: "Home & Lifestyle", value: "home-lifestyle" },
  { label: "Fashion & Apparel", value: "fashion-apparel" },
  { label: "Professional Services", value: "professional-services" },
  { label: "Other", value: "other" },
];

export default function MembersGrid({ members }: { members: Member[] }) {
  const [active, setActive] = useState<MemberCategory | "all">("all");

  const filtered =
    active === "all" ? members : members.filter((m) => m.category === active);

  const hasAny = CATEGORIES.slice(1).some((c) =>
    members.some((m) => m.category === c.value)
  );

  return (
    <section className="border-t border-[#E5E5E5] pt-20">
      <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
        The community
      </p>
      <h2 className="text-3xl font-black text-black tracking-tight mb-8">
        Browse all members
      </h2>

      {/* Filter pills */}
      {hasAny && (
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(({ label, value }) => {
            const count =
              value === "all"
                ? members.length
                : members.filter((m) => m.category === value).length;
            if (value !== "all" && count === 0) return null;
            return (
              <button
                key={value}
                onClick={() => setActive(value)}
                className={`px-4 py-1.5 text-sm font-medium border transition-colors ${
                  active === value
                    ? "bg-[#2a3065] text-white border-[#2a3065]"
                    : "bg-white text-[#555555] border-[#E5E5E5] hover:border-[#2a3065]/40 hover:text-black"
                }`}
              >
                {label}
                {count > 0 && (
                  <span
                    className={`ml-1.5 text-xs ${
                      active === value ? "text-white/70" : "text-[#999]"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Logo grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center border border-[#E5E5E5]">
          <p className="text-[#6B6B6B] text-sm">
            No members in this category yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {filtered.map((m) => {
            const tile = (
              <div className="group aspect-square border border-[#E5E5E5] hover:border-[#2a3065]/30 bg-[#F5F5F5] hover:bg-white flex items-center justify-center p-6 transition-colors">
                {m.logo?.asset ? (
                  <Image
                    src={urlFor(m.logo).width(240).height(240).fit("max").url()}
                    alt={m.name}
                    width={120}
                    height={120}
                    className="object-contain max-h-full max-w-full"
                  />
                ) : (
                  <span className="text-[#2a3065] font-black text-lg text-center leading-tight">
                    {m.name}
                  </span>
                )}
              </div>
            );

            return m.website ? (
              <a
                key={m._id}
                href={m.website}
                target="_blank"
                rel="noopener noreferrer"
                title={m.name}
              >
                {tile}
              </a>
            ) : (
              <div key={m._id} title={m.name}>
                {tile}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
