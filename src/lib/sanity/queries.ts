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

export type MemberCategory =
  | "accounting-tax"
  | "architecture-planning"
  | "business-services"
  | "construction-trades"
  | "consulting"
  | "education-training"
  | "energy-sustainability"
  | "finance-capital"
  | "health-beauty"
  | "hospitality-food"
  | "insurance"
  | "legal"
  | "logistics-distribution"
  | "marketing-creative"
  | "migration-services"
  | "photography-media"
  | "property-real-estate"
  | "psychology-wellbeing"
  | "retail"
  | "technology-it"
  | "transport"
  | "other";

export type Member = {
  _id: string;
  name: string;
  logo?: { asset: { _ref: string } };
  website?: string;
  category?: MemberCategory;
  featured?: boolean;
  featuredPersonName?: string;
  featuredPersonRole?: string;
  featuredPersonPhoto?: { asset: { _ref: string } };
  featuredStory?: string;
  order?: number;
  active?: boolean;
};

export type Service = {
  _id: string;
  title: string;
  icon?: string;
  description?: string;
  pricing?: string;
  category?: string;
  order?: number;
};

export type PersonSocials = {
  instagramUrl?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  websiteUrl?: string;
};

export type Person = {
  _id: string;
  name: string;
  slug: { current: string };
  title?: string;
  company?: string;
  companyLogo?: { asset?: { _ref: string } | null } | null;
  photo?: { asset?: { _ref: string } | null; alt?: string } | null;
  bio?: unknown[];
  socials?: PersonSocials;
};

/** Lightweight shape returned by listing queries (getUpcomingEvents, getPastEvents) */
export type EventListItem = {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  endDate?: string;
  location?: string;
  summary?: string;
  rsvpEnabled?: boolean;
  rsvpClosingDate?: string;
  rsvpLink?: string;
  coverImage?: { asset?: { _ref: string } | null; alt?: string } | null;
};

/** Full shape returned by getEventBySlug — includes all detail-page fields */
export type Event = EventListItem & {
  tagline?: string;
  description?: unknown[];
  recap?: unknown[];
  locationAddress?: string;
  locationLatitude?: number;
  locationLongitude?: number;
  locationMapEmbedUrl?: string;
  organiserName?: string;
  organiserInstagramUrl?: string;
  rsvpCapacity?: number;
  rsvpFormOverride?: string;
  gallery?: { asset?: { _ref: string } | null; alt?: string }[];
  speakers?: Person[];
  organisers?: Person[];
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

// ── GROQ projections ─────────────────────────────────────────────────────────

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

// Lightweight — used on listing pages (no speakers/organisers dereference)
const EVENT_LIST_FIELDS = groq`
  _id, title, slug, date, endDate, location, summary,
  rsvpEnabled, rsvpClosingDate, rsvpLink,
  coverImage{ asset, alt }
`;

// Full detail — used on individual event pages
const EVENT_FIELDS = groq`
  _id, title, slug, date, endDate,
  tagline, summary, description, recap,
  location, locationAddress, locationLatitude, locationLongitude, locationMapEmbedUrl,
  organiserName, organiserInstagramUrl,
  rsvpEnabled, rsvpCapacity, rsvpClosingDate, rsvpFormOverride, rsvpLink,
  coverImage{ asset, alt },
  gallery[]{ asset, alt },
  "speakers": speakers[]->{
    _id, name, slug, title, company,
    companyLogo{ asset },
    photo{ asset, alt },
    socials
  },
  "organisers": organisers[]->{
    _id, name, slug, title, company,
    companyLogo{ asset },
    photo{ asset, alt },
    socials
  }
`;

// ── Query functions ───────────────────────────────────────────────────────────

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

export async function getUpcomingEvents(): Promise<EventListItem[]> {
  return client.fetch(groq`*[_type == "event" && date >= now()] | order(date asc) { ${EVENT_LIST_FIELDS} }`);
}

export async function getPastEvents(): Promise<EventListItem[]> {
  return client.fetch(groq`*[_type == "event" && date < now()] | order(date desc) { ${EVENT_LIST_FIELDS} }`);
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  return client.fetch(groq`*[_type == "event" && slug.current == $slug][0] { ${EVENT_FIELDS} }`, { slug });
}

export async function getServices(): Promise<Service[]> {
  return client.fetch(groq`*[_type == "service" && active == true] | order(order asc) { _id, title, icon, description, pricing, category, order }`);
}

export async function getPartners(): Promise<Partner[]> {
  return client.fetch(groq`*[_type == "partner" && featured == true] | order(order asc) { _id, name, slug, category, logo{ asset }, shortDescription, memberBenefits, website, order, featured }`);
}

const MEMBER_FIELDS = groq`
  _id, name, website, category, featured,
  featuredPersonName, featuredPersonRole, featuredStory,
  logo{ asset },
  featuredPersonPhoto{ asset },
  order
`;

export async function getAllMembers(): Promise<Member[]> {
  return client.fetch(groq`*[_type == "member" && active == true] | order(order asc) { ${MEMBER_FIELDS} }`);
}

export async function getFeaturedMembers(): Promise<Member[]> {
  return client.fetch(groq`*[_type == "member" && active == true && featured == true] | order(order asc) { ${MEMBER_FIELDS} }`);
}

export async function getMembersByCategory(category: MemberCategory): Promise<Member[]> {
  return client.fetch(groq`*[_type == "member" && active == true && category == $category] | order(order asc) { ${MEMBER_FIELDS} }`, { category });
}

/** @deprecated use getAllMembers */
export async function getMembers(): Promise<Member[]> {
  return getAllMembers();
}

/** Lightweight type for the homepage logo scroll — logo is guaranteed present (filtered at query level) */
export type MemberForScroll = {
  _id: string;
  name: string;
  logo: { asset: { _ref: string } };
  website?: string;
};

/** Fetch active members that have a logo uploaded, ordered for the scroll strip. */
export async function getMembersForScroll(): Promise<MemberForScroll[]> {
  return client.fetch(
    groq`*[_type == "member" && active == true && defined(logo.asset)] | order(order asc, name asc) {
      _id, name, website,
      logo{ asset }
    }`
  );
}
