'use client';

import { usePathname } from 'next/navigation';
import Header, { TRANSPARENT_NAV_PAGES } from './Header';

/**
 * Renders the header for every route, plus the spacer that keeps content
 * clear of the fixed nav. Transparent-nav pages (the homepage and About)
 * intentionally run their hero underneath the header, so they get no spacer.
 */
export default function HeaderSlot() {
  const pathname = usePathname();
  const isTransparent = TRANSPARENT_NAV_PAGES.includes(pathname);

  return (
    <>
      <Header />
      {!isTransparent && <div className="h-20 lg:h-24" />}
    </>
  );
}
