import * as THREE from "three";

/**
 * CR80 proportions — a real access card is 53.98 x 85.6mm, so 0.63:1. The card
 * used to be 0.71:1, which read as a squat luggage tag rather than a badge.
 * These must stay in step with the geometry in AccessCard3D.
 */
const WIDTH = 512;
const HEIGHT = 812;

/** Matches the RoundedBox radius, so the printed corners follow the silhouette. */
const CORNER = 44;

export interface CardFaceOptions {
  name: string;
  title: string;
  meta: string;
  /** Printed under the barcode. Not a real credential, obviously. */
  serial: string;
  qrUrl: string;
}

/** `roundRect` is widely supported but still worth a guard on older Safari. */
const roundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) => {
  if (typeof ctx.roundRect === "function") {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    return;
  }
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

const loadImage = (src: string): Promise<HTMLImageElement | null> =>
  new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    // A missing QR should cost us the QR, not the whole card.
    image.onerror = () => resolve(null);
    image.src = src;
  });

const newCanvas = () => {
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  return canvas;
};

/**
 * Clips everything that follows to the card's rounded outline.
 *
 * The geometry underneath is a RoundedBox, so the artwork has to be rounded
 * too or the printed corners overhang the silhouette. Everything outside the
 * path stays transparent, which is also what lets the plane read as
 * card-shaped from the side.
 */
const clipToCard = (ctx: CanvasRenderingContext2D) => {
  roundedRect(ctx, 0, 0, WIDTH, HEIGHT, CORNER);
  ctx.clip();
};

const toTexture = (canvas: HTMLCanvasElement) => {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
};

/** Steps the size down until the label fits inside the card's margins. */
const fitText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  startPx: number,
  weight = 600
) => {
  let size = startPx;
  const set = () =>
    (ctx.font = `${weight} ${size}px "Bricolage Grotesque", system-ui, sans-serif`);
  set();
  while (ctx.measureText(text).width > maxWidth && size > 16) {
    size -= 2;
    set();
  }
  return size;
};

/**
 * A block of vertical bars. Not a real symbology — it is decoration, and the
 * scannable code lives on the back where a real one would.
 */
const drawBarcode = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  seed: string
) => {
  let cursor = x;
  let i = 0;
  while (cursor < x + w) {
    // Deterministic from the seed, so the card looks the same every render.
    const code = seed.charCodeAt(i % seed.length) + i * 7;
    const bar = 2 + (code % 5);
    const gap = 2 + ((code >> 2) % 4);
    ctx.fillRect(cursor, y, Math.min(bar, x + w - cursor), h);
    cursor += bar + gap;
    i += 1;
  }
};

/**
 * The printed front — the credential itself.
 *
 * Drawing it ourselves keeps the card dependency-free: the obvious
 * alternative, drei's `<Text>`, drags in troika-three-text and fetches a
 * default font from Google's CDN at runtime. A canvas costs one texture upload
 * and renders the site's own typography, which next/font has already loaded.
 */
