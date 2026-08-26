"use client";

import { MouseEvent, useCallback } from "react";
import { isHashLink, scrollToHash } from "@/lib/utils";

/**
 * Click handling for the menu's links.
 *
 * In-page anchors are intercepted and smooth-scrolled; routes navigate
 * normally. Either way the menu closes. NavLink and MenuCard each carried
 * their own copy of this.
 */
export function useHashNavigation(closeMenu: () => void) {
  return useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string) => {
      closeMenu();
      if (isHashLink(href) && scrollToHash(href)) {
        event.preventDefault();
      }
    },
    [closeMenu]
  );
}

export default useHashNavigation;
