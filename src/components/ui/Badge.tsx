import clsx from "clsx";

type Status = "available" | "under-offer" | "coming-soon" | "leased" | "sold";
type UnitType = "warehouse" | "storage" | "office-warehouse" | "office";

const STATUS_CONFIG: Record<Status, { label: string; className: string }> = {
  "available":    { label: "Available Now", className: "bg-[#2a3065]/10 text-[#2a3065] border border-[#2a3065]/30" },
  "under-offer":  { label: "Under Offer",   className: "bg-[#C8922A]/20 text-[#C8922A] border border-[#C8922A]/40" },
  "coming-soon":  { label: "Coming Soon",   className: "bg-[#EBEBEB] text-[#555555] border border-[#E5E5E5]" },
  "leased":       { label: "Leased",        className: "bg-[#EBEBEB] text-[#6B6B6B] border border-[#E5E5E5]" },
  "sold":         { label: "Sold",          className: "bg-[#EBEBEB] text-[#6B6B6B] border border-[#E5E5E5]" },
};

const TYPE_LABELS: Record<UnitType, string> = {
  "warehouse":        "Warehouse",
  "storage":          "Storage",
  "office-warehouse": "Office + Warehouse",
  "office":           "Office",
};

export function StatusBadge({ status }: { status: Status }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG["available"];
  return (
    <span className={clsx("inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-sm", config.className)}>
      {config.label}
    </span>
  );
}

export function TypeBadge({ type }: { type: UnitType }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-[#EBEBEB] text-[#555555] border border-[#E5E5E5] rounded-sm">
      {TYPE_LABELS[type] ?? type}
    </span>
  );
}
