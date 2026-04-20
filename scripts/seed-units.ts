/**
 * Seed script — HexaHub unit inventory
 * Run: npx tsx scripts/seed-units.ts
 * Requires: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN in .env.local
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-04-20",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

const RENDERS_DIR = path.join(process.cwd(), "public", "renders");

// ─── Render → unit mapping ───────────────────────────────────────────────────
const RENDER_FILES: Record<string, string> = {
  "aerial":          "Aerial.jpg",
  "block-b-front":   "Block B Front.jpg",
  "block-b-close":   "Block B Front Close Up.jpg",
  "block-h-front":   "Block H Front.jpg",
  "external-a":      "External Block A.jpg",
  "external-b":      "External Block B.jpg",
  "external-c":      "External Block C.jpg",
  "external-f":      "External Block F.jpg",
  "hero-storage":    "Hero Storage.jpg",
  "internal":        "Internal.jpg",
  "mezzanine":       "Mezzanine.jpg",
  "mezzanine-floor": "Mezzanine (Floor Boards).jpg",
  "storage-entry":   "Storage Entry.jpg",
  "storage-final":   "Storage Final Image LOW RES.jpg",
  "storage-plain":   "Storage.jpg",
  "the-hub":         "The Hub @ Found Spaces.jpg",
  "bathroom":        "Bathroom.jpg",
};

// ─── Unit definitions ─────────────────────────────────────────────────────────
const UNITS = [
  // ── Block H Warehouse ──────────────────────────────────────────────────────
  {
    unitId: "61W",
    title: "Warehouse 61W — Block H",
    slug: "61w-block-h",
    type: "warehouse",
    listingType: "for-lease",
    status: "available",
    streetAddress: "15 Logistic Court, Huntingdale VIC 3166",
    block: "Block H",
    sizeSquareMetres: 243,
    groundFloorM2: 81,
    firstFloorM2: 81,
    secondFloorM2: 81,
    annualPrice: 58000,
    minimumTerm: "12 months",
    parkingSpaces: 3,
    features: [
      "Roller door access", "24/7 secure access", "3-phase power",
      "Mezzanine office", "Balcony", "Kitchenette", "Private bathroom",
      "LED high-bay lighting", "Polished concrete floors", "NBN provision", "24hr CCTV", "The Hub access",
    ],
    powerSupply: "3-phase",
    accessHours: "24/7",
    hasMezzanine: true,
    hasLoadingZone: true,
    attributes: "Additional dual level office with balcony to the top floor.",
    featured: true,
    renderKeys: ["block-h-front", "internal", "mezzanine-floor", "the-hub"],
  },

  // ── Block G Warehouses ─────────────────────────────────────────────────────
  {
    unitId: "51W",
    title: "Warehouse 51W — Block G",
    slug: "51w-block-g",
    type: "warehouse",
    listingType: "for-lease",
    status: "available",
    streetAddress: "2 Logistic Court, Huntingdale VIC 3166",
    block: "Block G",
    sizeSquareMetres: 223,
    groundFloorM2: 171,
    firstFloorM2: 52,
    annualPrice: 49000,
    minimumTerm: "12 months",
    parkingSpaces: 3,
    features: [
      "Roller door access", "24/7 secure access", "3-phase power",
      "Mezzanine office", "Kitchenette", "Private bathroom",
      "LED high-bay lighting", "Polished concrete floors", "NBN provision", "24hr CCTV", "The Hub access",
    ],
    powerSupply: "3-phase",
    accessHours: "24/7",
    hasMezzanine: true,
    hasLoadingZone: true,
    attributes: "First warehouse from Franklyn Street — easy access, traditional office/warehouse.",
    featured: true,
    renderKeys: ["external-f", "internal", "mezzanine-floor", "the-hub"],
  },
  {
    unitId: "55W",
    title: "Warehouse 55W — Block G",
    slug: "55w-block-g",
    type: "warehouse",
    listingType: "for-lease",
    status: "available",
    streetAddress: "6 Logistic Court, Huntingdale VIC 3166",
    block: "Block G",
    sizeSquareMetres: 223,
    groundFloorM2: 171,
    firstFloorM2: 52,
    annualPrice: 49000,
    minimumTerm: "12 months",
    parkingSpaces: 3,
    features: [
      "Roller door access", "24/7 secure access", "3-phase power",
      "Mezzanine office", "Kitchenette", "Private bathroom",
      "LED high-bay lighting", "Polished concrete floors", "NBN provision", "24hr CCTV", "The Hub access",
    ],
    powerSupply: "3-phase",
    accessHours: "24/7",
    hasMezzanine: true,
    hasLoadingZone: true,
    attributes: "Positioned opposite the storage driveway — superior vehicle access and manoeuvrability.",
    featured: true,
    renderKeys: ["external-f", "internal", "mezzanine-floor", "the-hub"],
  },

  // ── Block B Office + Warehouse ─────────────────────────────────────────────
  {
    unitId: "O5",
    title: "Office + Warehouse O5 — Block B",
    slug: "o5-block-b",
    type: "office-warehouse",
    listingType: "for-lease",
    status: "available",
    streetAddress: "11 Distribution Circuit, Huntingdale VIC 3166",
    block: "Block B",
    sizeSquareMetres: 240,
    groundFloorM2: 120,
    firstFloorM2: 120,
    annualPrice: 56500,
    minimumTerm: "12 months",
    parkingSpaces: 5,
    features: [
      "Tilt door access", "Street frontage", "Full floor office", "24/7 secure access",
      "3-phase power", "Kitchenette", "Private bathroom",
      "LED high-bay lighting", "Polished concrete floors", "NBN provision", "24hr CCTV", "The Hub access",
      "Split system A/C",
    ],
    powerSupply: "3-phase",
    accessHours: "24/7",
    hasMezzanine: false,
    hasLoadingZone: true,
    attributes: "Street frontage on Distribution Circuit with rear tilt door and full upper-floor office.",
    featured: true,
    renderKeys: ["block-b-front", "block-b-close", "mezzanine", "the-hub"],
  },
  {
    unitId: "O7",
    title: "Office + Warehouse O7 — Block B",
    slug: "o7-block-b",
    type: "office-warehouse",
    listingType: "for-lease",
    status: "available",
    streetAddress: "15 Distribution Circuit, Huntingdale VIC 3166",
    block: "Block B",
    sizeSquareMetres: 240,
    groundFloorM2: 120,
    firstFloorM2: 120,
    annualPrice: 56500,
    minimumTerm: "12 months",
    parkingSpaces: 5,
    features: [
      "Tilt door access", "Street frontage", "Full floor office", "24/7 secure access",
      "3-phase power", "Kitchenette", "Private bathroom",
      "LED high-bay lighting", "Polished concrete floors", "NBN provision", "24hr CCTV", "The Hub access",
      "Split system A/C",
    ],
    powerSupply: "3-phase",
    accessHours: "24/7",
    hasMezzanine: false,
    hasLoadingZone: true,
    attributes: "Street frontage on Distribution Circuit with rear tilt door and full upper-floor office.",
    featured: false,
    renderKeys: ["block-b-front", "block-b-close", "mezzanine", "the-hub"],
  },

  // ── Block B Office (1st Floor) ─────────────────────────────────────────────
  {
    unitId: "O10",
    title: "Office O10 — Block B",
    slug: "o10-block-b",
    type: "office",
    listingType: "for-lease",
    status: "available",
    streetAddress: "103 Distribution Circuit, Huntingdale VIC 3166",
    block: "Block B",
    sizeSquareMetres: 140,
    groundFloorM2: 0,
    firstFloorM2: 140,
    annualPrice: 43000,
    minimumTerm: "12 months",
    parkingSpaces: 3,
    features: [
      "24/7 secure access", "Split system A/C", "Natural light", "District views",
      "LED lighting", "NBN provision", "24hr CCTV", "The Hub access",
    ],
    powerSupply: "Single-phase",
    accessHours: "24/7",
    hasMezzanine: false,
    hasLoadingZone: false,
    attributes: "Corner first-floor office with abundant natural light and district views.",
    featured: false,
    renderKeys: ["block-b-front", "mezzanine", "the-hub"],
  },
  {
    unitId: "O11",
    title: "Office O11 — Block B",
    slug: "o11-block-b",
    type: "office",
    listingType: "for-lease",
    status: "available",
    streetAddress: "103 Distribution Circuit, Huntingdale VIC 3166",
    block: "Block B",
    sizeSquareMetres: 128,
    groundFloorM2: 0,
    firstFloorM2: 128,
    annualPrice: 40000,
    minimumTerm: "12 months",
    parkingSpaces: 2,
    features: [
      "24/7 secure access", "Split system A/C", "Natural light", "District views",
      "LED lighting", "NBN provision", "24hr CCTV", "The Hub access",
    ],
    powerSupply: "Single-phase",
    accessHours: "24/7",
    hasMezzanine: false,
    hasLoadingZone: false,
    attributes: "Corner first-floor office with district views and natural light.",
    featured: false,
    renderKeys: ["block-b-front", "mezzanine", "the-hub"],
  },

  // ── Block B Office (Ground Floor) ─────────────────────────────────────────
  {
    unitId: "O14",
    title: "Office O14 — Block B",
    slug: "o14-block-b",
    type: "office",
    listingType: "for-lease",
    status: "available",
    streetAddress: "19 Logistic Court, Huntingdale VIC 3166",
    block: "Block B",
    sizeSquareMetres: 136,
    groundFloorM2: 136,
    firstFloorM2: 0,
    annualPrice: 36000,
    minimumTerm: "12 months",
    parkingSpaces: 3,
    features: [
      "24/7 secure access", "Split system A/C", "Street frontage",
      "LED lighting", "NBN provision", "24hr CCTV", "The Hub access",
    ],
    powerSupply: "Single-phase",
    accessHours: "24/7",
    hasMezzanine: false,
    hasLoadingZone: false,
    attributes: "Ground floor office with private access direct from Franklyn Street.",
    featured: false,
    renderKeys: ["block-b-front", "mezzanine", "the-hub"],
  },
  {
    unitId: "O15",
    title: "Office O15 — Block B",
    slug: "o15-block-b",
    type: "office",
    listingType: "for-lease",
    status: "available",
    streetAddress: "20 Logistic Court, Huntingdale VIC 3166",
    block: "Block B",
    sizeSquareMetres: 136,
    groundFloorM2: 136,
    firstFloorM2: 0,
    annualPrice: 36000,
    minimumTerm: "12 months",
    parkingSpaces: 3,
    features: [
      "24/7 secure access", "Split system A/C", "Street frontage",
      "LED lighting", "NBN provision", "24hr CCTV", "The Hub access",
    ],
    powerSupply: "Single-phase",
    accessHours: "24/7",
    hasMezzanine: false,
    hasLoadingZone: false,
    attributes: "Ground floor office with private access direct from Franklyn Street.",
    featured: false,
    renderKeys: ["block-b-front", "mezzanine", "the-hub"],
  },

  // ── Storage Units (18 Logistic Court) ─────────────────────────────────────
  {
    unitId: "48S",
    title: "Storage 48S — Drive Through",
    slug: "48s-storage",
    type: "storage",
    listingType: "for-lease",
    status: "available",
    streetAddress: "44/18 Logistic Court, Huntingdale VIC 3166",
    block: "Store",
    sizeSquareMetres: 75,
    groundFloorM2: 75,
    annualPrice: 19500,
    minimumTerm: "12 months",
    parkingSpaces: 1,
    features: [
      "Roller door access", "Drive through", "24/7 secure access", "Single-phase power",
      "LED high-bay lighting", "Polished concrete floors", "24hr CCTV", "Wireless keypad",
    ],
    powerSupply: "Single-phase",
    accessHours: "24/7",
    hasMezzanine: false,
    hasLoadingZone: false,
    attributes: "Drive-through storage — ideal for large vehicles or frequent access.",
    featured: true,
    renderKeys: ["storage-final", "hero-storage", "storage-entry"],
  },
  {
    unitId: "42S",
    title: "Storage 42S — Opposite The Hub",
    slug: "42s-storage",
    type: "storage",
    listingType: "for-lease",
    status: "under-offer",
    streetAddress: "38/18 Logistic Court, Huntingdale VIC 3166",
    block: "Store",
    sizeSquareMetres: 71,
    groundFloorM2: 71,
    annualPrice: 18800,
    minimumTerm: "12 months",
    parkingSpaces: 1,
    features: [
      "Roller door access", "Drive through", "24/7 secure access", "Single-phase power",
      "LED high-bay lighting", "Polished concrete floors", "24hr CCTV", "Wireless keypad", "The Hub access",
    ],
    powerSupply: "Single-phase",
    accessHours: "24/7",
    hasMezzanine: false,
    hasLoadingZone: false,
    attributes: "Opposite The Hub with drive-through access.",
    featured: false,
    renderKeys: ["storage-final", "hero-storage", "the-hub"],
  },
  {
    unitId: "57S",
    title: "Storage 57S — Opposite The Hub",
    slug: "57s-storage",
    type: "storage",
    listingType: "for-lease",
    status: "available",
    streetAddress: "47/18 Logistic Court, Huntingdale VIC 3166",
    block: "Store",
    sizeSquareMetres: 43,
    groundFloorM2: 43,
    annualPrice: 12900,
    minimumTerm: "12 months",
    parkingSpaces: 1,
    features: [
      "Roller door access", "24/7 secure access", "Single-phase power",
      "LED high-bay lighting", "Polished concrete floors", "24hr CCTV", "Wireless keypad", "The Hub access",
    ],
    powerSupply: "Single-phase",
    accessHours: "24/7",
    hasMezzanine: false,
    hasLoadingZone: false,
    attributes: "Positioned directly opposite The Hub amenity space.",
    featured: false,
    renderKeys: ["storage-final", "hero-storage", "the-hub"],
  },
  {
    unitId: "56S",
    title: "Storage 56S — Opposite The Hub",
    slug: "56s-storage",
    type: "storage",
    listingType: "for-lease",
    status: "available",
    streetAddress: "34/18 Logistic Court, Huntingdale VIC 3166",
    block: "Store",
    sizeSquareMetres: 39,
    groundFloorM2: 39,
    annualPrice: 11700,
    minimumTerm: "12 months",
    parkingSpaces: 1,
    features: [
      "Roller door access", "24/7 secure access", "Single-phase power",
      "LED high-bay lighting", "Polished concrete floors", "24hr CCTV", "Wireless keypad", "The Hub access",
    ],
    powerSupply: "Single-phase",
    accessHours: "24/7",
    hasMezzanine: false,
    hasLoadingZone: false,
    attributes: "Opposite The Hub.",
    featured: false,
    renderKeys: ["storage-final", "hero-storage", "storage-entry"],
  },
  {
    unitId: "26S",
    title: "Storage 26S",
    slug: "26s-storage",
    type: "storage",
    listingType: "for-lease",
    status: "available",
    streetAddress: "58/18 Logistic Court, Huntingdale VIC 3166",
    block: "Store",
    sizeSquareMetres: 39,
    groundFloorM2: 39,
    annualPrice: 11700,
    minimumTerm: "12 months",
    parkingSpaces: 1,
    features: [
      "Roller door access", "24/7 secure access", "Single-phase power",
      "LED high-bay lighting", "Polished concrete floors", "24hr CCTV", "Wireless keypad",
    ],
    powerSupply: "Single-phase",
    accessHours: "24/7",
    hasMezzanine: false,
    hasLoadingZone: false,
    attributes: "Base storage unit — efficient and affordable.",
    featured: false,
    renderKeys: ["storage-final", "hero-storage", "storage-entry"],
  },
  {
    unitId: "61S",
    title: "Storage 61S",
    slug: "61s-storage",
    type: "storage",
    listingType: "for-lease",
    status: "available",
    streetAddress: "25/18 Logistic Court, Huntingdale VIC 3166",
    block: "Store",
    sizeSquareMetres: 37,
    groundFloorM2: 37,
    annualPrice: 11300,
    minimumTerm: "12 months",
    parkingSpaces: 1,
    features: [
      "Roller door access", "24/7 secure access", "Wireless keypad", "Single-phase power",
      "LED high-bay lighting", "Polished concrete floors", "24hr CCTV",
    ],
    powerSupply: "Single-phase",
    accessHours: "24/7",
    hasMezzanine: false,
    hasLoadingZone: false,
    attributes: "Wireless keypad entry with protective bollards.",
    featured: false,
    renderKeys: ["storage-final", "hero-storage", "storage-entry"],
  },
  {
    unitId: "43S",
    title: "Storage 43S",
    slug: "43s-storage",
    type: "storage",
    listingType: "for-lease",
    status: "under-offer",
    streetAddress: "39/18 Logistic Court, Huntingdale VIC 3166",
    block: "Store",
    sizeSquareMetres: 31,
    groundFloorM2: 31,
    annualPrice: 9920,
    minimumTerm: "12 months",
    parkingSpaces: 1,
    features: [
      "Roller door access", "24/7 secure access", "Single-phase power",
      "LED high-bay lighting", "Polished concrete floors", "24hr CCTV", "Wireless keypad",
    ],
    powerSupply: "Single-phase",
    accessHours: "24/7",
    hasMezzanine: false,
    hasLoadingZone: false,
    attributes: "Compact base storage unit.",
    featured: false,
    renderKeys: ["storage-final", "hero-storage"],
  },
];

// ─── Upload image and return asset reference ───────────────────────────────────
async function uploadImage(renderKey: string): Promise<{ _type: "reference"; _ref: string } | null> {
  const filename = RENDER_FILES[renderKey];
  if (!filename) return null;
  const filePath = path.join(RENDERS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠ Render not found: ${filePath}`);
    return null;
  }
  const buffer = fs.readFileSync(filePath);
  try {
    const asset = await client.assets.upload("image", buffer, {
      filename,
      contentType: "image/jpeg",
    });
    return { _type: "reference", _ref: asset._id };
  } catch (err) {
    console.error(`  ✗ Failed to upload ${filename}:`, err);
    return null;
  }
}

// ─── Main seed function ────────────────────────────────────────────────────────
async function seed() {
  console.log("\n🌱  HexaHub seed script starting...\n");
  console.log(`   Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`   Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error("✗ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local");
    process.exit(1);
  }

  // Upload renders (deduplicate)
  console.log("📸  Uploading renders to Sanity...");
  const assetRefs: Record<string, { _type: "reference"; _ref: string }> = {};
  const allRenderKeys = [...new Set(UNITS.flatMap((u) => u.renderKeys))];
  for (const key of allRenderKeys) {
    process.stdout.write(`   Uploading ${RENDER_FILES[key]}... `);
    const ref = await uploadImage(key);
    if (ref) {
      assetRefs[key] = ref;
      console.log("✓");
    } else {
      console.log("skipped");
    }
  }

  // Delete existing unit documents
  console.log("\n🗑   Removing existing unit documents...");
  const existing = await client.fetch<{ _id: string }[]>(`*[_type == "unit"]{ _id }`);
  for (const doc of existing) {
    await client.delete(doc._id);
  }
  console.log(`   Removed ${existing.length} existing unit(s).`);

  // Create units
  console.log("\n🏗   Creating units...\n");
  for (const unit of UNITS) {
    const { renderKeys, ...data } = unit;
    const photos = renderKeys
      .map((key, i) => {
        const assetRef = assetRefs[key];
        if (!assetRef) return null;
        return {
          _type: "image",
          _key: `photo-${i}`,
          asset: assetRef,
          alt: `${data.title} — view ${i + 1}`,
        };
      })
      .filter(Boolean);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc: any = {
      _type: "unit",
      ...data,
      slug: { _type: "slug", current: data.slug },
      photos,
    };

    await client.create(doc);
    console.log(`   ✓ ${data.unitId} — ${data.title} (${data.sizeSquareMetres}m²)`);
  }

  // Seed site settings singleton
  console.log("\n⚙️   Seeding site settings...");
  await client.createOrReplace({
    _type: "siteSettings",
    _id: "siteSettings",
    phone: "",
    email: "leasing@hexahub.com.au",
    address: "17-31 Franklyn Street, Huntingdale VIC 3166",
    businessHours: "Mon–Fri 9am–5pm",
    heroHeadline: "Your business needs space. We have it.",
    heroSubheadline: "Warehouse units, storage lots, and office spaces available now at Huntingdale, Melbourne.",
  });
  console.log("   ✓ Site settings created.");

  console.log(`\n✅  Seed complete. ${UNITS.length} units created.\n`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
