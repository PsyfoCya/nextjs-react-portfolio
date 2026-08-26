/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // AVIF first, WebP for the browsers that lack it. Without this Next only
    // ever serves WebP, which is roughly 20-30% larger for these photographs.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
