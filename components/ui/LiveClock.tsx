"use client";

import moment from "moment-timezone";
import { FC, useEffect, useState } from "react";
// import { clearInterval } from "timers";

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

    const intervalId = setInterval(updateClock, 1000);

    // Cleanup Interval on component unmount
    return () => clearInterval(intervalId);
  }, [timeZone]);

  return (
    <div className=" text-3xl text-secondary-foreground font-semibold">
      {/* {timeZone}, {time} */}
      {time ? (
        <div className="flex items-center justify-center gap-[2vw]">
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
