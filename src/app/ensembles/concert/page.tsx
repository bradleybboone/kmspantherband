import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Concert Band",
  description:
    "The next step after Beginner Band — a performing and competing concert ensemble of the KMS Panther Band.",
};

export default function ConcertBand() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Concert Band
      </h1>

      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <p className="text-lg text-gray-dark leading-relaxed">
            Concert Band is the next step after the beginner year: a full
            concert ensemble that performs throughout the year and competes at
            either the King Music Festival or UIL Concert &amp; Sight-reading Assessment
            in the spring. Students keep building on their fundamentals while
            learning what it means to play as a section and as a band.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">At a Glance</h2>
          <div className="bg-primary-tint p-6 rounded-lg">
            <dl className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-semibold sm:w-44 shrink-0">Who it&apos;s for</dt>
                <dd className="text-gray-dark">
                  Returning band students, mostly 7th and 8th graders.
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-semibold sm:w-44 shrink-0">How you join</dt>
                <dd className="text-gray-dark">
                  Placement is set by the band directors after the beginner
                  year.
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-semibold sm:w-44 shrink-0">The class</dt>
                <dd className="text-gray-dark">
                  Band meets daily as a regular class, plus one after-school
                  sectional per week for each instrument.
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-semibold sm:w-44 shrink-0">Home practice</dt>
                <dd className="text-gray-dark">About 30 minutes a day.</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-semibold sm:w-44 shrink-0">Performances</dt>
                <dd className="text-gray-dark">
                  Concerts through the year and the King Music Festival or
                  UIL Concert &amp; Sight-reading Assessment in the spring.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Band and Sports Fit Together
          </h2>
          <p className="text-gray-dark leading-relaxed">
            A large share of our 7th and 8th graders play volleyball, football,
            basketball, or run track while staying in band. We build the
            sectional schedule expecting it &mdash; see the{" "}
            <Link href="/schedule" className="text-primary hover:underline font-medium">
              rehearsal schedule
            </Link>{" "}
            for how the week works.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Moving Up
          </h2>
          <p className="text-gray-dark leading-relaxed">
            Students who are ready for more can audition with the directors for{" "}
            <Link href="/ensembles/symphonic" className="text-primary hover:underline font-medium">
              Symphonic Band
            </Link>{" "}
            or{" "}
            <Link href="/ensembles/honor" className="text-primary hover:underline font-medium">
              Honor Band
            </Link>
            . New to the program? Start with{" "}
            <Link href="/ensembles/beginner" className="text-primary hover:underline font-medium">
              Beginner Band
            </Link>
            .
          </p>
        </section>

        <section className="text-center bg-primary text-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Questions About Placement?</h2>
          <p className="mb-6">
            The directors are happy to talk through where your student fits and
            what the year will look like.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Contact the Directors
          </Link>
        </section>
      </div>
    </div>
  );
}
