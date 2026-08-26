"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { galleryImages } from "@/data/Gallery";
import Image from "next/image";

const Gallery = () => {
  return (
    <div className="h-[550px] sm:h-[650px] md:h-full 2xl:h-[750px] w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
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
