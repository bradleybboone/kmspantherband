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

const districtAwardees: [name: string, instrument: string][] = [
  ["Abigail Alvarado", "Flute"],
  ["Angel Sanchez", "Bass Clarinet"],
  ["Anthony Maldonado", "Trumpet"],
  ["Ava Salazar", "Trombone"],
  ["Daniel Barretero", "Tuba"],
  ["Eric Cerf Jr.", "Percussion"],
  ["Jacob White", "Percussion"],
  ["Jason Argueta", "Clarinet"],
  ["Kaleb Mendoza Barbosa", "Trumpet"],
  ["Kaylee Schexsnaider", "Clarinet"],
  ["Lauren Espinoza", "Oboe"],
  ["Litzy Mejia Ayala", "Alto Saxophone"],
  ["Violetta Rodriguez", "Flute"],
];

export const announcement: Announcement | null = {
  heading: <>CONGRATULATIONS TO OUR DISTRICT AWARDEES!</>,
  body: (
    <>
      We are proud to celebrate 13 C.E. King Middle School Band students who
      earned recognition at the District competition on Saturday,
      September&nbsp;26! These students prepared for weeks, gave a strong
      performance, and represented our band program with excellence. Please
      join us in congratulating them:
      <br />
      <br />
      {districtAwardees.map(([name, instrument]) => (
        <span key={name}>
          <strong>{name}</strong> &mdash; {instrument}
          <br />
        </span>
      ))}
      <br />
      We are so proud of the hard work and dedication these students showed.
      Way to represent the Panthers!
    </>
  ),
  expires: "2026-10-11",
};
