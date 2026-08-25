import type { Metadata } from "next";
import { Bricolage_Grotesque, Oswald } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import GrainEffect from "@/components/visualEffects/GrainEffect";
import Cursor from "@/components/cursor/Cursor";

// Fonts
const MainFont = Bricolage_Grotesque({ subsets: ["latin"] });
const OswaldFont = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const PixelFont = localFont({
  src: "../public/assets/fonts/BeautifulPoliceOfficer-rvv8x.ttf",
  variable: "--font-pixel",
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
        <GrainEffect />
        <Cursor color="red" />
        {children}
      </body>
    </html>
  );
}
