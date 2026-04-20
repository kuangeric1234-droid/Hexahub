import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// TODO: Replace Montserrat with Gotham/GT America when licensed webfonts are available.
// Update --font-display in globals.css to point to the new font CSS variable.

export const metadata: Metadata = {
  title: {
    default: "HexaHub — Warehouse & Storage Spaces in Huntingdale",
    template: "%s | HexaHub",
  },
  description:
    "Warehouse units, storage lots, and office-warehouse spaces available to lease at 17-31 Franklyn Street, Huntingdale VIC 3166. Flexible terms, 24/7 access, 3-phase power.",
  keywords: [
    "warehouse lease Huntingdale",
    "storage space Melbourne",
    "industrial unit lease",
    "office warehouse Melbourne",
    "HexaHub",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "HexaHub",
    title: "HexaHub — Warehouse & Storage Spaces in Huntingdale",
    description:
      "Warehouse units, storage lots, and office-warehouse spaces for lease at Huntingdale, Melbourne.",
    images: [
      {
        url: "/renders/Block H Front.jpg",
        width: 1200,
        height: 630,
        alt: "HexaHub warehouse units at Huntingdale",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en-AU" className={`h-full antialiased ${montserrat.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col">
        {children}
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}</Script>
          </>
        )}
      </body>
    </html>
  );
}
