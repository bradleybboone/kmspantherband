import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rehearsal Schedule",
  description:
    "Daily band class and after-school sectional times for the KMS Panther Band.",
};

export default function Schedule() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Rehearsal Schedule
      </h1>

      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Fall Sectionals</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-gray-dark mb-3">
              Sectionals run <strong>Monday through Thursday, 4:00&ndash;5:00 PM</strong>,
              beginning <strong>August 17, 2026</strong>.
            </p>
            <p className="text-gray-dark">
              Your student&apos;s assigned sectional day depends on their instrument. The
              sectional acknowledgement form is due <strong>August 14</strong>.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Band Class</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-gray-dark">
              Band meets daily as a regular class period. Placement is set by the campus
              master schedule &mdash; check your student&apos;s schedule in Skyward.
            </p>
          </div>
        </section>

        <section className="text-center bg-primary text-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white !text-white">
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
