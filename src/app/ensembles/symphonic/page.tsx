import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Symphonic Band",
  description:
    "A UIL-competing ensemble for skilled players, entered by director audition.",
};

export default function SymphonicBand() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Symphonic Band
      </h1>

      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <p className="text-lg text-gray-dark leading-relaxed">
            Symphonic Band is an audition ensemble for skilled players &mdash;
            mostly 7th and 8th graders who have shown they&apos;re ready for
            more challenging music. The band performs throughout the year and
            competes at the UIL Concert &amp; Sight-reading Assessment in the
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
                  Skilled players, mainly 7th and 8th graders.
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
            What to Expect
          </h2>
          <p className="text-gray-dark leading-relaxed">
            Symphonic players take on harder literature and a faster pace than
            Concert Band, and the daily habits matter more: consistent home
            practice, prepared sectionals, and pulling your weight in the
            section. It&apos;s a real step up &mdash; and it&apos;s where
            students discover how good they can get. See the{" "}
            <Link href="/schedule" className="text-primary hover:underline font-medium">
              rehearsal schedule
            </Link>{" "}
            for how the week works.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            The Pathway
          </h2>
          <p className="text-gray-dark leading-relaxed">
            Most Symphonic players come up from{" "}
            <Link href="/ensembles/concert" className="text-primary hover:underline font-medium">
              Concert Band
            </Link>
            , and the strongest may audition into{" "}
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
          <h2 className="text-2xl font-semibold mb-4">Interested in Auditioning?</h2>
          <p className="mb-6">
            Talk to a director &mdash; they&apos;ll tell you what the audition
            covers and help you get ready for it.
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
