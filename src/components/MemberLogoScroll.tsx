import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { MemberForScroll } from "@/lib/sanity/queries";

type Props = {
  members: MemberForScroll[];
  eyebrow?: string;
  heading?: string;
};

/** Minimum members required before the section renders. */
const MIN_MEMBERS = 6;

export default function MemberLogoScroll({
  members,
  eyebrow = "Community",
  heading = "Businesses operating at Hexa Hub.",
}: Props) {
  if (members.length < MIN_MEMBERS) return null;

  // Duplicate the array so the seamless loop technique works:
  // animate translateX(0) → translateX(-50%) — when the first set scrolls
  // off-screen the duplicate set is already in position behind it.
  const doubled = [...members, ...members];

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
          className="animate-scroll-left flex gap-12 w-max py-3"
        >
          {doubled.map((member, i) => {
            const logoUrl = urlFor(member.logo)
              .height(96)
              .fit("max")
              .auto("format")
              .url();

            const img = (
              <Image
                src={logoUrl}
                alt={member.name}
                width={200}
                height={48}
                className="h-8 lg:h-12 w-auto max-w-[160px] object-contain"
                sizes="200px"
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
