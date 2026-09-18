/**
 * Generates the QR code printed on the back of the access card.
 *
 * Run once and commit the result. Doing it at build time rather than at
 * runtime keeps the encoder out of the browser bundle entirely — the card only
 * ever needs the finished PNG.
 *
 *   node scripts/generate-qr.mjs
 */
import QRCode from "qrcode";
import { readFileSync } from "node:fs";

const OUT = "public/assets/images/me/access-card-qr.png";

// Read the URL out of data/Links.ts rather than duplicating it here, so the
// printed code can never drift from the link the rest of the site uses.
const links = readFileSync("data/Links.ts", "utf8");
const target = links.match(/linkedin:\s*"([^"]+)"/)?.[1];
if (!target) throw new Error("could not find socialLinks.linkedin in data/Links.ts");

await QRCode.toFile(OUT, target, {
  width: 512,
  margin: 1,
  errorCorrectionLevel: "M",
  color: { dark: "#0b0f1f", light: "#ffffff" },
});

console.log(`  wrote ${OUT} -> ${target}`);
