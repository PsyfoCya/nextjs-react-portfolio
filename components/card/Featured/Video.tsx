"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useInViewport } from "@/lib/useInViewport";

interface VideoProps {
  video: string;
  active: boolean;
  title: string;
}

/**
 * A project preview clip.
 *
 * The `src` is attached only once the card is near the viewport. These are five
 * cross-origin MP4s on cdn.dribbble.com, and with `preload="metadata"` on a
 * plain `src` the browser opened all five connections during page load — while
 * every one of them was below the fold.
 */
const Video = ({ video, active, title }: VideoProps) => {
  const {
    ref: videoRef,
    node: videoElement,
    inView: nearViewport,
  } = useInViewport<HTMLVideoElement>({ rootMargin: "300px", once: true });

  useEffect(() => {
    const element = videoElement;
    if (!element || !nearViewport) return;

    if (active) {
      // play() rejects if the element is torn down mid-play; nothing to do.
      void element.play().catch(() => {});
    } else {
      element.pause();
      element.currentTime = 0;
    }
  }, [active, nearViewport, videoElement]);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 rounded-3xl">
      <video
        src={nearViewport ? video : undefined}
        ref={videoRef}
        loop={active}
        muted
        playsInline
        preload="none"
        aria-label={`${title} preview`}
        className={cn(
          "h-full w-full object-cover rounded-3xl",
          active ? "" : "grayscale"
        )}
      />
    </div>
  );
};

export default Video;
