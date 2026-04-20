import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import UnitCard from "@/components/units/UnitCard";
import { getAllUnits } from "@/lib/sanity/queries";
import type { Unit } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Available Units",
  description: "Browse warehouse, storage, and office-warehouse spaces available to lease or purchase at HexaHub Huntingdale.",
};

const TYPE_OPTIONS = [
  { value: "", label: "All Types" },
  { value: "warehouse", label: "Warehouse" },
  { value: "storage", label: "Storage" },
  { value: "office-warehouse", label: "Office + Warehouse" },
  { value: "office", label: "Office" },
];

const STATUS_OPTIONS = [
  { value: "", label: "All Status" },
  { value: "available", label: "Available" },
  { value: "under-offer", label: "Under Offer" },
];

interface Props {
  searchParams: Promise<{ type?: string; status?: string; min?: string; max?: string; listing?: string }>;
}

function filterUnits(
  units: Unit[],
  params: { type?: string; status?: string; min?: string; max?: string; listing?: string }
): Unit[] {
  const listing = params.listing ?? "for-lease";
  return units.filter((u) => {
    if (u.listingType !== listing) return false;
    if (params.type && u.type !== params.type) return false;
    if (params.status && u.status !== params.status) return false;
    if (params.min && u.sizeSquareMetres < parseInt(params.min)) return false;
    if (params.max && u.sizeSquareMetres > parseInt(params.max)) return false;
    return true;
  });
}

export const dynamic = "force-dynamic";

export default async function UnitsPage({ searchParams }: Props) {
  const params = await searchParams;
  const activeListing = params.listing ?? "for-lease";
  const allUnits = await getAllUnits().catch(() => [] as Unit[]);
  const filtered = filterUnits(allUnits, params);

  const activeFilters = [params.type, params.status, params.min, params.max].filter(Boolean).length;

  function tabHref(listing: string) {
    const p = new URLSearchParams();
    p.set("listing", listing);
    if (params.type) p.set("type", params.type);
    if (params.status) p.set("status", params.status);
    if (params.min) p.set("min", params.min);
    if (params.max) p.set("max", params.max);
    return `/units?${p.toString()}`;
  }

  const noSaleUnits = activeListing === "for-sale" && filtered.length === 0 &&
    !params.type && !params.status && !params.min && !params.max;

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">
        {/* Page header */}
        <div className="bg-[#F5F5F5] border-b border-[#E5E5E5] py-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-2">
              17-31 Franklyn Street, Huntingdale VIC 3166
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
              {activeListing === "for-sale" ? "Units For Sale" : "Units For Lease"}
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          {/* Lease / Sale tab switcher */}
          <div className="flex border-b border-[#E5E5E5] mb-10">
            <a
              href={tabHref("for-lease")}
              className={`px-6 py-3 text-sm font-bold transition-colors border-b-2 -mb-px ${
                activeListing === "for-lease"
                  ? "text-black border-[#2a3065]"
                  : "text-[#6B6B6B] border-transparent hover:text-[#555555]"
              }`}
            >
              For Lease
            </a>
            <a
              href={tabHref("for-sale")}
              className={`px-6 py-3 text-sm font-bold transition-colors border-b-2 -mb-px ${
                activeListing === "for-sale"
                  ? "text-black border-[#2a3065]"
                  : "text-[#6B6B6B] border-transparent hover:text-[#555555]"
              }`}
            >
              For Sale
            </a>
          </div>

          {/* Secondary filters */}
          <form className="flex flex-wrap gap-3 mb-10" method="GET">
            <input type="hidden" name="listing" value={activeListing} />

            <select
              name="type"
              defaultValue={params.type ?? ""}
              className="bg-white border border-[#E5E5E5] text-black text-sm px-3 py-2 focus:outline-none focus:border-[#2a3065]"
            >
              {TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <select
              name="status"
              defaultValue={params.status ?? ""}
              className="bg-white border border-[#E5E5E5] text-black text-sm px-3 py-2 focus:outline-none focus:border-[#2a3065]"
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <input
              type="number"
              name="min"
              defaultValue={params.min ?? ""}
              placeholder="Min m²"
              className="bg-white border border-[#E5E5E5] text-black text-sm px-3 py-2 w-24 focus:outline-none focus:border-[#2a3065]"
            />
            <input
              type="number"
              name="max"
              defaultValue={params.max ?? ""}
              placeholder="Max m²"
              className="bg-white border border-[#E5E5E5] text-black text-sm px-3 py-2 w-24 focus:outline-none focus:border-[#2a3065]"
            />

            <button
              type="submit"
              className="bg-[#2a3065] hover:bg-[#1e2a54] text-white text-sm font-semibold px-4 py-2 transition-colors"
            >
              Filter
            </button>
            {activeFilters > 0 && (
              <a
                href={`/units?listing=${activeListing}`}
                className="border border-[#E5E5E5] hover:border-[#999] text-[#555555] hover:text-black text-sm px-4 py-2 transition-colors"
              >
                Clear
              </a>
            )}
          </form>

          {/* Result count */}
          {!noSaleUnits && (
            <p className="text-[#6B6B6B] text-sm mb-8">
              {filtered.length} unit{filtered.length !== 1 ? "s" : ""} found
              {activeFilters > 0 ? ` · ${activeFilters} filter${activeFilters > 1 ? "s" : ""} applied` : ""}
            </p>
          )}

          {/* Grid or empty states */}
          {noSaleUnits ? (
            <div className="text-center py-32">
              <p className="text-black font-bold text-xl mb-3">No units currently for sale.</p>
              <p className="text-[#6B6B6B] text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                Check back soon or enquire about upcoming availability — we occasionally bring units to market.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-6 py-3 text-sm transition-colors"
              >
                Enquire about upcoming sales
              </a>
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map((unit) => (
                <UnitCard key={unit._id} unit={unit} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-[#D0D0D0] text-6xl font-black mb-4">—</p>
              <p className="text-black font-semibold text-lg">No units match your filters.</p>
              <p className="text-[#6B6B6B] text-sm mt-2">
                Try adjusting your search or{" "}
                <a href={`/units?listing=${activeListing}`} className="text-[#2a3065] underline">
                  clear all filters
                </a>.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
