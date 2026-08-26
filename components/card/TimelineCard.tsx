import Card from "@/components/ui/Card";
import Timeline, { TimelineItem } from "@/components/ui/Timeline";
import type { TimelineEntry } from "@/data/Timeline";

interface TimelineCardProps {
  title: string;
  entries: readonly TimelineEntry[];
}

/**
 * A titled card holding a list of dated entries.
 *
 * Education, experience and certifications were three components with identical
 * bodies, two of which also rebuilt their data array on every render.
 */
const TimelineCard = ({ title, entries }: TimelineCardProps) => (
  <Card title={title}>
    <Timeline>
      {entries.map((entry) => (
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
  </Card>
);

export default TimelineCard;
