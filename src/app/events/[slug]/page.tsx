import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Calendar,
  Clock,
  Users,
  Globe,
  ExternalLink,
} from "lucide-react";

// Inline SVG brand icons not available in this version of lucide-react
function IconInstagram({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
function IconLinkedin({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}
function IconFacebook({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HubSpotForm from "@/components/HubSpotForm";
import { getEventBySlug } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { Person } from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug).catch(() => null);
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.title,
    description:
      event.tagline ??
      event.summary ??
      `${event.title} — Hexa Hub event at Huntingdale Melbourne.`,
  };
}

// ── Date/time helpers ─────────────────────────────────────────────────────────

const TZ = "Australia/Melbourne";

function formatDateRange(date: string, endDate?: string): string {
  const start = new Date(date);

  const longDate: Intl.DateTimeFormatOptions = {
    timeZone: TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const timeOpts: Intl.DateTimeFormatOptions = {
    timeZone: TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  };

  const dateStr = start.toLocaleDateString("en-AU", longDate);
  const timeStr = start.toLocaleTimeString("en-AU", timeOpts);

  if (!endDate) return `${dateStr} · ${timeStr}`;

  const end = new Date(endDate);
  const startDay = start.toLocaleDateString("en-AU", { timeZone: TZ });
  const endDay = end.toLocaleDateString("en-AU", { timeZone: TZ });

  if (startDay === endDay) {
    // Same-day: show time range
    const endTime = end.toLocaleTimeString("en-AU", {
      timeZone: TZ,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${dateStr} · ${timeStr} – ${endTime}`;
  }

  // Multi-day
  const shortDate: Intl.DateTimeFormatOptions = {
    timeZone: TZ,
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return `${start.toLocaleDateString("en-AU", shortDate)} – ${end.toLocaleDateString("en-AU", shortDate)}`;
}

function formatShortDate(date: string): string {
  return new Date(date).toLocaleDateString("en-AU", {
    timeZone: TZ,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ── Portable text components ──────────────────────────────────────────────────

const ptComponents: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="text-[#2a3065] underline hover:no-underline"
      >
        {children}
      </a>
    ),
  },
};

// ── Person card ───────────────────────────────────────────────────────────────

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="bg-[#eef0f8] rounded-xl p-6 flex flex-col items-center text-center">
      {person.photo && (
        <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 ring-2 ring-white">
          <Image
            src={urlFor(person.photo).width(160).height(160).url()}
            alt={person.photo.alt ?? person.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      )}
      <p className="font-inter-tight font-semibold text-[rgb(36,43,43)] text-base leading-snug">
        {person.name}
      </p>
      {person.title && (
        <p className="text-[#6B6B6B] text-sm mt-0.5">{person.title}</p>
      )}
      {person.company && (
        <p className="text-[#999] text-xs mt-0.5">{person.company}</p>
      )}
      {person.companyLogo && (
        <div className="relative h-5 w-24 mt-2">
          <Image
            src={urlFor(person.companyLogo).height(40).url()}
            alt={`${person.company ?? person.name} logo`}
            fill
            className="object-contain"
            sizes="96px"
          />
        </div>
      )}
      {person.socials && (
        <div className="flex items-center gap-3 mt-3">
          {person.socials.instagramUrl && (
            <a
              href={person.socials.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${person.name} on Instagram`}
              className="text-[#6B6B6B] hover:text-[#2a3065] transition-colors"
            >
              <IconInstagram size={15} />
            </a>
          )}
          {person.socials.linkedinUrl && (
            <a
              href={person.socials.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${person.name} on LinkedIn`}
              className="text-[#6B6B6B] hover:text-[#2a3065] transition-colors"
            >
              <IconLinkedin size={15} />
            </a>
          )}
          {person.socials.facebookUrl && (
            <a
              href={person.socials.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${person.name} on Facebook`}
              className="text-[#6B6B6B] hover:text-[#2a3065] transition-colors"
            >
              <IconFacebook size={15} />
            </a>
          )}
          {person.socials.websiteUrl && (
            <a
              href={person.socials.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${person.name} website`}
              className="text-[#6B6B6B] hover:text-[#2a3065] transition-colors"
            >
              <Globe size={15} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// ── People section ────────────────────────────────────────────────────────────

function PeopleSection({
  heading,
  people,
}: {
  heading: string;
  people: Person[];
}) {
  if (!people.length) return null;
  return (
    <section className="py-16 bg-white border-t border-[#E5E5E5]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
        <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
          {heading}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {people.map((p) => (
            <PersonCard key={p._id} person={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug).catch(() => null);
  if (!event) notFound();

  const now = new Date();
  const eventDate = new Date(event.date);
  const isPast = eventDate < now;

  const rsvpClosingDate = event.rsvpClosingDate ? new Date(event.rsvpClosingDate) : null;
  const rsvpClosed = rsvpClosingDate ? rsvpClosingDate < now : false;

  // Should the hero "Register" button be shown?
  const showRegisterBtn =
    !isPast &&
    (event.rsvpEnabled
      ? !rsvpClosed
      : Boolean(event.rsvpLink));

  // Map embed URL
  const mapSrc =
    event.locationMapEmbedUrl ??
    (event.locationLatitude != null && event.locationLongitude != null
      ? `https://maps.google.com/maps?q=${event.locationLatitude},${event.locationLongitude}&hl=en&z=15&output=embed`
      : null);

  const hasPostEvent =
    isPast && (Boolean(event.recap?.length) || Boolean(event.gallery?.length));

  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ?? "";
  const masterFormId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID ?? "";
  const region = process.env.NEXT_PUBLIC_HUBSPOT_REGION ?? "ap1";

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[55vh] flex flex-col justify-end bg-[#2a3065]">
          {event.coverImage && (
            <Image
              src={urlFor(event.coverImage).width(1600).height(900).url()}
              alt={event.coverImage.alt ?? event.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          )}
          {/* Gradient overlay — darker at bottom for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />

          <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 sm:px-8 lg:px-16 xl:px-20 pb-14 pt-28">
            {/* Category badge */}
            <span
              className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 mb-5 ${
                isPast
                  ? "bg-black/50 text-white/80 border border-white/20"
                  : "bg-[#2a3065] text-white"
              }`}
            >
              {isPast ? "Past Event" : "Upcoming Event"}
            </span>

            <h1 className="font-inter-tight font-bold text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight max-w-3xl mb-4">
              {event.title}
            </h1>

            {event.tagline && (
              <p className="text-white/80 text-base sm:text-lg max-w-2xl mb-6 leading-relaxed">
                {event.tagline}
              </p>
            )}

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-white/75 text-sm mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="shrink-0" />
                <span>{formatDateRange(event.date, event.endDate)}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="shrink-0" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            {showRegisterBtn && (
              <a
                href="#rsvp"
                className="inline-flex items-center gap-2 bg-white hover:bg-[#eef0f8] text-[#2a3065] font-bold px-6 py-3 text-sm transition-colors"
              >
                Register now <ArrowRight size={14} />
              </a>
            )}
          </div>
        </section>

        {/* ── TWO-COLUMN CONTENT ───────────────────────────────────────────── */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16 items-start">

            {/* LEFT — overview */}
            <div>
              {event.description && Array.isArray(event.description) && event.description.length > 0 ? (
                <>
                  <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-4">
                    Event Overview
                  </p>
                  <div className="prose prose-sm sm:prose-base max-w-none text-[#333] leading-relaxed">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <PortableText value={event.description as any} components={ptComponents} />
                  </div>
                </>
              ) : (
                <p className="text-[#6B6B6B] text-sm italic">Event details coming soon.</p>
              )}
            </div>

            {/* RIGHT — sticky details sidebar */}
            <div>
              <div className="sticky top-24 border border-[#E5E5E5] rounded-xl p-6 space-y-5">
                <h2 className="font-inter-tight font-bold text-[rgb(36,43,43)] text-base">
                  Details
                </h2>

                {/* Date/time */}
                <div className="flex gap-3">
                  <Calendar size={16} className="text-[#2a3065] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[rgb(36,43,43)] text-sm font-medium leading-snug">
                      {formatShortDate(event.date)}
                    </p>
                    {event.endDate && (
                      <p className="text-[#6B6B6B] text-xs mt-0.5">
                        Until {formatShortDate(event.endDate)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Time */}
                <div className="flex gap-3">
                  <Clock size={16} className="text-[#2a3065] shrink-0 mt-0.5" />
                  <p className="text-[rgb(36,43,43)] text-sm">
                    {new Date(event.date).toLocaleTimeString("en-AU", {
                      timeZone: TZ,
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                      timeZoneName: "short",
                    })}
                    {event.endDate && (
                      <>
                        {" "}–{" "}
                        {new Date(event.endDate).toLocaleTimeString("en-AU", {
                          timeZone: TZ,
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </>
                    )}
                  </p>
                </div>

                {/* Location */}
                {(event.location || event.locationAddress) && (
                  <div className="flex gap-3">
                    <MapPin size={16} className="text-[#2a3065] shrink-0 mt-0.5" />
                    <div>
                      {event.location && (
                        <p className="text-[rgb(36,43,43)] text-sm font-medium leading-snug">
                          {event.location}
                        </p>
                      )}
                      {event.locationAddress && (
                        <p className="text-[#6B6B6B] text-xs mt-0.5">
                          {event.locationAddress}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Capacity */}
                {event.rsvpCapacity && (
                  <div className="flex gap-3">
                    <Users size={16} className="text-[#2a3065] shrink-0 mt-0.5" />
                    <p className="text-[rgb(36,43,43)] text-sm">
                      Capacity: {event.rsvpCapacity} spots
                    </p>
                  </div>
                )}

                {/* Organiser */}
                {event.organiserName && (
                  <div className="pt-2 border-t border-[#E5E5E5]">
                    <p className="text-[#6B6B6B] text-xs uppercase tracking-widest mb-1">
                      Organised by
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-[rgb(36,43,43)] text-sm font-medium">
                        {event.organiserName}
                      </span>
                      {event.organiserInstagramUrl && (
                        <a
                          href={event.organiserInstagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#2a3065] text-xs font-semibold hover:underline"
                        >
                          Follow <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Back to events */}
                <div className="pt-3 border-t border-[#E5E5E5]">
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-1.5 text-[#6B6B6B] hover:text-black text-sm transition-colors"
                  >
                    <ArrowLeft size={13} />
                    All events
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── SPEAKERS ─────────────────────────────────────────────────────── */}
        {Boolean(event.speakers?.length) && (
          <PeopleSection heading="Speakers" people={event.speakers!} />
        )}

        {/* ── ORGANISERS ───────────────────────────────────────────────────── */}
        {Boolean(event.organisers?.length) && (
          <PeopleSection heading="Organisers" people={event.organisers!} />
        )}

        {/* ── RSVP ─────────────────────────────────────────────────────────── */}
        <section id="rsvp" className="py-16 bg-[#F5F5F5] border-t border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            {event.rsvpEnabled ? (
              isPast ? (
                // Past event
                <div className="max-w-lg">
                  <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                    RSVP
                  </p>
                  <p className="text-black font-bold text-xl mb-2">
                    This event has already happened.
                  </p>
                  <p className="text-[#6B6B6B] text-sm mb-6">
                    Check out our upcoming events to see what&apos;s on next.
                  </p>
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-5 py-2.5 text-sm transition-colors"
                  >
                    See upcoming events <ArrowRight size={13} />
                  </Link>
                </div>
              ) : rsvpClosed ? (
                // RSVPs closed
                <div className="max-w-lg">
                  <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                    RSVP
                  </p>
                  <p className="text-black font-bold text-xl mb-2">
                    RSVPs are now closed for this event.
                  </p>
                  {rsvpClosingDate && (
                    <p className="text-[#6B6B6B] text-sm">
                      Registrations closed on{" "}
                      {rsvpClosingDate.toLocaleDateString("en-AU", {
                        timeZone: TZ,
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      .
                    </p>
                  )}
                </div>
              ) : (
                // Active RSVP form
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">
                  <div>
                    <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                      RSVP
                    </p>
                    <h2 className="font-inter-tight font-bold text-2xl sm:text-3xl text-[rgb(36,43,43)] tracking-tight mb-3">
                      Save your seat
                    </h2>
                    {event.rsvpCapacity && (
                      <p className="text-[#6B6B6B] text-sm mb-2">
                        Capacity: {event.rsvpCapacity} spots
                      </p>
                    )}
                    <p className="text-[#6B6B6B] text-sm leading-relaxed mb-8">
                      Reserve your spot below. A confirmation will land in your inbox.
                    </p>
                    {rsvpClosingDate && (
                      <p className="text-[#6B6B6B] text-xs border-l-2 border-[#2a3065]/30 pl-3">
                        RSVPs close{" "}
                        {rsvpClosingDate.toLocaleDateString("en-AU", {
                          timeZone: TZ,
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                        .
                      </p>
                    )}
                  </div>
                  <div>
                    <HubSpotForm
                      portalId={portalId}
                      formId={event.rsvpFormOverride || masterFormId}
                      region={region}
                      eventName={event.title}
                    />
                  </div>
                </div>
              )
            ) : event.rsvpLink ? (
              // Legacy external RSVP link
              <div className="max-w-lg">
                <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                  RSVP
                </p>
                <h2 className="font-inter-tight font-bold text-2xl text-[rgb(36,43,43)] tracking-tight mb-4">
                  Register for this event
                </h2>
                <a
                  href={event.rsvpLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-6 py-3 text-sm transition-colors"
                >
                  Register / RSVP <ExternalLink size={13} />
                </a>
              </div>
            ) : null}
          </div>
        </section>

        {/* ── LOCATION MAP ─────────────────────────────────────────────────── */}
        {mapSrc && (
          <section className="py-16 bg-white border-t border-[#E5E5E5]">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                Location
              </p>
              {(event.location || event.locationAddress) && (
                <div className="mb-6">
                  {event.location && (
                    <h2 className="font-inter-tight font-bold text-xl text-[rgb(36,43,43)] tracking-tight">
                      {event.location}
                    </h2>
                  )}
                  {event.locationAddress && (
                    <p className="text-[#6B6B6B] text-sm mt-1">{event.locationAddress}</p>
                  )}
                </div>
              )}
              <div className="aspect-[16/7] overflow-hidden rounded-xl border border-[#E5E5E5]">
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map — ${event.location ?? "Event location"}`}
                />
              </div>
            </div>
          </section>
        )}

        {/* ── POST-EVENT RECAP ─────────────────────────────────────────────── */}
        {hasPostEvent && (
          <section className="py-16 bg-[#F5F5F5] border-t border-[#E5E5E5]">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                Archive
              </p>
              <h2 className="font-inter-tight font-bold text-2xl sm:text-3xl text-[rgb(36,43,43)] tracking-tight mb-10">
                Event recap
              </h2>

              {event.recap && event.recap.length > 0 && (
                <div className="prose prose-sm sm:prose-base max-w-3xl text-[#333] leading-relaxed mb-12">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <PortableText value={event.recap as any} components={ptComponents} />
                </div>
              )}

              {event.gallery && event.gallery.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {event.gallery.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-square overflow-hidden rounded-lg bg-[#E5E5E5]"
                    >
                      <Image
                        src={urlFor(img).width(600).height(600).url()}
                        alt={img.alt ?? `${event.title} — photo ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── FOOTER NAVIGATION ────────────────────────────────────────────── */}
        <div className="border-t border-[#E5E5E5] py-10">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 flex flex-wrap gap-4">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 border border-[#E5E5E5] hover:border-[#999] text-black font-semibold px-5 py-2.5 text-sm transition-colors"
            >
              <ArrowLeft size={13} />
              All events
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-5 py-2.5 text-sm transition-colors"
            >
              Get in touch <ArrowRight size={13} />
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
