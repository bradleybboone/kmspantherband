'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { announcement } from '@/content/announcement';

/*
  The homepage's one Announcement Panel (DESIGN.md: "one per page at most").
  Content comes exclusively from src/content/announcement.tsx.

  Expiry runs client-side in an effect, NOT at render: the static build
  always ships the banner HTML, and the effect hides it once the viewer's
  local date passes `expires`. Server HTML and first client render stay
  identical (no hydration mismatch), and — because deploys do not purge
  Cloudflare's edge cache (docs/deployment-runbook.md) — an expired banner
  hides even on stale cached HTML. Accepted costs, confined to the window
  between expiry and the next deploy: a brief flash + layout jump as the
  section unmounts, and no-JS visitors see the expired banner until the
  next deploy.
*/

// "YYYY-MM-DD" -> end of that day, viewer-local time. A naïve
// new Date("YYYY-MM-DD") is UTC midnight — 7 PM the previous evening in
// Texas — and would hide banners a night early.
function endOfDayLocal(expires: string): Date {
  const [y, m, d] = expires.split('-').map(Number);
  return new Date(y, m - 1, d, 23, 59, 59);
}

export default function AnnouncementPanel() {
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    // An unparsable `expires` yields NaN; NaN comparisons are false, so a
    // malformed date fails safe — the banner stays visible.
    if (
      announcement?.expires &&
      Date.now() > endOfDayLocal(announcement.expires).getTime()
    ) {
      queueMicrotask(() => setExpired(true));
    }
  }, []);

  if (!announcement || expired) return null;

  return (
    <section className="py-12 bg-white">
      <div className="container">
        <div className="bg-primary text-secondary p-8 rounded-lg text-center">
          <h2 className="text-2xl lg:text-3xl mb-4">{announcement.heading}</h2>
          <p className="mb-6 max-w-2xl mx-auto">{announcement.body}</p>
          {announcement.cta && (
            <Link
              href={announcement.cta.href}
              className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              {announcement.cta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
