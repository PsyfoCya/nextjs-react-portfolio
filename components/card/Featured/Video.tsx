import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface VideoProps {
  video: string;
  active: boolean;
  title: string;
}

const Video = ({ video, active, title }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    if (active) {
      // play() rejects if the element is torn down mid-play; nothing to do.
      void element.play().catch(() => {});
    } else {
      element.pause();
      element.currentTime = 0;
    }
  }, [active]);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 rounded-3xl">
      <video
        src={video}
        ref={videoRef}
        loop={active}
        muted
        playsInline
        preload="metadata"
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
