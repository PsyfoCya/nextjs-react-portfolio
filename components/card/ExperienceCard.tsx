import React from "react";
import Card from "../ui/Card";
import Timeline, { TimelineItem } from "../ui/Timeline";

function ExperienceCard() {
  const experiencesData = [
    {
      date: "2023 - 2024 • 1yr",
      title: "Software Developer Intern",
      subTitle: "Wits Incubator - Tshimologong Digital Precinct",
      link: "https://tshimologong.joburg/",
      tag: "Onsite/Hybrid",
    },
  ];

  return (
    <Card title="My Experience">
      <Timeline>
        {experiencesData.map((experience, i) => (
          <TimelineItem
            key={i}
            date={experience.date}
            title={experience.title}
            subTitle={experience.subTitle}
            link={experience.link}
            tag={experience.tag}
          />
        ))}
      </Timeline>
    </Card>
  );
}

export default ExperienceCard;
