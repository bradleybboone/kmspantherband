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
  heading: <>THIS WEEK: FALL CONCERT TUESDAY &middot; KHS BAND NIGHT FRIDAY</>,
  body: (
    <>
      <strong>
        Fall Concert &mdash; Tuesday, October&nbsp;6 &middot; 7:00&nbsp;PM
        &middot; KMS Auditorium
      </strong>
      <br />
      Students enter through the auditorium doors at 6:00&nbsp;PM and head to
      their report locations by 6:15 for inspection, attendance, and warm-up.
      The concert begins promptly at 7:00, ends around 7:30, and students are
      dismissed at 7:45&nbsp;PM. Uniform: band polo, black dress pants, black
      dress shoes, black socks, and black belt.
      <br />
      <br />
      <strong>
        KHS Band Night &mdash; Friday, October&nbsp;9 &middot; Panther Stadium
      </strong>
      <br />
      Honor Band, Symphonic Band, and all 8th graders will play with the
      C.E. King High School Band. Students report to the band hall at
      dismissal, ride the bus to KHS with instruments in cases, eat dinner
      (provided by the KHS Band Boosters), march to the stadium with their
      sections, play in the stands for the first half of the football game,
      and watch the halftime shows before returning by bus. Uniform: blue
      band polo or T-shirt, blue jeans (no rips or tears), socks, and
      athletic shoes.
      <br />
      <br />
      <strong>Permission slip required for Friday.</strong> Sign and return
      it before Friday:{" "}
      <a
        href="https://drive.google.com/file/d/1L7k5Wu5Ml95vLObINu1zHbOpQ9tIqhWP/view"
        target="_blank"
        rel="noopener noreferrer"
        className="underline font-semibold text-secondary hover:text-gray-light"
      >
        Permission Slip (English)
      </a>{" "}
      &middot;{" "}
      <a
        href="https://drive.google.com/file/d/1JGHnMIGm4pCKWE51ltVsCeopt-z1DyQ5/view"
        target="_blank"
        rel="noopener noreferrer"
        className="underline font-semibold text-secondary hover:text-gray-light"
      >
        Permiso (Espa&ntilde;ol)
      </a>
      . Mark on the slip where you will pick up your student: at Panther
      Stadium (north side of the bleachers, at the end of halftime &mdash;
      check in with a director to sign out) or at KMS (front of the
      competition gym, around 9:00&nbsp;PM).
    </>
  ),
  expires: "2026-10-09",
};