export const createCardFront = async ({
  name,
  title,
  meta,
  serial,
}: Omit<CardFaceOptions, "qrUrl">): Promise<THREE.CanvasTexture> => {
  const canvas = newCanvas();
  const ctx = canvas.getContext("2d")!;

  // Wait for next/font to settle, otherwise the first paint uses the fallback
  // face and the texture bakes in the wrong metrics.
  try {
    await document.fonts.ready;
  } catch {
    /* fonts API unavailable — the fallback stack is fine */
  }

  ctx.save();
  clipToCard(ctx);

  // Body
  const body = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  body.addColorStop(0, "#11172e");
  body.addColorStop(0.55, "#0d1226");
  body.addColorStop(1, "#080b16");
  ctx.fillStyle = body;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Accent band — the site's signature gradient.
  const accent = ctx.createLinearGradient(0, 0, WIDTH, 0);
  accent.addColorStop(0, "#7179ef");
  accent.addColorStop(0.34, "rgb(21, 59, 95)");
  accent.addColorStop(0.67, "#693d55");
  accent.addColorStop(1, "rgb(240, 128, 128)");
  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, WIDTH, 84);

  // Lanyard slot — a real punched slot, dark all the way through.
  ctx.fillStyle = "#05070f";
  roundedRect(ctx, WIDTH / 2 - 52, 30, 104, 22, 11);
  ctx.fill();

  ctx.textAlign = "left";
  const MARGIN = 52;

  // Issuer
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = '600 20px "Bricolage Grotesque", system-ui, sans-serif';
  ctx.fillText("SHADEBE.DEV", MARGIN, 148);

  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.font = '400 17px "Bricolage Grotesque", system-ui, sans-serif';
  ctx.fillText("STAFF CREDENTIAL", MARGIN, 176);

  // Chip
  const chipX = WIDTH - MARGIN - 76;
  const chipY = 130;
  const chip = ctx.createLinearGradient(chipX, chipY, chipX + 76, chipY + 58);
  chip.addColorStop(0, "#d8c98a");
  chip.addColorStop(0.5, "#b39d5d");
  chip.addColorStop(1, "#e6dcae");
  ctx.fillStyle = chip;
  roundedRect(ctx, chipX, chipY, 76, 58, 10);
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.25)";
  ctx.lineWidth = 2;
  for (let i = 1; i < 3; i += 1) {
    ctx.beginPath();
    ctx.moveTo(chipX, chipY + (58 / 3) * i);
    ctx.lineTo(chipX + 76, chipY + (58 / 3) * i);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(chipX + 38, chipY);
  ctx.lineTo(chipX + 38, chipY + 58);
  ctx.stroke();

  // Name — the card's whole reason for existing, so it gets the most room.
  ctx.fillStyle = "#ffffff";
  const nameSize = fitText(ctx, name.toUpperCase(), WIDTH - MARGIN * 2, 52);
  ctx.font = `600 ${nameSize}px "Bricolage Grotesque", system-ui, sans-serif`;
  ctx.fillText(name.toUpperCase(), MARGIN, 456);

  // Accent rule
  ctx.fillStyle = accent;
  ctx.fillRect(MARGIN, 486, 132, 4);

  // Role
  ctx.fillStyle = "rgba(255,255,255,0.66)";
  ctx.font = '400 27px "Bricolage Grotesque", system-ui, sans-serif';
  ctx.fillText(title, MARGIN, 536);

  // Field labels
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.font = '600 15px "Bricolage Grotesque", system-ui, sans-serif';
  ctx.fillText("LOCATION", MARGIN, 596);
  ctx.fillText("ID", WIDTH - MARGIN - 150, 596);

  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = '400 20px "Bricolage Grotesque", system-ui, sans-serif';
  ctx.fillText(meta, MARGIN, 624);
  ctx.fillText(serial, WIDTH - MARGIN - 150, 624);

  // Barcode
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  drawBarcode(ctx, MARGIN, 668, WIDTH - MARGIN * 2, 56, serial);

  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.font = '400 15px "Bricolage Grotesque", system-ui, sans-serif';
  ctx.fillText(`${serial} · VALID THRU 12/28`, MARGIN, 748);

  ctx.restore();

  // Hairline, drawn on the outline itself rather than inset.
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 3;
  roundedRect(ctx, 1.5, 1.5, WIDTH - 3, HEIGHT - 3, CORNER - 1);
  ctx.stroke();

  return toTexture(canvas);
};

/**
 * The back — white, with a magnetic stripe and a QR that actually resolves.
 *
 * There was no back at all before: spin the card past ninety degrees and you
 * saw the raw box material, a near-black metallic slab, which is why the flip
 * looked broken.
 */
