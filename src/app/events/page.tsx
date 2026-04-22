import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getUpcomingEvents, getPastEvents } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Workshops, founder talks, and community events at The Hub — Hexa Hub Huntingdale. Upcoming and past events.",
};

export const dynamic = "force-dynamic";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatShortDate(date: string) {
  return new Date(date).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([
    getUpcomingEvents().catch(() => []),
    getPastEvents().catch(() => []),
  ]);

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">

        {/* ── PAGE HEADER ── */}
        <div className="bg-[#F5F5F5] border-b border-[#E5E5E5] py-12">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-2">Community</p>
            <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">Events</h1>
            <p className="text-[#6B6B6B] mt-3 text-base max-w-2xl leading-relaxed">
              Hexa Hub runs workshops, founder talks, industry sessions, and community events at The Hub
              — our shared communal space at Huntingdale. Events are open to members and, where noted, to
              the broader business community.
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
                <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                  Upcoming Events
                </h2>
              </div>
            </div>

            {upcoming.length === 0 ? (
              <div className="bg-[#F5F5F5] border border-[#E5E5E5] p-10 text-center">
                <p className="text-black font-bold text-base mb-2">No upcoming events scheduled.</p>
                <p className="text-[#6B6B6B] text-sm mb-6 max-w-sm mx-auto">
                  We run regular workshops and community sessions. Follow along or get in touch to be notified when the next event is announced.
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
                  <Link
                    key={event._id}
                    href={`/events/${event.slug.current}`}
                    className="group border border-[#E5E5E5] hover:border-[#2a3065]/40 transition-colors flex flex-col"
                  >
                    {event.coverImage ? (
                      <div className="relative aspect-[16/9] overflow-hidden bg-[#F5F5F5]">
                        <Image
                          src={urlFor(event.coverImage).width(640).height(360).url()}
                          alt={event.coverImage.alt ?? event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] bg-[#2a3065]/5 flex items-center justify-center border-b border-[#E5E5E5]">
                        <Calendar size={32} className="text-[#2a3065]/30" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-[#2a3065] text-xs font-semibold uppercase tracking-widest mb-2">
                        {formatDate(event.date)}
                      </p>
                      <h3 className="text-black font-bold text-lg mb-2 leading-snug">{event.title}</h3>
                      {event.summary && (
                        <p className="text-[#6B6B6B] text-sm leading-relaxed mb-4 flex-1">{event.summary}</p>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-1.5 text-[#6B6B6B] text-xs mb-4">
                          <MapPin size={11} className="text-[#2a3065] shrink-0" />
                          {event.location}
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-auto">
                        <span className="inline-flex items-center gap-1 text-[#2a3065] text-xs font-semibold group-hover:gap-2 transition-all">
                          View details <ArrowRight size={11} />
                        </span>
                        {event.rsvpLink && (
                          <span className="text-xs bg-[#2a3065] text-white font-semibold px-2.5 py-1">
                            RSVP open
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* ── PAST EVENTS ── */}
          <section>
            <div className="mb-10">
              <p className="text-[#6B6B6B] text-sm font-semibold uppercase tracking-widest mb-2">
                Archive
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                Past Events
              </h2>
            </div>

            {past.length === 0 ? (
              <div className="bg-[#F5F5F5] border border-[#E5E5E5] p-10 text-center">
                <p className="text-[#6B6B6B] text-sm">
                  Past event recaps will appear here after our first events.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {past.map((event) => (
                  <Link
                    key={event._id}
                    href={`/events/${event.slug.current}`}
                    className="group border border-[#E5E5E5] hover:border-[#999] transition-colors flex flex-col"
                  >
                    {event.coverImage ? (
                      <div className="relative aspect-[16/9] overflow-hidden bg-[#F5F5F5]">
                        <Image
                          src={urlFor(event.coverImage).width(640).height(360).url()}
                          alt={event.coverImage.alt ?? event.title}
                          fill
                          className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-semibold uppercase tracking-widest px-2 py-1">
                          Past
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-[16/9] bg-[#F5F5F5] flex items-center justify-center border-b border-[#E5E5E5]">
                        <Calendar size={32} className="text-[#999]" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-[#999] text-xs font-semibold uppercase tracking-widest mb-2">
                        {formatShortDate(event.date)}
                      </p>
                      <h3 className="text-black font-bold text-lg mb-2 leading-snug">{event.title}</h3>
                      {event.summary && (
                        <p className="text-[#6B6B6B] text-sm leading-relaxed flex-1">{event.summary}</p>
                      )}
                      <div className="flex items-center gap-1 mt-4 text-[#6B6B6B] group-hover:text-black text-xs transition-colors">
                        <span>Read recap</span>
                        <ArrowRight size={11} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
