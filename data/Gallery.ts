import type { StaticImageData } from "next/image";
import img1 from "@/public/assets/gallery/me.jpg";
import img2 from "@/public/assets/gallery/shades.jpg";
import img3 from "@/public/assets/gallery/groundie.jpg";
import img4 from "@/public/assets/gallery/hyuoku.jpg";
import img5 from "@/public/assets/gallery/melancholic.jpg";

export interface GalleryImage {
  id: number;
  img: StaticImageData;
}

/**
 * Also the portrait behind the "Me" card, which used to reach for
 * `galleryImages[0].img` — a silent dependency on the ordering of this list.
 */
export const portrait: StaticImageData = img1;

export const galleryImages: readonly GalleryImage[] = [
  { id: 0, img: img1 },
  { id: 1, img: img2 },
  { id: 2, img: img3 },
  { id: 3, img: img4 },
  { id: 4, img: img5 },
];
