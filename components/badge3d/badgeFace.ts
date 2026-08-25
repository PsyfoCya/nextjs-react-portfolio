import * as THREE from "three";

/** Matches the card's 0.8 x 1.125 half-extents in the physics scene. */
const WIDTH = 512;
const HEIGHT = 720;

export interface BadgeFaceOptions {
  name: string;
  title: string;
  meta: string;
  photoUrl: string;
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
    // A missing portrait should cost us the photo, not the whole badge.
    image.onerror = () => resolve(null);
    image.src = src;
  });

/**
 * Paints the badge artwork onto a 2D canvas and hands back a texture.
 *
 * Drawing the face ourselves keeps the whole badge dependency-free: the
 * obvious alternative, drei's <Text>, drags in troika-three-text and fetches a
 * default font from Google's CDN at runtime. A canvas costs one texture upload
 * and renders the site's own typography, which is already loaded by next/font.
 */
export const createBadgeTexture = async ({
  name,
  title,
  meta,
  photoUrl,
}: BadgeFaceOptions): Promise<THREE.CanvasTexture> => {
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  const ctx = canvas.getContext("2d")!;

  // Wait for next/font to settle, otherwise the first paint uses the fallback
  // face and the texture bakes in the wrong metrics.
  try {
    await document.fonts.ready;
  } catch {
    /* fonts API unavailable — the fallback stack is fine */
  }

  const photo = await loadImage(photoUrl);

  // Card body
  const body = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  body.addColorStop(0, "#0d1226");
  body.addColorStop(0.55, "#141a33");
  body.addColorStop(1, "#0b0f1f");
  ctx.fillStyle = body;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Accent header band — the same gradient the site's fancy buttons use.
  const accent = ctx.createLinearGradient(0, 0, WIDTH, 120);
  accent.addColorStop(0, "#7179ef");
  accent.addColorStop(0.34, "rgb(21, 59, 95)");
  accent.addColorStop(0.67, "#693d55");
  accent.addColorStop(1, "rgb(240, 128, 128)");
  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, WIDTH, 96);

  // Lanyard slot
  ctx.fillStyle = "#05070f";
  roundedRect(ctx, WIDTH / 2 - 54, 34, 108, 26, 13);
  ctx.fill();

  // Portrait
  const photoRadius = 108;
  const photoY = 260;
  ctx.save();
  ctx.beginPath();
  ctx.arc(WIDTH / 2, photoY, photoRadius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  if (photo) {
    const side = photoRadius * 2;
    ctx.drawImage(photo, WIDTH / 2 - photoRadius, photoY - photoRadius, side, side);
  } else {
    ctx.fillStyle = "#1d2440";
    ctx.fillRect(WIDTH / 2 - photoRadius, photoY - photoRadius, photoRadius * 2, photoRadius * 2);
  }
  ctx.restore();

  // Portrait ring
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(WIDTH / 2, photoY, photoRadius + 6, 0, Math.PI * 2);
  ctx.stroke();

  ctx.textAlign = "center";

  /** Steps the size down until the label fits inside the card's margins. */
  const fitText = (text: string, maxWidth: number, startPx: number): number => {
    let size = startPx;
    ctx.font = `600 ${size}px "Bricolage Grotesque", system-ui, sans-serif`;
    while (ctx.measureText(text).width > maxWidth && size > 20) {
      size -= 2;
      ctx.font = `600 ${size}px "Bricolage Grotesque", system-ui, sans-serif`;
    }
    return size;
  };

  // Name. Long names would otherwise run straight off both edges of the card.
  ctx.fillStyle = "#ffffff";
  fitText(name, WIDTH - 96, 54);
  ctx.fillText(name, WIDTH / 2, 452);

  // Accent rule
  const rule = ctx.createLinearGradient(WIDTH / 2 - 90, 0, WIDTH / 2 + 90, 0);
  rule.addColorStop(0, "rgba(113,121,239,0)");
  rule.addColorStop(0.5, "rgba(240,128,128,0.9)");
  rule.addColorStop(1, "rgba(113,121,239,0)");
  ctx.fillStyle = rule;
  ctx.fillRect(WIDTH / 2 - 90, 480, 180, 3);

  // Title
  ctx.fillStyle = "rgba(255,255,255,0.62)";
  ctx.font = '400 30px "Bricolage Grotesque", system-ui, sans-serif';
  ctx.fillText(title, WIDTH / 2, 528);

  // Footer meta
  ctx.fillStyle = "rgba(255,255,255,0.38)";
  ctx.font = '400 22px "Bricolage Grotesque", system-ui, sans-serif';
  ctx.fillText(meta, WIDTH / 2, 648);

  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 2;
  roundedRect(ctx, 24, 24, WIDTH - 48, HEIGHT - 48, 22);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
};
