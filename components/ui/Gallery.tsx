"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { galleryImages } from "@/data/Gallery";
import { useInViewport } from "@/lib/useInViewport";

// Hoisted: Swiper reads these on every render, and rebuilding them each time
// hands it a new config object for no reason.
const MODULES = [Pagination, Autoplay];
const PAGINATION = { clickable: true } as const;
const AUTOPLAY = { delay: 2500, disableOnInteraction: false } as const;

const Gallery = () => {
  // Autoplay used to advance every 2.5s from mount to unmount, laying out and
  // painting slides nobody was looking at.
  const { ref: containerRef, inView } = useInViewport<HTMLDivElement>({
    rootMargin: "200px",
  });

  return (
    <div
      ref={containerRef}
      className="h-[550px] sm:h-[650px] md:h-full 2xl:h-[750px] w-full"
    >
      <Swiper
        modules={MODULES}
        pagination={PAGINATION}
        autoplay={inView ? AUTOPLAY : false}
        className="mySwiper rounded-2xl"
      >
        {galleryImages.map((img, index) => (
          <SwiperSlide key={img.id}>
            <Image
              src={img.img}
              alt=""
              // Only the first slide is visible on arrival; the rest can wait.
              loading={index === 0 ? "eager" : "lazy"}
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover w-full h-full object-left-top"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
