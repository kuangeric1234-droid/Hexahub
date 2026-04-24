import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getUpcomingEvents, getPastEvents } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { EventListItem } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Workshops, founder talks, and community events at The Hub — Hexa Hub Huntingdale. Upcoming and past events.",
};

export const dynamic = "force-dynamic";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatReadableDate(date: string): string {
  return new Date(date).toLocaleDateString("en-AU", {
    timeZone: "Australia/Melbourne",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatLongDate(date: string): string {
  return new Date(date).toLocaleDateString("en-AU", {
    timeZone: "Australia/Melbourne",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ── Badge logic ───────────────────────────────────────────────────────────────

type Badge = { label: string; className: string } | null;

function getEventBadge(event: EventListItem, now: Date): Badge {
  const eventDate = new Date(event.date);
  const isPast = eventDate < now;

  // 1. Past event
  if (isPast) {
    return {
      label: "Past",
      className:
        "bg-[#F5F5F5] border border-[#E5E5E5] text-[#6B6B6B]",
    };
  }

  const MS_48H = 48 * 60 * 60 * 1000;
  const closingDate = event.rsvpClosingDate ? new Date(event.rsvpClosingDate) : null;

  // 2. RSVPs closed (closing date passed)
  if (event.rsvpEnabled && closingDate && closingDate < now) {
    return {
      label: "RSVPs closed",
      className: "bg-[#F5F5F5] border border-[#E5E5E5] text-[#999]",
    };
  }

  // 3. Closing soon (within 48 hrs of closing date OR event date)
  if (event.rsvpEnabled) {
    const closingSoon =
      (closingDate && closingDate.getTime() - now.getTime() < MS_48H && closingDate > now) ||
      eventDate.getTime() - now.getTime() < MS_48H;
    if (closingSoon) {
      return {
        label: "Closing soon",
        className: "bg-[#2a3065]/10 border border-[#2a3065]/30 text-[#2a3065] font-semibold",
      };
    }
  }

  // 4. RSVPs open
  if (event.rsvpEnabled) {
    return {
      label: "RSVPs open",
      className: "bg-[#2a3065] text-white",
    };
  }

  // 5. Legacy external link
  if (event.rsvpLink) {
    return {
      label: "Register",
      className: "bg-[#F5F5F5] border border-[#E5E5E5] text-[#555555]",
    };
  }

  // 6. No badge
  return null;
}

// ── Event card ────────────────────────────────────────────────────────────────

function EventCard({
  event,
  badge,
  dimImage,
}: {
  event: EventListItem;
  badge: Badge;
  dimImage?: boolean;
}) {
  return (
    <Link
      href={`/events/${event.slug.current}`}
      className="group border border-[#E5E5E5] hover:border-[#2a3065]/40 transition-colors flex flex-col"
    >
      {event.coverImage ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-[#F5F5F5]">
          <Image
            src={urlFor(event.coverImage).width(640).height(360).url()}
            alt={event.coverImage.alt ?? event.title}
            fill
            className={`object-cover group-hover:scale-105 transition-transform duration-500 ${dimImage ? "opacity-75" : ""}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {dimImage && badge?.label === "Past" && (
            <div className="absolute top-3 left-3 bg-black/55 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">
              Past
            </div>
          )}
        </div>
      ) : (
        <div className="aspect-[16/9] bg-[#2a3065]/5 flex items-center justify-center border-b border-[#E5E5E5]">
          <Calendar size={32} className="text-[#2a3065]/30" />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <p
          className={`text-xs font-semibold uppercase tracking-widest mb-2 ${
            dimImage ? "text-[#999]" : "text-[#2a3065]"
          }`}
        >
          {formatLongDate(event.date)}
        </p>
        <h3 className="text-black font-bold text-lg mb-2 leading-snug">{event.title}</h3>
        {event.summary && (
          <p className="text-[#6B6B6B] text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
            {event.summary}
          </p>
        )}
        {event.location && (
          <div className="flex items-center gap-1.5 text-[#6B6B6B] text-xs mb-4">
            <MapPin size={11} className="text-[#2a3065] shrink-0" />
            {event.location}
          </div>
        )}
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="inline-flex items-center gap-1 text-[#2a3065] text-xs font-semibold group-hover:gap-2 transition-all">
            {dimImage ? "Read recap" : "View details"} <ArrowRight size={11} />
          </span>
          {badge && badge.label !== "Past" && (
            <span
              className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 ${badge.className}`}
            >
              {badge.label}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([
    getUpcomingEvents().catch(() => [] as EventListItem[]),
    getPastEvents().catch(() => [] as EventListItem[]),
  ]);

  const now = new Date();

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">

        {/* ── PAGE HEADER ── */}
        <div className="bg-[#F5F5F5] border-b border-[#E5E5E5] py-12">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-2">
              Community
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
              Events
            </h1>
            <p className="text-[#6B6B6B] mt-3 text-base max-w-2xl leading-relaxed">
              Hexa Hub runs workshops, founder talks, industry sessions, and community events at The
              Hub — our shared communal space at Huntingdale. Events are open to members and, where
              noted, to the broader business community.
            </p>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 py-16 space-y-20">

          {/* ── UPCOMING EVENTS ── */}
          <section>
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-2">
                  What&apos;s on
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                  Upcoming Events
                </h2>
              </div>
            </div>

            {upcoming.length === 0 ? (
              <div className="bg-[#F5F5F5] border border-[#E5E5E5] p-10 text-center">
                <p className="text-black font-bold text-base mb-2">
                  No upcoming events scheduled.
                </p>
                <p className="text-[#6B6B6B] text-sm mb-6 max-w-sm mx-auto">
                  We run regular workshops and community sessions. Follow along or get in touch to
                  be notified when the next event is announced.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-5 py-2.5 text-sm transition-colors"
                >
                  Stay in the loop <ArrowRight size={13} />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcoming.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    badge={getEventBadge(event, now)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* ── PAST EVENTS — only render section if there are past events ── */}
          {past.length > 0 && (
            <section>
              <div className="mb-10">
                <p className="text-[#6B6B6B] text-sm font-semibold uppercase tracking-widest mb-2">
                  Archive
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                  Past Events
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {past.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    badge={getEventBadge(event, now)}
                    dimImage
                  />
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
