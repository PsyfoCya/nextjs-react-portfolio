import type { Metadata } from "next";
import { Bricolage_Grotesque, Oswald } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import Cursor from "@/components/cursor/Cursor";
import Motion from "@/components/visualEffects/Motion";
import Boot from "@/components/loading/Boot";

// Fonts
const MainFont = Bricolage_Grotesque({ subsets: ["latin"] });
const OswaldFont = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const PixelFont = localFont({
  // woff2 rather than the raw TTF: next/font cannot subset a local file, so the
  // whole face ships either way — 15KB compressed instead of 60KB.
  src: "../public/assets/fonts/BeautifulPoliceOfficer-rvv8x.woff2",
  variable: "--font-pixel",
  display: "swap",
});

const description =
  "Siyabonga Hadebe — frontend developer in Johannesburg. Two years building a restaurant management and online ordering platform in React, TypeScript and Next.js.";

export const metadata: Metadata = {
  title: {
    default: "Siyabonga Hadebe — Frontend Developer",
    template: "%s — Siyabonga Hadebe",
  },
  description,
  keywords: [
    "Siyabonga Hadebe",
    "Frontend Developer",
    "React",
    "TypeScript",
    "Next.js",
    "Johannesburg",
    "South Africa",
  ],
  authors: [{ name: "Siyabonga Hadebe" }],
  openGraph: {
    title: "Siyabonga Hadebe — Frontend Developer",
    description,
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siyabonga Hadebe — Frontend Developer",
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          MainFont.className,
          OswaldFont.variable,
          PixelFont.variable
        )}
      >
        <Motion>
          <Boot />
          <Cursor color="red" />
          {children}
        </Motion>
      </body>
    </html>
  );
}
