"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Timeline, { TimelineItem } from "@/components/ui/Timeline";
import type { TimelineEntry } from "@/data/Timeline";

interface TimelineCardProps {
  title: string;
  entries: readonly TimelineEntry[];
  /**
   * Show this many, then a toggle. Nine certifications rendered at once made
   * that card twice the height of anything beside it and turned the grid
   * ragged; the rest are one click away.
   */
  initialCount?: number;
}

/**
 * A titled card holding a list of dated entries.
 *
 * Education, experience and certifications were three components with
 * identical bodies, two of which also rebuilt their data array on every render.
 */
const TimelineCard = ({ title, entries, initialCount }: TimelineCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const collapsible =
    initialCount !== undefined && entries.length > initialCount;
  const visible =
    collapsible && !expanded ? entries.slice(0, initialCount) : entries;
  const hidden = entries.length - visible.length;

  return (
    <Card title={title} fill>
      <Timeline>
        {visible.map((entry) => (
          <TimelineItem
            // Title and date together identify an entry; the index does not
            // survive reordering.
            key={`${entry.date}-${entry.title}`}
            date={entry.date}
            title={entry.title}
            subTitle={entry.subTitle}
            link={entry.link}
            tag={entry.tag}
          />
        ))}
      </Timeline>

      {collapsible ? (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          aria-expanded={expanded}
          className="link mt-auto w-fit font-pixel text-xs uppercase tracking-wide text-secondary-foreground transition-colors duration-200 hover:text-primary-foreground"
        >
          {expanded ? "Show less" : `Show ${hidden} more`}
        </button>
      ) : null}
    </Card>
  );
};

export default TimelineCard;
