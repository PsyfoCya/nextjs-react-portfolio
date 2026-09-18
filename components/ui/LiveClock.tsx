"use client";

import { useEffect, useState } from "react";

interface LiveClockProps {
  /** Full IANA zone, e.g. `Africa/Johannesburg`. */
  timeZone: string;
  /** What to show next to the time. Defaults to the city part of the zone. */
  label?: string;
}

/**
 * `Intl.DateTimeFormat` rather than moment-timezone: every browser already
 * ships the IANA database, so showing one city's wall clock does not need a 3MB
 * dependency.
 *
 * The previous version passed a bare `"Johannesburg"` to `moment().tz()`, which
 * has no data for it — moment logged an error and fell back to *local* time, so
 * the clock only appeared correct to visitors already in that zone.
 */
const LiveClock = ({ timeZone, label }: LiveClockProps) => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    let format: (date: Date) => string;

    // An unrecognised zone makes the constructor throw, and a clock is not
    // worth taking the page down for.
    try {
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      format = (date) => formatter.format(date);
    } catch {
      const fallback = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      format = (date) => fallback.format(date);
    }

    // Render the first tick immediately rather than after a second of "loading".
    setTime(format(new Date()));
    const intervalId = setInterval(() => setTime(format(new Date())), 1000);

    return () => clearInterval(intervalId);
  }, [timeZone]);

  const displayName = label ?? timeZone.split("/").pop()?.replace(/_/g, " ");

  return (
    <div className="text-xl sm:text-2xl lg:text-3xl text-secondary-foreground font-semibold">
      <div className="flex items-center justify-center gap-2 sm:gap-[2vw] whitespace-nowrap">
        <span>{displayName}</span>
        {/*
          The server has no clock for the visitor's zone, so the first paint
          shows the digits' own shape rather than the word "loading" — same
          width, no reflow when the real time arrives a tick later.
        */}
        <span suppressHydrationWarning>{time || "--:--:--"}</span>
      </div>
    </div>
  );
};

export default LiveClock;
