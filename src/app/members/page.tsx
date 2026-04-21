import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MembersGrid from "@/components/members/MembersGrid";
import { getAllMembers, getFeaturedMembers } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export const metadata: Metadata = {
  title: "Members",
  description:
    "The businesses that operate and grow from Hexa Hub — a community of brands, operators, and founders at Found Huntingdale.",
};

export default async function MembersPage() {
  const [allMembers, featuredMembers] = await Promise.all([
    getAllMembers(),
    getFeaturedMembers(),
  ]);

  const gridMembers = allMembers.filter((m) => !m.featured);

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">

        {/* ── PAGE HEADER ── */}
        <div className="bg-[#F5F5F5] border-b border-[#E5E5E5] py-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-2">
              Community
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-3">
              Our Members
            </h1>
            <p className="text-[#6B6B6B] text-base max-w-xl leading-relaxed">
              The businesses that operate and grow from Hexa Hub.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-20">

          {/* ── FEATURED MEMBERS ── */}
          {featuredMembers.length > 0 && (
            <section>
              <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
                Spotlight
              </p>
              <h2 className="text-3xl font-black text-black tracking-tight mb-10">
                Meet the community
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredMembers.map((m) => (
                  <div
                    key={m._id}
                    className="border border-[#E5E5E5] flex flex-col"
                  >
                    {/* Person photo */}
                    <div className="aspect-[4/3] bg-[#F5F5F5] overflow-hidden">
                      {m.featuredPersonPhoto?.asset ? (
                        <Image
                          src={urlFor(m.featuredPersonPhoto)
                            .width(600)
                            .height(450)
                            .fit("crop")
                            .url()}
                          alt={m.featuredPersonName ?? m.name}
                          width={600}
                          height={450}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {m.logo?.asset ? (
                            <Image
                              src={urlFor(m.logo).width(200).height(200).fit("max").url()}
                              alt={m.name}
                              width={100}
                              height={100}
                              className="object-contain max-h-16"
                            />
                          ) : (
                            <span className="text-[#2a3065] font-black text-2xl">
                              {m.name.charAt(0)}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="mb-4">
                        {m.featuredPersonName && (
                          <h3 className="text-black font-bold text-lg leading-snug">
                            {m.featuredPersonName}
                          </h3>
                        )}
                        {m.featuredPersonRole && (
                          <p className="text-[#2a3065] text-xs font-semibold uppercase tracking-widest mt-0.5">
                            {m.featuredPersonRole}
                          </p>
                        )}
                        <p className="text-[#6B6B6B] text-sm mt-1">{m.name}</p>
                      </div>

                      {m.featuredStory && (
                        <p className="text-[#555555] text-sm leading-relaxed flex-1">
                          {m.featuredStory}
                        </p>
                      )}

                      {m.website && (
                        <a
                          href={m.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex items-center gap-1.5 text-[#2a3065] text-xs font-semibold hover:underline"
                        >
                          Visit {m.name} <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── ALL MEMBERS GRID ── */}
          {gridMembers.length > 0 ? (
            <MembersGrid members={gridMembers} />
          ) : allMembers.length === 0 ? (
            <section className="border-t border-[#E5E5E5] pt-20 text-center py-16">
              <p className="text-[#6B6B6B] text-base">
                Member profiles coming soon.
              </p>
            </section>
          ) : null}

          {/* ── CTA ── */}
          <section className="border-t border-[#E5E5E5] pt-20">
            <div className="bg-[#F5F5F5] border border-[#E5E5E5] p-12 text-center">
              <h2 className="text-3xl font-black text-black tracking-tight mb-4">
                Want to become part of the Hexa Hub community?
              </h2>
              <p className="text-[#6B6B6B] text-base mb-8 max-w-lg mx-auto leading-relaxed">
                Speak to the team about available spaces and what membership at
                Hexa Hub includes for your business.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-bold px-8 py-4 text-base transition-colors"
              >
                Enquire Now <ArrowRight size={16} />
              </Link>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
