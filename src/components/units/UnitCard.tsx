import Link from "next/link";
import Image from "next/image";
import { Car, Maximize2, ArrowRight } from "lucide-react";
import { StatusBadge, TypeBadge } from "@/components/ui/Badge";
import { urlFor } from "@/lib/sanity/image";
import type { Unit } from "@/lib/sanity/queries";
import BookTourModal from "@/components/units/BookTourModal";

function formatMonthly(annual?: number) {
  if (!annual) return "Contact for Pricing";
  return `$${Math.round(annual / 12).toLocaleString("en-AU")}/mo`;
}

function formatAnnual(annual?: number) {
  if (!annual) return null;
  return `$${annual.toLocaleString("en-AU")}/yr`;
}

export default function UnitCard({ unit }: { unit: Unit }) {
  const photo = unit.photos?.[0];
  const imgSrc = photo ? urlFor(photo.asset).width(640).height(400).fit("crop").auto("format").url() : null;
  const isLease = unit.listingType !== "for-sale";

  const href = `/units/${unit.slug.current}`;

  return (
    <div className="group bg-white border border-[#E5E5E5] hover:border-[#2a3065]/60 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image */}
      <Link href={href} className="relative aspect-[16/10] overflow-hidden bg-[#EBEBEB] block">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={photo?.alt ?? unit.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#C8C8C8] text-4xl font-bold">{unit.unitId}</span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <StatusBadge status={unit.status as Parameters<typeof StatusBadge>[0]["status"]} />
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${isLease ? "bg-[#2a3065]/10 text-[#2a3065]" : "bg-[#2E1F0A] text-[#C8922A]"}`}>
            {isLease ? "For Lease" : "For Sale"}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <Link href={href} className="flex items-start justify-between gap-2 mb-3">
          <div>
            <TypeBadge type={unit.type as Parameters<typeof TypeBadge>[0]["type"]} />
            <h3 className="text-black font-semibold text-base mt-2 leading-tight group-hover:text-[#2a3065] transition-colors">
              {unit.title}
            </h3>
          </div>
          <span className="text-[#6B6B6B] text-xs font-mono shrink-0 bg-[#EBEBEB] px-2 py-1">
            {unit.unitId}
          </span>
        </Link>

        {unit.attributes && (
          <p className="text-[#555555] text-sm leading-relaxed mb-4 line-clamp-2">{unit.attributes}</p>
        )}

        {/* Specs + Price */}
        <div className="flex items-end justify-between gap-4 mt-auto pt-4 border-t border-[#E5E5E5]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[#555555] text-sm">
              <Maximize2 size={13} />
              <span>{unit.sizeSquareMetres}m²</span>
            </div>
            {unit.parkingSpaces != null && (
              <div className="flex items-center gap-1.5 text-[#555555] text-sm">
                <Car size={13} />
                <span>{unit.parkingSpaces} car{unit.parkingSpaces !== 1 ? "s" : ""}</span>
              </div>
            )}
          </div>
          <div className="text-right shrink-0">
            <div className="text-black font-bold text-base">
              {formatMonthly(unit.annualPrice)}
            </div>
            {formatAnnual(unit.annualPrice) && (
              <div className="text-[#6B6B6B] text-xs">{formatAnnual(unit.annualPrice)} ex GST</div>
            )}
          </div>
        </div>

        <BookTourModal unitTitle={unit.title} unitId={unit.unitId} />

        <Link href={href} className="flex items-center gap-1 text-[#2a3065] text-xs font-medium mt-3 hover:gap-2 transition-all">
          <span>View details</span>
          <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
