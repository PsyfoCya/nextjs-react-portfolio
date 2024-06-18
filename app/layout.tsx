import type { Metadata } from "next";
import { Bricolage_Grotesque, Oswald } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import GrainEffect from "@/components/visualEffects/GrainEffect";
import Cursor from "@/components/cursor/Cursor";

// Fonts
const MainFont = Bricolage_Grotesque({ subsets: ["latin"] });
const OswaldFont = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const PixelFont = localFont({
  src: "../public/assets/fonts/BeautifulPoliceOfficer-rvv8x.ttf",
  variable: "--font-pixel",
});

// Meta data
export const metadata: Metadata = {
  title: "Siyabonga Hadebe",
  description: "Siyabonga Hadebe's Official Portfolio Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(MainFont.className, OswaldFont.variable, PixelFont.variable)}>
        <GrainEffect />
        <Cursor color="red" />
        {children}
      </body>
    </html>
  );
}
