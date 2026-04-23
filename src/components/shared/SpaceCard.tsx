import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SpaceCardProps = {
  title: string;
  specs: string[];
  img: string;
  buttonText: string;
  buttonHref: string;
  sizes?: string;
};

export default function SpaceCard({
  title,
  specs,
  img,
  buttonText,
  buttonHref,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw",
}: SpaceCardProps) {
  return (
    <div
      className="space-type-card group relative overflow-hidden rounded-2xl aspect-[2/3] flex flex-col"
      tabIndex={0}
    >
      {/* Background image — fades out on hover */}
      <Image
        src={img}
        alt={title}
        fill
        className="space-card-image object-cover transition-opacity duration-300 ease-out"
        sizes={sizes}
      />

      {/* Navy overlay — fades in on hover */}
      <div className="space-card-navy absolute inset-0 bg-[#2a3065] transition-opacity duration-300 ease-out opacity-0" />

      {/* Bottom gradient — fades out on hover */}
      <div className="space-card-gradient absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ease-out" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-4 lg:p-5">
        <h3 className="font-inter-tight font-semibold text-white text-base lg:text-[17px] leading-snug">
          {title}
        </h3>

        <ul className="space-card-specs mt-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 ease-out">
          {specs.map((spec) => (
            <li
              key={spec}
              className="text-white/85 text-[13px] leading-snug flex items-start gap-2"
            >
              <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-white/60 inline-block" />
              {spec}
            </li>
          ))}
        </ul>

        <div className="flex-1" />

        {/* Morphing circle → pill button */}
        <Link
          href={buttonHref}
          aria-label={`${buttonText} — ${title}`}
          className="space-card-btn relative self-end overflow-hidden rounded-full bg-white h-11 transition-[width] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        >
          <span className="space-card-btn-text absolute inset-y-0 left-0 right-11 flex items-center pl-4 font-inter-tight font-medium text-[14px] text-[#2a3065] whitespace-nowrap opacity-0 transition-opacity duration-200">
            {buttonText}
          </span>
          <span className="absolute inset-y-0 right-0 w-11 flex items-center justify-center pointer-events-none">
            <ArrowRight size={14} className="text-[#2a3065]" />
          </span>
        </Link>
      </div>
    </div>
  );
}
