import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getUpcomingEvents } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming events at HexaHub Huntingdale.",
};

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await getUpcomingEvents().catch(() => []);

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">
        <div className="bg-[#F5F5F5] border-b border-[#E5E5E5] py-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-2">Community</p>
            <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">Events</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          {events.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-black font-bold text-xl mb-3">No upcoming events scheduled.</p>
              <p className="text-[#6B6B6B] text-sm mb-8">
                Interested in hosting an event at HexaHub? We have a communal Hub space available.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-6 py-3 text-sm transition-colors"
              >
                Enquire about events <ArrowRight size={13} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event: { _id: string; title: string; date: string; rsvpLink?: string }) => (
                <div key={event._id} className="bg-[#F5F5F5] border border-[#E5E5E5] p-6">
                  <div className="text-[#2a3065] text-xs font-semibold uppercase tracking-widest mb-2">
                    {new Date(event.date).toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  </div>
                  <h2 className="text-black font-bold text-xl mb-3">{event.title}</h2>
                  {event.rsvpLink && (
                    <a href={event.rsvpLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#2a3065] text-sm underline">
                      RSVP <ArrowRight size={11} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
