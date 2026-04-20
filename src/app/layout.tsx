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
    default: "Hexa Hub — Business Infrastructure Platform, Huntingdale Melbourne",
    template: "%s | Hexa Hub",
  },
  description:
    "Hexa Hub is a business infrastructure platform at 7 Distribution Circuit, Huntingdale VIC 3166. Warehouses, storage, offices, showrooms, and a connected ecosystem of logistics, e-commerce, and fulfilment partners.",
  keywords: [
    "business infrastructure Melbourne",
    "warehouse lease Huntingdale",
    "e-commerce fulfilment Melbourne",
    "storage space Melbourne",
    "cross-border e-commerce Australia",
    "office warehouse Melbourne",
    "Hexa Hub",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Hexa Hub",
    title: "Hexa Hub — Business Infrastructure Platform, Huntingdale Melbourne",
    description:
      "Space, operations, and ecosystem — all in one place. Hexa Hub is where brands land, operate, and grow in Australia.",
    images: [
      {
        url: "/renders/Aerial.jpg",
        width: 1200,
        height: 630,
        alt: "Hexa Hub precinct aerial view, Huntingdale Melbourne",
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
