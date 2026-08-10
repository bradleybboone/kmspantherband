import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rehearsal Schedule",
  description:
    "Daily band class and after-school sectional times for the KMS Panther Band.",
};

/*
  Seasonal content: this grid is the FALL 2026 sectional schedule, derived
  from the Teamup calendar (the handbook p. 31 lists sectionals only
  generically). Skipped weeks and Friday make-ups are NOT mirrored here on
  purpose — the calendar is authoritative for exceptions. Update this grid
  when spring sectionals start (week of January 11, 2027).
*/
const sectionals = [
  {
    day: "Monday",
    group: "Symphonic & Concert Bands",
    instruments: "Low Brass, Sax, Flute/Oboe",
    first: "August 24",
  },
  {
    day: "Tuesday",
    group: "Symphonic & Concert Bands",
    instruments: "Trumpet, Horn, Clarinet",
    first: "August 25",
  },
  {
    day: "Wednesday",
    group: "Honor Band",
    instruments: "Low Brass, Horn, Clarinet",
    first: "August 19",
  },
  {
    day: "Thursday",
    group: "Honor Band",
    instruments: "Flute, Trumpet, Oboe/Sax",
    first: "August 20",
  },
];

export default function Schedule() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Rehearsal Schedule
      </h1>

      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Fall Sectionals</h2>
          <p className="text-gray-dark mb-6">
            Honor, Symphonic, and Concert Band students attend one sectional
            per week for their instrument. All sectionals meet{" "}
            <strong>4:00&ndash;5:00 PM</strong> in the <strong>KMS Band Hall</strong>{" "}
            and run through late October. Beginner Band students do not attend
            sectionals in any semester.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {sectionals.map((s) => (
              <div key={s.day} className="bg-primary-tint p-6 rounded-lg">
                <h3 className="font-semibold text-lg text-primary mb-1">{s.day}</h3>
                <p className="text-gray-dark font-medium mb-1">{s.group}</p>
                <p className="text-gray-dark mb-2">{s.instruments}</p>
                <p className="text-gray-dark text-sm">First sectional: {s.first}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-dark mb-3">
            Some weeks are skipped and occasional Friday make-up days are
            added &mdash; the{" "}
            <Link href="/calendar" className="text-primary hover:underline font-medium">
              band calendar
            </Link>{" "}
            is the authoritative schedule, and changes are announced through
            ParentSquare. Spring sectionals begin the week of January 11, 2027.
          </p>
          <p className="text-gray-dark">
            The sectional acknowledgement form confirms you have seen this
            schedule &mdash; find it and its due date on the{" "}
            <Link href="/resources/forms" className="text-primary hover:underline font-medium">
              Forms &amp; Documents page
            </Link>
            .
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Band Class</h2>
          <div className="bg-primary-tint p-6 rounded-lg">
            <p className="text-gray-dark">
              Band meets daily as a regular class period. Placement is set by the campus
              master schedule &mdash; check your student&apos;s schedule in Skyward.
            </p>
          </div>
        </section>

        <section className="text-center bg-primary text-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Performances &amp; Event Dates
          </h2>
          <p className="mb-6">
            Concerts, contests, and trip dates live on the band calendar. Changes are
            announced through ParentSquare.
          </p>
          <Link
            href="/calendar"
            className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 font-semibold transition-colors duration-200"
          >
            View the Calendar
          </Link>
        </section>
      </div>
    </div>
  );
}
