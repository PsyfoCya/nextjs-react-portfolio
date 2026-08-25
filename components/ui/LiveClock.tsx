"use client";

import moment from "moment-timezone";
import { FC, useEffect, useState } from "react";

interface LiveClockProps {
  timeZone: string;
}

const LiveClock: FC<LiveClockProps> = ({ timeZone }) => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const currentTime = moment().tz(timeZone).format("HH:mm:ss");
      setTime(currentTime);
    };

    // Render the first tick immediately rather than after a second of "loading".
    updateClock();
    const intervalId = setInterval(updateClock, 1000);

    // Cleanup Interval on component unmount
    return () => clearInterval(intervalId);
  }, [timeZone]);

  return (
    <div className="text-xl sm:text-2xl lg:text-3xl text-secondary-foreground font-semibold">
      {time ? (
        <div className="flex items-center justify-center gap-2 sm:gap-[2vw] whitespace-nowrap">
          <span>{timeZone}</span>
          <span>{time}</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-[0.5vw]">
          loading...
        </div>
      )}
    </div>
  );
};

export default LiveClock;
