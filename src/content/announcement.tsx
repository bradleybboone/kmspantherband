import type { ReactNode } from "react";

/*
  Homepage Announcement Panel content. THIS FILE IS THE ONLY THING TO EDIT
  when posting or clearing a banner — the look lives in
  src/components/AnnouncementPanel.tsx and is never duplicated here.

  Rules:
  - Text-level markup only in `heading`/`body` (<strong>, &nbsp;, &ndash;).
    Layout, color, and spacing belong to the component.
  - `expires` is "YYYY-MM-DD" — the LAST day the banner shows
    (viewer-local time). Omit it for a banner that stays until edited away.
  - No banner:
      export const announcement: Announcement | null = null;
  - Filled example:
      export const announcement: Announcement | null = {
        heading: <>SPRING CONCERT &mdash; THURSDAY, MAY&nbsp;14</>,
        body: <>Doors at 6:30 PM in the C.E. King auditorium.</>,
        cta: { label: "See the Calendar", href: "/calendar" },
        expires: "2026-05-14",
      };
*/

export interface Announcement {
  heading: ReactNode;
  body: ReactNode;
  cta?: { label: string; href: string };
  /** "YYYY-MM-DD" — last day the banner is shown, viewer-local time. */
  expires?: string;
}

export const announcement: Announcement | null = {
  heading: <>INSTRUMENT DRIVE &mdash; FRIDAY, AUGUST&nbsp;21</>,
  body: (
    <>
      Need an instrument? All three recommended vendors in one room,
      5:00&ndash;8:00 PM at the <strong>Null Middle School cafeteria</strong>{" "}
      (not C.E. King) &mdash; rental and purchase options plus the required
      accessories.
    </>
  ),
  cta: { label: "See Rental Options", href: "/instrument-rental" },
  expires: "2026-08-21",
};
