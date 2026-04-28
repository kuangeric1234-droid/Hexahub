import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SpaceCardProps = {
  title: string;
  titleNode?: React.ReactNode;
  specs: string[];
  img: string;
  buttonText: string;
  buttonHref: string;
  sizes?: string;
  aspectClass?: string;
};

export default function SpaceCard({
  title,
  titleNode,
  specs,
  img,
  buttonText,
  buttonHref,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw",
}: SpaceCardProps) {
  return (
    <div className="group rounded-2xl overflow-hidden border border-[#E5E5E5] bg-white flex flex-col hover:border-[#2a3065]/40 hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes={sizes}
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="font-bold text-black text-base leading-snug">
          {titleNode ?? title}
        </h3>

        <ul className="flex flex-col gap-1.5 flex-1">
          {specs.map((spec) => (
            <li key={spec} className="text-[#555555] text-sm leading-relaxed flex items-start gap-2">
              <span className="mt-[7px] shrink-0 w-1 h-1 rounded-full bg-[#2a3065] inline-block" />
              {spec}
            </li>
          ))}
        </ul>

        <Link
          href={buttonHref}
          className="mt-2 inline-flex items-center justify-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-semibold px-4 py-2.5 text-sm transition-colors duration-200 rounded-lg w-full"
        >
          {buttonText}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
