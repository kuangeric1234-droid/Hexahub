import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { MemberForScroll } from "@/lib/sanity/queries";

type Props = {
  members: MemberForScroll[];
  eyebrow?: string;
  heading?: string;
};

/** Minimum members required before the section renders. */
const MIN_MEMBERS = 3;

/**
 * Minimum total logos in the strip for a smooth seamless loop.
 * With large logos (80px) and wide gaps, we need enough content to
 * fill the viewport multiple times so the translateX(-50%) reset is
 * never visible at any screen width.
 */
const MIN_LOGOS_FOR_SMOOTH_LOOP = 20;

export default function MemberLogoScroll({
  members,
  eyebrow = "Community",
  heading = "Businesses operating at Hexa Hub.",
}: Props) {
  if (members.length < MIN_MEMBERS) return null;

  // Always duplicate an even number of times so translateX(-50%) lands
  // on an exact visual repeat boundary — the second half of the strip
  // is identical to the first half, making the loop truly seamless.
  const rawCount = Math.max(2, Math.ceil(MIN_LOGOS_FOR_SMOOTH_LOOP / members.length));
  const evenCount = rawCount % 2 === 0 ? rawCount : rawCount + 1;
  const displayMembers = Array.from({ length: evenCount }).flatMap(() => members);

  return (
    <section className="py-16 lg:py-20 bg-white border-b border-[#E5E5E5]">
      {/* Heading — stays in container */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 mb-10">
        <p className="text-[#2a3065] text-sm font-semibold uppercase tracking-widest mb-3">
          {eyebrow}
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
          {heading}
        </h2>
      </div>

      {/* Strip — overflow hidden so logos outside the viewport are clipped */}
      <div
        className="overflow-hidden"
        role="region"
        aria-label={heading}
      >
        <ul
          role="list"
          className="animate-scroll-left flex gap-12 md:gap-20 w-max py-5 md:py-6"
        >
          {displayMembers.map((member, i) => {
            const logoUrl = urlFor(member.logo)
              .height(160)
              .fit("max")
              .auto("format")
              .url();

            const img = (
              <Image
                src={logoUrl}
                alt={member.name}
                width={320}
                height={80}
                className="h-14 md:h-20 w-auto max-w-[240px] object-contain"
                sizes="320px"
              />
            );

            return (
              <li
                key={`${member._id}-${i}`}
                role="listitem"
                className="flex-shrink-0 flex items-center"
              >
                {member.website ? (
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={member.name}
                    aria-label={member.name}
                    className="opacity-70 hover:opacity-100 transition-opacity duration-200"
                  >
                    {img}
                  </a>
                ) : (
                  <span
                    title={member.name}
                    aria-label={member.name}
                    className="opacity-70"
                  >
                    {img}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
