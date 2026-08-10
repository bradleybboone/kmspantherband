import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Beginner Band",
  description:
    "Where every Panther starts — no experience necessary, classes grouped by instrument.",
};

export default function BeginnerBand() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Beginner Band
      </h1>

      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <p className="text-lg text-gray-dark leading-relaxed">
            Beginner Band is where every Panther starts. No experience is
            necessary &mdash; most of our beginners have never played a note
            before the first day of class, and we teach everything from how to
            put the instrument together to performing on stage.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">At a Glance</h2>
          <div className="bg-primary-tint p-6 rounded-lg">
            <dl className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-semibold sm:w-44 shrink-0">Who it&apos;s for</dt>
                <dd className="text-gray-dark">
                  First-year band students &mdash; mostly incoming 6th graders.
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-semibold sm:w-44 shrink-0">How you join</dt>
                <dd className="text-gray-dark">
                  Every student tries several instruments and gets a score for
                  each. We match their results, their preference, and the
                  balance the band needs.
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-semibold sm:w-44 shrink-0">The class</dt>
                <dd className="text-gray-dark">
                  Band meets daily as a regular class, and beginner classes are
                  grouped by instrument &mdash; everyone in the room is learning
                  the same one.
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-semibold sm:w-44 shrink-0">Home practice</dt>
                <dd className="text-gray-dark">About 20 minutes a day.</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-semibold sm:w-44 shrink-0">Performances</dt>
                <dd className="text-gray-dark">
                  Concerts through the year for family and friends.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            What the Year Looks Like
          </h2>
          <p className="text-gray-dark leading-relaxed mb-4">
            Beginners spend the fall on fundamentals: making a good first sound,
            reading music, and playing together as a class. By the winter and
            spring concerts, students are performing real band music on stage.
            Everything happens during the school day &mdash; beginners have no
            after-school rehearsals.
          </p>
          <p className="text-gray-dark leading-relaxed">
            Worried about cost or getting an instrument? Don&apos;t be &mdash;
            no student is turned away from band over cost. The{" "}
            <Link href="/future-members" className="text-primary hover:underline font-medium">
              Future Panthers page
            </Link>{" "}
            walks through instruments, fees, and payment options, and the{" "}
            <Link href="/supply-list" className="text-primary hover:underline font-medium">
              supply list
            </Link>{" "}
            shows exactly what to buy for each instrument.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            After Beginner Band
          </h2>
          <p className="text-gray-dark leading-relaxed">
            After the beginner year, students move into one of our three
            competing ensembles &mdash;{" "}
            <Link href="/ensembles/concert" className="text-primary hover:underline font-medium">
              Concert Band
            </Link>
            ,{" "}
            <Link href="/ensembles/symphonic" className="text-primary hover:underline font-medium">
              Symphonic Band
            </Link>
            , or{" "}
            <Link href="/ensembles/honor" className="text-primary hover:underline font-medium">
              Honor Band
            </Link>{" "}
            &mdash; and keep growing from there.
          </p>
        </section>

        <section className="text-center bg-primary text-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Ready to Start?</h2>
          <p className="mb-6">
            The Future Panthers page has everything an incoming family needs
            &mdash; and the directors are happy to answer anything it doesn&apos;t.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/future-members"
              className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Future Panthers
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Contact the Directors
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
