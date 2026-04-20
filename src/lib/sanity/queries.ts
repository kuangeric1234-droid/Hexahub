import { client } from "./client";
import { groq } from "next-sanity";

export type Unit = {
  _id: string;
  title: string;
  slug: { current: string };
  unitId: string;
  type: "warehouse" | "storage" | "office-warehouse" | "showroom-warehouse" | "office";
  listingType: "for-lease" | "for-sale";
  status: "available" | "under-offer" | "coming-soon" | "leased" | "sold";
  streetAddress?: string;
  block?: string;
  sizeSquareMetres: number;
  groundFloorM2?: number;
  firstFloorM2?: number;
  secondFloorM2?: number;
  monthlyPrice?: number;
  annualPrice?: number;
  bondAmount?: number;
  minimumTerm?: string;
  parkingSpaces?: number;
  features?: string[];
  rollerDoorDimensions?: string;
  powerSupply?: string;
  accessHours?: string;
  hasLoadingZone?: boolean;
  hasMezzanine?: boolean;
  attributes?: string;
  description?: unknown[];
  photos?: { asset: { _ref: string }; alt: string }[];
  floorPlan?: { asset: { _ref: string } };
  featured?: boolean;
  availableFrom?: string;
};

export type Partner = {
  _id: string;
  name: string;
  slug: { current: string };
  category: "supply-chain" | "digital" | "shipping" | "mentorship";
  logo?: { asset: { _ref: string } };
  shortDescription?: string;
  memberBenefits?: string[];
  website?: string;
  order?: number;
  featured?: boolean;
};

export type Member = {
  _id: string;
  name: string;
  logo?: { asset: { _ref: string } };
  website?: string;
  industry?: string;
  order?: number;
  active?: boolean;
};

export type SiteSettings = {
  phone?: string;
  email?: string;
  address?: string;
  businessHours?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  googleMapsEmbedUrl?: string;
  socialLinks?: { platform: string; url: string }[];
};

const UNIT_FIELDS = groq`
  _id, title, slug, unitId, type, listingType, status,
  streetAddress, block, sizeSquareMetres, groundFloorM2,
  firstFloorM2, secondFloorM2, monthlyPrice, annualPrice, bondAmount,
  minimumTerm, parkingSpaces, features, rollerDoorDimensions,
  powerSupply, accessHours, hasLoadingZone, hasMezzanine,
  attributes, description, featured, availableFrom,
  photos[]{ asset, alt },
  floorPlan{ asset }
`;

export async function getAllUnits(): Promise<Unit[]> {
  return client.fetch(groq`*[_type == "unit"] | order(type asc, unitId asc) { ${UNIT_FIELDS} }`);
}

export async function getFeaturedUnits(): Promise<Unit[]> {
  return client.fetch(groq`*[_type == "unit" && featured == true] | order(unitId asc)[0...6] { ${UNIT_FIELDS} }`);
}

export async function getFeaturedLeaseUnits(): Promise<Unit[]> {
  return client.fetch(groq`*[_type == "unit" && featured == true && listingType == "for-lease"] | order(unitId asc)[0...3] { ${UNIT_FIELDS} }`);
}

export async function getFeaturedSaleUnits(): Promise<Unit[]> {
  return client.fetch(groq`*[_type == "unit" && featured == true && listingType == "for-sale"] | order(unitId asc)[0...3] { ${UNIT_FIELDS} }`);
}

export async function getUnitBySlug(slug: string): Promise<Unit | null> {
  return client.fetch(groq`*[_type == "unit" && slug.current == $slug][0] { ${UNIT_FIELDS} }`, { slug });
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(groq`*[_type == "siteSettings"][0] { phone, email, address, businessHours, heroHeadline, heroSubheadline, googleMapsEmbedUrl, socialLinks }`);
}

export async function getTestimonials() {
  return client.fetch(groq`*[_type == "testimonial" && featured == true] | order(_createdAt asc) { _id, authorName, authorCompany, quote, photo }`);
}

export async function getUpcomingEvents() {
  return client.fetch(groq`*[_type == "event" && eventType == "upcoming"] | order(date asc)[0...3] { _id, title, slug, date, description, coverImage{ asset, alt }, rsvpLink }`);
}

export async function getServices() {
  return client.fetch(groq`*[_type == "service"] | order(order asc) { _id, title, slug, description, icon, coverImage{ asset, alt }, targetCustomers, startingFromPrice, unitType }`);
}

export async function getPartners(): Promise<Partner[]> {
  return client.fetch(groq`*[_type == "partner" && featured == true] | order(order asc) { _id, name, slug, category, logo{ asset }, shortDescription, memberBenefits, website, order, featured }`);
}

export async function getMembers(): Promise<Member[]> {
  return client.fetch(groq`*[_type == "member" && active == true] | order(order asc) { _id, name, logo{ asset }, website, industry, order }`);
}
