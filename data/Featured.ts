export interface FeaturedProject {
  title: string;
  /** Shown top-right on the card. */
  tag: string;
  video: string;
  /** Live site, when there is one to link to. */
  link?: string;
}

const featuredData: FeaturedProject[] = [
  {
    title: "Previous Portfolio Site",
    tag: "Mar 2024",
    video:
      "https://cdn.dribbble.com/userupload/14984112/file/large-3660bda7ad875374cc33a794213fbbbe.mp4",
    link: "https://siyabonga-hadebe.netlify.app",
  },
  {
    title: "Dronoticz",
    tag: "Jul 2023",
    video:
      "https://cdn.dribbble.com/userupload/15023174/file/original-49e1bd1e77cb3483a6edd72abdbcffc6.mp4",
    link: "https://psyfo-c-ya.github.io/dronoticz.github.io",
  },
  {
    title: "School Blog Web App LP",
    tag: "Nov 2023",
    video:
      "https://cdn.dribbble.com/userupload/14987428/file/original-acb8c2402b3f9f241370ebde5e5863b0.mp4",
    link: "https://tshimologong-secondary-school.netlify.app",
  },
  {
    title: "Simon Says",
    tag: "Feb 2023",
    video:
      "https://cdn.dribbble.com/userupload/14987451/file/original-5da71005a236c36b567212287f01d2bd.mp4",
    link: "https://psyfo-c-ya.github.io/simon-game/",
  },
  {
    title: "Invitation Card",
    tag: "Feb 2023",
    video:
      "https://cdn.dribbble.com/userupload/15094726/file/original-cc9adea45b2f7bf19cfa697a0cde041b.mp4",
  },
];

export default featuredData;
