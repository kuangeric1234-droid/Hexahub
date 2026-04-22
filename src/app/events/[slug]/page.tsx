import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, ExternalLink } from "lucide-react";
import { PortableText } from "@portabletext/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getEventBySlug } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

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
    description: event.summary ?? `${event.title} — Hexa Hub event at Huntingdale Melbourne.`,
  };
}

function formatDate(date: string, opts?: Intl.DateTimeFormatOptions) {
  return new Date(date).toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    ...opts,
  });
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug).catch(() => null);
  if (!event) notFound();

  const isPast = new Date(event.date) < new Date();

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">

        {/* ── COVER IMAGE ── */}
        {event.coverImage && (
          <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden bg-[#F5F5F5]">
            <Image
              src={urlFor(event.coverImage).width(1400).height(600).url()}
              alt={event.coverImage.alt ?? event.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        {/* ── PAGE HEADER ── */}
        <div className={`border-b border-[#E5E5E5] py-10 ${event.coverImage ? "bg-white" : "bg-[#F5F5F5]"}`}>
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-[#6B6B6B] hover:text-black text-sm transition-colors mb-6"
            >
              <ArrowLeft size={14} />
              All events
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              {isPast ? (
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#F5F5F5] border border-[#E5E5E5] text-[#6B6B6B] px-2.5 py-1">
                  Past event
                </span>
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#2a3065] text-white px-2.5 py-1">
                  Upcoming
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight mb-5">
              {event.title}
            </h1>

            <div className="flex flex-wrap gap-5 text-sm text-[#555555]">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-[#2a3065] shrink-0" />
                <span>{formatDate(event.date)}</span>
                {event.endDate && (
                  <span className="text-[#999]">→ {formatDate(event.endDate, { weekday: undefined })}</span>
                )}
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#2a3065] shrink-0" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            {!isPast && event.rsvpLink && (
              <a
                href={event.rsvpLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-6 py-3 text-sm transition-colors"
              >
                Register / RSVP <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-14 space-y-14">

          {/* Description */}
          {event.description && Array.isArray(event.description) && event.description.length > 0 && (
            <div className="prose prose-sm sm:prose-base max-w-none text-[#333] leading-relaxed">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <PortableText value={event.description as any} />
            </div>
          )}

          {/* Recap — past events only */}
          {isPast && event.recap && Array.isArray(event.recap) && event.recap.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-black tracking-tight mb-6">How it went</h2>
              <div className="prose prose-sm sm:prose-base max-w-none text-[#333] leading-relaxed">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <PortableText value={event.recap as any} />
              </div>
            </div>
          )}

          {/* Gallery — past events */}
          {isPast && event.gallery && event.gallery.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-black tracking-tight mb-6">Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {event.gallery.map((img, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden bg-[#F5F5F5]">
                    <Image
                      src={urlFor(img).width(500).height(500).url()}
                      alt={img.alt ?? `${event.title} photo ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back + CTA */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-[#E5E5E5]">
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
              Get in touch
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
