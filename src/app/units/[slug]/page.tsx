import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Car, Maximize2, Zap, Clock, ArrowLeft, CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { StatusBadge, TypeBadge } from "@/components/ui/Badge";
import { getUnitBySlug, getAllUnits } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const units = await getAllUnits().catch(() => []);
  return units.map((u) => ({ slug: u.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const unit = await getUnitBySlug(slug).catch(() => null);
  if (!unit) return { title: "Unit Not Found" };
  return {
    title: unit.title,
    description: unit.attributes ?? `${unit.sizeSquareMetres}m² ${unit.type} available to lease at HexaHub Huntingdale.`,
  };
}

function formatMonthly(annual?: number) {
  if (!annual) return "Contact for Pricing";
  return `$${Math.round(annual / 12).toLocaleString("en-AU")}/month`;
}

function formatAnnual(annual?: number) {
  if (!annual) return null;
  return `$${annual.toLocaleString("en-AU")}/year`;
}

export const dynamic = "force-dynamic";

export default async function UnitDetailPage({ params }: Props) {
  const { slug } = await params;
  const unit = await getUnitBySlug(slug).catch(() => null);
  if (!unit) notFound();

  const photos = unit.photos ?? [];
  const heroPhoto = photos[0];
  const heroSrc = heroPhoto
    ? urlFor(heroPhoto.asset).width(1400).height(800).fit("crop").auto("format").url()
    : "/renders/Block H Front.jpg";

  const floorPlanSrc = unit.floorPlan?.asset
    ? urlFor(unit.floorPlan.asset).width(800).auto("format").url()
    : null;

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">
        {/* Back */}
        <div className="bg-[#F5F5F5] border-b border-[#E5E5E5]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5">
            <Link
              href="/units"
              className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-black text-sm transition-colors"
            >
              <ArrowLeft size={14} /> Back to all units
            </Link>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden bg-[#EBEBEB]">
          <Image
            src={heroSrc}
            alt={heroPhoto?.alt ?? unit.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        {/* Thumbnail strip */}
        {photos.length > 1 && (
          <div className="bg-[#F5F5F5] border-b border-[#E5E5E5]">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-3 flex gap-3 overflow-x-auto">
              {photos.slice(0, 6).map((photo, i) => {
                const src = urlFor(photo.asset).width(160).height(100).fit("crop").auto("format").url();
                return (
                  <div key={i} className="relative shrink-0 w-28 h-16 overflow-hidden border border-[#E5E5E5]">
                    <Image src={src} alt={photo.alt ?? `View ${i + 1}`} fill className="object-cover" sizes="112px" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left — details */}
            <div className="lg:col-span-2 space-y-10">
              {/* Title block */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <StatusBadge status={unit.status as Parameters<typeof StatusBadge>[0]["status"]} />
                  <TypeBadge type={unit.type as Parameters<typeof TypeBadge>[0]["type"]} />
                  <span className="text-[#6B6B6B] text-xs font-mono bg-[#EBEBEB] px-2 py-1">{unit.unitId}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-3">{unit.title}</h1>
                {unit.streetAddress && (
                  <div className="flex items-center gap-2 text-[#555555] text-sm">
                    <MapPin size={13} className="text-[#2a3065] shrink-0" />
                    {unit.streetAddress}
                  </div>
                )}
              </div>

              {/* Key specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Maximize2, label: "Total Size", value: `${unit.sizeSquareMetres}m²` },
                  { icon: Car, label: "Car Spaces", value: unit.parkingSpaces != null ? `${unit.parkingSpaces}` : "—" },
                  { icon: Zap, label: "Power", value: unit.powerSupply ?? "—" },
                  { icon: Clock, label: "Access", value: unit.accessHours ?? "24/7" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-[#F5F5F5] border border-[#E5E5E5] p-4">
                    <Icon size={14} className="text-[#2a3065] mb-2" />
                    <div className="text-black font-bold text-lg">{value}</div>
                    <div className="text-[#6B6B6B] text-xs mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              {/* Floor breakdown */}
              {(unit.groundFloorM2 || unit.firstFloorM2 || unit.secondFloorM2) && (
                <div>
                  <h2 className="text-black font-bold text-lg mb-4">Floor Breakdown</h2>
                  <div className="space-y-2">
                    {unit.groundFloorM2 ? (
                      <div className="flex justify-between py-3 border-b border-[#E5E5E5] text-sm">
                        <span className="text-[#555555]">Ground Floor</span>
                        <span className="text-black font-medium">{unit.groundFloorM2}m²</span>
                      </div>
                    ) : null}
                    {unit.firstFloorM2 ? (
                      <div className="flex justify-between py-3 border-b border-[#E5E5E5] text-sm">
                        <span className="text-[#555555]">First Floor / Mezzanine</span>
                        <span className="text-black font-medium">{unit.firstFloorM2}m²</span>
                      </div>
                    ) : null}
                    {unit.secondFloorM2 ? (
                      <div className="flex justify-between py-3 border-b border-[#E5E5E5] text-sm">
                        <span className="text-[#555555]">Second Floor</span>
                        <span className="text-black font-medium">{unit.secondFloorM2}m²</span>
                      </div>
                    ) : null}
                    <div className="flex justify-between py-3 text-sm">
                      <span className="text-black font-semibold">Total</span>
                      <span className="text-black font-bold">{unit.sizeSquareMetres}m²</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Features */}
              {unit.features && unit.features.length > 0 && (
                <div>
                  <h2 className="text-black font-bold text-lg mb-4">Inclusions</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {unit.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-[#555555]">
                        <CheckCircle size={13} className="text-[#2a3065] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Floor plan */}
              {floorPlanSrc && (
                <div>
                  <h2 className="text-black font-bold text-lg mb-4">Floor Plan</h2>
                  <div className="relative bg-white p-4 border border-[#E5E5E5]">
                    <Image
                      src={floorPlanSrc}
                      alt={`${unit.title} floor plan`}
                      width={800}
                      height={500}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Location map placeholder */}
              <div>
                <h2 className="text-black font-bold text-lg mb-4">Location</h2>
                <div className="bg-[#F5F5F5] border border-[#E5E5E5] aspect-video flex items-center justify-center">
                  <a
                    href="https://maps.google.com/?q=17-31+Franklyn+Street+Huntingdale+VIC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2a3065] text-sm underline"
                  >
                    View on Google Maps — 17-31 Franklyn Street, Huntingdale VIC 3166
                  </a>
                </div>
              </div>
            </div>

            {/* Right — pricing + enquiry */}
            <div className="space-y-6">
              {/* Pricing card */}
              <div className="bg-[#F5F5F5] border border-[#E5E5E5] p-6 sticky top-24">
                <div className="mb-6">
                  {/* Listing type badge */}
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 mb-3 ${unit.listingType === "for-sale" ? "bg-[#2E1F0A] text-[#C8922A]" : "bg-[#2a3065]/10 text-[#2a3065]"}`}>
                    {unit.listingType === "for-sale" ? "For Sale" : "For Lease"}
                  </span>

                  {/* Monthly price — prominent */}
                  <div className="text-4xl font-black text-black leading-none">
                    {formatMonthly(unit.annualPrice)}
                  </div>
                  {/* Annual as secondary */}
                  {formatAnnual(unit.annualPrice) && (
                    <div className="text-[#6B6B6B] text-sm mt-2">
                      {formatAnnual(unit.annualPrice)} · Excludes GST & outgoings
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-[#E5E5E5]">
                  {unit.minimumTerm && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B6B6B]">Min. Term</span>
                      <span className="text-black">{unit.minimumTerm}</span>
                    </div>
                  )}
                  {unit.bondAmount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B6B6B]">Bond</span>
                      <span className="text-black">${unit.bondAmount.toLocaleString("en-AU")}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B6B6B]">Availability</span>
                    <StatusBadge status={unit.status as Parameters<typeof StatusBadge>[0]["status"]} />
                  </div>
                </div>

                <EnquiryForm
                  unitId={unit.unitId}
                  unitTitle={unit.title}
                  source={`unit-detail-${unit.unitId}`}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
