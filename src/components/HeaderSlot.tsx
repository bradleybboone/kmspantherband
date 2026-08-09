'use client';

import { usePathname } from 'next/navigation';
import Header, { TRANSPARENT_NAV_PAGES } from './Header';

/**
 * Renders the fixed header for every route, so no page can forget it.
 *
 * The spacer that keeps content clear of the fixed nav is NOT here -- it is
 * <HeaderSpacer />, rendered as the first child of <main>. See the note there.
 */
export default function HeaderSlot() {
  return <Header />;
}

/**
 * The spacer that offsets page content below the fixed header.
 *
 * It must live INSIDE <main>, not beside it. On client-side navigation the App
 * Router scrolls the changed segment -- <main> -- to viewport y=0. When the
 * spacer was a sibling of <main>, that put <main>'s first pixel at y=0 and the
 * 96px fixed header painted straight over the page's <h1>: clicking a nav link
 * from a scrolled page landed 96px short on every route that has a spacer.
 * (The homepage appeared fine only because it is transparent-nav and has no
 * spacer, which is why an earlier fix verified against `/` alone looked green.)
 *
 * Inside <main>, the spacer is part of what gets scrolled to, so content lands
 * exactly below the header.
 *
 * Transparent-nav pages get no spacer on purpose -- their hero runs underneath
 * the header.
 */
export function HeaderSpacer() {
  const pathname = usePathname();
  if (TRANSPARENT_NAV_PAGES.includes(pathname)) return null;
  return <div className="h-20 lg:h-24" />;
}
