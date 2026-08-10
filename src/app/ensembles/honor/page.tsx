import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Honor Band",
  description:
    "The KMS Panther Band’s top ensemble, entered by director audition.",
};

export default function HonorBand() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Honor Band
      </h1>

      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <p className="text-lg text-gray-dark leading-relaxed">
            Honor Band is the top ensemble of the KMS Panther Band. Its members
            &mdash; mainly 8th graders, chosen by audition &mdash; play the
            most challenging music in the program, and it represents the
            program at the UIL Concert &amp; Sight-reading Assessment each
            spring.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">At a Glance</h2>
          <div className="bg-primary-tint p-6 rounded-lg">
            <dl className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-semibold sm:w-44 shrink-0">Who it&apos;s for</dt>
                <dd className="text-gray-dark">
                  The program&apos;s most advanced players, mainly 8th graders.
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-semibold sm:w-44 shrink-0">How you join</dt>
                <dd className="text-gray-dark">
                  By audition with the band directors.
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
                  Concerts through the year and the UIL Concert &amp;
                  Sight-reading Assessment in the spring.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Earned and Kept
          </h2>
          <p className="text-gray-dark leading-relaxed">
            A seat in Honor Band is earned at auditions and kept through the
            year. Members are expected to stay on top of the ensemble&apos;s
            requirements &mdash; attendance, preparation, and consistent home
            practice &mdash; and a student who falls behind them can be moved
            to another ensemble. It&apos;s a real commitment, and the students
            who make it find it&apos;s worth every minute.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            The Pathway
          </h2>
          <p className="text-gray-dark leading-relaxed">
            Honor Band members come up through{" "}
            <Link href="/ensembles/concert" className="text-primary hover:underline font-medium">
              Concert Band
            </Link>{" "}
            and{" "}
            <Link href="/ensembles/symphonic" className="text-primary hover:underline font-medium">
              Symphonic Band
            </Link>
            . New to the program? Start with{" "}
            <Link href="/ensembles/beginner" className="text-primary hover:underline font-medium">
              Beginner Band
            </Link>
            .
          </p>
        </section>

        <section className="text-center bg-primary text-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Aiming for Honor Band?</h2>
          <p className="mb-6">
            Talk to a director about auditions &mdash; they&apos;ll tell you
            what to prepare and how to get there.
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
