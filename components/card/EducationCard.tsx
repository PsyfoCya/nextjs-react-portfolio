import React from "react";
import Card from "../ui/Card";
import Timeline, { TimelineItem } from "../ui/Timeline";

function EducationCard() {
  const educationData = [
    {
      date: "2012 - 2016",
      title: "National Senior Certificate",
      subTitle: "Fred Norman Secondary",
    },
    {
      date: "2020 - 2022",
      title: "Diploma in IT in Software Development",
      subTitle: "IIE Rosebank College",
    },
  ];

  return (
    <Card title="My Education">
      <Timeline>
        {educationData.map((education, i) => (
          <TimelineItem
            key={i}
            date={education.date}
            title={education.title}
            subTitle={education.subTitle}
          />
        ))}
      </Timeline>
    </Card>
  );
}

export default EducationCard;
