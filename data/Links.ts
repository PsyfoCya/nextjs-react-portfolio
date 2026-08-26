/**
 * Every off-site address the site links to, in one place.
 *
 * The LinkedIn URL previously appeared in four files — twice with a trailing
 * slash and twice without — and the nav was modelled twice over, as `navItems`
 * in FullScreenMenu and `myLinks` in MenuCard.
 */

export const EMAIL = "psyfohadebe@gmail.com";

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/siyabonga-hadebe-25385620b",
  github: "https://github.com/PsyfoCya",
  youtube: "https://www.youtube.com/@noiamnotsomebodyelse",
} as const;

export interface NavLinkItem {
  title: string;
  /** A `#anchor` on the home page, or a route. */
  link: string;
}

/** The deep links listed inside the menu card. */
export const menuLinks: readonly NavLinkItem[] = [
  { title: "CASE STUDIES", link: "/work" },
  { title: "BACKGROUND", link: "#background" },
  { title: "EXPERIENCE", link: "#experience" },
  { title: "EDUCATION", link: "#education" },
  { title: "CERTIFICATIONS", link: "#certifications" },
  { title: "TECH STACK", link: "#stack" },
  { title: "HOBBIES", link: "#hobbies" },
];
