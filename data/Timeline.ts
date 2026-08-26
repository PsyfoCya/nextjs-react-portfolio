/**
 * Dated entries for the education, experience and certification cards.
 *
 * These lists used to live inside the components that rendered them, and two of
 * the three rebuilt their array on every render.
 */

export interface TimelineEntry {
  /** Free text — a year range, a month, or a range with a duration. */
  date: string;
  title: string;
  subTitle: string;
  /** Internal route or external URL. Renders the row as a link when set. */
  link?: string;
  /** Small pill after the subtitle, e.g. "Full-time". */
  tag?: string;
}

export const education: readonly TimelineEntry[] = [
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

export const experience: readonly TimelineEntry[] = [
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

export const certifications: readonly TimelineEntry[] = [
  {
    date: "Jul 2022",
    title: "Responsive Web Design",
    subTitle: "freeCodeCamp",
    link: "https://www.freecodecamp.org/certification/fcce3a136ba-9d3c-418e-ae52-96ab03a92815/responsive-web-design",
  },
  {
    date: "Jan 2023",
    title: "Legacy JavaScript Algorithms and Data Structures",
    subTitle: "freeCodeCamp",
    link: "https://www.freecodecamp.org/certification/fcce3a136ba-9d3c-418e-ae52-96ab03a92815/javascript-algorithms-and-data-structures",
  },
  {
    date: "Feb 2024",
    title: "React: Design Patterns",
    subTitle: "LinkedIn Learning",
    link: "https://www.linkedin.com/learning/certificates/8a055cd476c12e7732cfa8f01ce231e7b4914f21179d72a7c8d3c7ebc9231d35",
  },
  {
    date: "Feb 2024",
    title: "React.js Essential Training",
    subTitle: "LinkedIn Learning",
    link: "https://www.linkedin.com/learning/certificates/97d250be2a26754e277689a986c73945932946279d82cc81a1920f6311607341?trk=share_certificate",
  },
  {
    date: "Feb 2024",
    title: "Learning Spring with Spring Boot",
    subTitle: "LinkedIn Learning",
    link: "https://www.linkedin.com/learning/certificates/2507a58116f2b507caee05dbfe70ff949cf500e681b6027299ef405a46f2d5a1?trk=share_certificate",
  },
  {
    date: "Feb 2024",
    title: "Java Essential Training: Objects and APIs",
    subTitle: "LinkedIn Learning",
    link: "https://www.linkedin.com/learning/certificates/84ed0f3b12a7a808a2176a3ae955adcfd4d085f83a3d12b57607698040e9e72b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B0%2BaAlEG3TqaxNIAlPtsDnQ%3D%3D",
  },
  {
    date: "Feb 2024",
    title: "Git Essential Training",
    subTitle: "LinkedIn Learning",
    link: "https://www.linkedin.com/learning/certificates/51dc72d9e7dfe40cdb9aa7678346e9362419fe0f6c9f8fa7d55e5aee8d3816b7?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B0%2BaAlEG3TqaxNIAlPtsDnQ%3D%3D",
  },
  {
    date: "Mar 2024",
    title: "Learning Java Collections",
    subTitle: "LinkedIn Learning",
    link: "https://www.linkedin.com/learning/certificates/9d757bf5e0f3c8f77e2e340cceb1f3de663464e7e416fac61ee504a09d0e1499",
  },
  {
    date: "Mar 2024",
    title: "Back End Development and APIs",
    subTitle: "freeCodeCamp",
    link: "https://www.freecodecamp.org/certification/fcce3a136ba-9d3c-418e-ae52-96ab03a92815/back-end-development-and-apis",
  },
];