export const createCardBack = async ({
  qrUrl,
  serial,
}: Pick<CardFaceOptions, "qrUrl" | "serial">): Promise<THREE.CanvasTexture> => {
  const canvas = newCanvas();
  const ctx = canvas.getContext("2d")!;

  try {
    await document.fonts.ready;
  } catch {
    /* fallback stack is fine */
  }

  const qr = await loadImage(qrUrl);

  ctx.save();
  clipToCard(ctx);

  // Card stock
  const stock = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  stock.addColorStop(0, "#f7f7f4");
  stock.addColorStop(0.5, "#ececea");
  stock.addColorStop(1, "#e2e2df");
  ctx.fillStyle = stock;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Magnetic stripe
  const stripe = ctx.createLinearGradient(0, 96, 0, 214);
  stripe.addColorStop(0, "#2b2b2f");
  stripe.addColorStop(0.5, "#141416");
  stripe.addColorStop(1, "#2b2b2f");
  ctx.fillStyle = stripe;
  ctx.fillRect(0, 96, WIDTH, 118);

  const MARGIN = 52;
  ctx.textAlign = "left";

  // QR
  const qrSize = 232;
  const qrX = (WIDTH - qrSize) / 2;
  const qrY = 286;

  ctx.fillStyle = "#ffffff";
  roundedRect(ctx, qrX - 14, qrY - 14, qrSize + 28, qrSize + 28, 14);
  ctx.fill();

  if (qr) {
    ctx.drawImage(qr, qrX, qrY, qrSize, qrSize);
  } else {
    ctx.fillStyle = "#0b0f1f";
    ctx.font = '600 18px "Bricolage Grotesque", system-ui, sans-serif';
    ctx.textAlign = "center";
    ctx.fillText("LINKEDIN", WIDTH / 2, qrY + qrSize / 2);
    ctx.textAlign = "left";
  }

  ctx.fillStyle = "rgba(11,15,31,0.62)";
  ctx.font = '600 17px "Bricolage Grotesque", system-ui, sans-serif';
  ctx.textAlign = "center";
  ctx.fillText("SCAN FOR LINKEDIN", WIDTH / 2, qrY + qrSize + 56);

  // Small print
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(11,15,31,0.42)";
  ctx.font = '400 14px "Bricolage Grotesque", system-ui, sans-serif';
  const smallPrint = [
    "This credential remains the property of the holder.",
    "If found, please return it — or just say hello.",
    `SERIAL ${serial} · JOHANNESBURG, ZA`,
  ];
  smallPrint.forEach((line, i) => {
    ctx.fillText(line, MARGIN, 662 + i * 24);
  });

  // Signature strip
  ctx.fillStyle = "rgba(11,15,31,0.06)";
  roundedRect(ctx, MARGIN, 740, WIDTH - MARGIN * 2, 40, 6);
  ctx.fill();

  ctx.restore();

  ctx.strokeStyle = "rgba(11,15,31,0.16)";
  ctx.lineWidth = 3;
  roundedRect(ctx, 1.5, 1.5, WIDTH - 3, HEIGHT - 3, CORNER - 1);
  ctx.stroke();

  return toTexture(canvas);
};

/**
 * The lanyard webbing: the name repeating along the strap, the way a printed
 * lanyard actually reads.
 *
 * `lanyardStrap` already writes UVs as u across and v along the ribbon, so
 * this maps with no geometry change — just RepeatWrapping on T.
 */
export const createLanyardTexture = (label: string): THREE.CanvasTexture => {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  // Black webbing with white print — the way a conference lanyard actually
  // reads, and it keeps the eye on the card rather than on the strap.
  const webbing = ctx.createLinearGradient(0, 0, canvas.width, 0);
  webbing.addColorStop(0, "#0a0a0a");
  webbing.addColorStop(0.25, "#1c1c1c");
  webbing.addColorStop(0.5, "#242424");
  webbing.addColorStop(0.75, "#1c1c1c");
  webbing.addColorStop(1, "#0a0a0a");
  ctx.fillStyle = webbing;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Edge stitching.
  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 6]);
  [10, canvas.width - 10].forEach((x) => {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  });
  ctx.setLineDash([]);

  // A suggestion of weave. Cheap, and it stops the strap reading as a flat
  // ribbon of colour under the lightformers.
  ctx.strokeStyle = "rgba(255,255,255,0.045)";
  ctx.lineWidth = 2;
  for (let y = 0; y < canvas.height; y += 7) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Printed text, rotated to run along the strap.
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = '700 30px "Bricolage Grotesque", system-ui, sans-serif';
  ctx.fillText(`${label}  ·  ${label}  ·`, 0, 0);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 5);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
};
