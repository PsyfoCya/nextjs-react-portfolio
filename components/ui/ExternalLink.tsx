import Link from "next/link";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type LinkProps = Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "href" | "children"
>;

interface ExternalLinkProps extends LinkProps {
  href: string;
  children: ReactNode;
}

/** Anything that isn't a same-document anchor or an app route. */
export const isExternal = (href: string) =>
  href.startsWith("http") || href.startsWith("mailto:");

/**
 * A link that opens off-site addresses in a new tab and leaves internal routes
 * alone.
 *
 * The `startsWith("http")` test was repeated in two components, and three more
 * hardcoded `target="_blank"` on links that could be internal — `/work` in the
 * experience timeline was being opened in a new tab.
 */
const ExternalLink = ({ href, children, ...rest }: ExternalLinkProps) => {
  const external = isExternal(href);

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default ExternalLink;
