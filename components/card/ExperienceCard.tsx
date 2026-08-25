import Card from "../ui/Card";
import Timeline, { TimelineItem } from "../ui/Timeline";

const experiencesData = [
  {
    date: "2024 - Present • 2 yrs",
    title: "Frontend Developer",
    subTitle: "Munch — restaurant management & online ordering",
    link: "/work",
    tag: "Full-time",
  },
  {
    date: "2023 - 2024 • 1 yr",
    title: "Software Developer Intern",
    subTitle: "Wits Incubator - Tshimologong Digital Precinct",
    link: "https://tshimologong.joburg/",
    tag: "Onsite/Hybrid",
  },
];

function ExperienceCard() {
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
