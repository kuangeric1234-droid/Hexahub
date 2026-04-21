/**
 * Seed script — HexaHub member placeholder data
 * Run: npx tsx scripts/seed-members.ts
 * Requires: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN in .env.local
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-04-20",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

const MEMBERS = [
  // ── FEATURED (3) ──
  {
    _id: "member-digitec-it",
    _type: "member",
    name: "Digitec IT",
    website: null,
    category: "technology-digital",
    featured: true,
    featuredPersonName: "[Person Name]",
    featuredPersonRole: "[Founder / Role Title]",
    featuredStory:
      "[2–3 sentences about Digitec IT's story at Hexa Hub — how they operate, what they've built, and what being part of the community means for their business.]",
    order: 1,
    active: true,
  },
  {
    _id: "member-tutti-kids",
    _type: "member",
    name: "Tutti Kids",
    website: null,
    category: "ecommerce-retail",
    featured: true,
    featuredPersonName: "[Person Name]",
    featuredPersonRole: "[Founder / Role Title]",
    featuredStory:
      "[2–3 sentences about Tutti Kids' story at Hexa Hub — how they entered the Australian market, what the platform enabled, and what's next for the brand.]",
    order: 2,
    active: true,
  },
  {
    _id: "member-fureeze",
    _type: "member",
    name: "Fureeze",
    website: null,
    category: "ecommerce-retail",
    featured: true,
    featuredPersonName: "[Person Name]",
    featuredPersonRole: "[Founder / Role Title]",
    featuredStory:
      "[2–3 sentences about Fureeze's story at Hexa Hub — the products, the operations, and the growth they've achieved since joining the community.]",
    order: 3,
    active: true,
  },

  // ── GRID (8) ──
  {
    _id: "member-placeholder-01",
    _type: "member",
    name: "[Member Business Name]",
    website: null,
    category: "logistics-fulfilment",
    featured: false,
    order: 10,
    active: true,
  },
  {
    _id: "member-placeholder-02",
    _type: "member",
    name: "[Member Business Name]",
    website: null,
    category: "health-beauty",
    featured: false,
    order: 11,
    active: true,
  },
  {
    _id: "member-placeholder-03",
    _type: "member",
    name: "[Member Business Name]",
    website: null,
    category: "food-beverage",
    featured: false,
    order: 12,
    active: true,
  },
  {
    _id: "member-placeholder-04",
    _type: "member",
    name: "[Member Business Name]",
    website: null,
    category: "home-lifestyle",
    featured: false,
    order: 13,
    active: true,
  },
  {
    _id: "member-placeholder-05",
    _type: "member",
    name: "[Member Business Name]",
    website: null,
    category: "fashion-apparel",
    featured: false,
    order: 14,
    active: true,
  },
  {
    _id: "member-placeholder-06",
    _type: "member",
    name: "[Member Business Name]",
    website: null,
    category: "professional-services",
    featured: false,
    order: 15,
    active: true,
  },
  {
    _id: "member-placeholder-07",
    _type: "member",
    name: "[Member Business Name]",
    website: null,
    category: "ecommerce-retail",
    featured: false,
    order: 16,
    active: true,
  },
  {
    _id: "member-placeholder-08",
    _type: "member",
    name: "[Member Business Name]",
    website: null,
    category: "other",
    featured: false,
    order: 17,
    active: true,
  },
];

async function main() {
  console.log(`Seeding ${MEMBERS.length} member records...`);
  for (const doc of MEMBERS) {
    await client.createOrReplace(doc as Parameters<typeof client.createOrReplace>[0]);
    console.log(`  ✓ ${doc.name}`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
