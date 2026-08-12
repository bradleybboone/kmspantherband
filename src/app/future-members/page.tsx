import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Future Panthers",
  description:
    "Thinking about band? No experience necessary and no student turned away over cost — what incoming students and families need to know.",
};

export default function FutureMembers() {
  const schoolOwned = ["Oboe", "Bassoon", "Alto Saxophone", "French Horn", "Euphonium", "Tuba"];
  const parentProvided = ["Flute", "Clarinet", "Trumpet", "Trombone", "Percussion"];

  const faqs: { q: string; a: React.ReactNode }[] = [
    {
      q: "Does my child need musical experience?",
      a: "No. Most of our beginners have never played an instrument before. We teach everything from the first note.",
    },
    {
      q: "Can they do band and a sport?",
      a: "Yes, and most do. A large share of our 7th and 8th graders play volleyball, football, basketball, or run track while staying in band. We build the sectional schedule expecting it.",
    },
    {
      q: "How do they choose an instrument?",
      a: "Every student tries several instruments and gets a score for each. We match their results, their preference, and the balance the band needs.",
    },
    {
      q: "What is the time commitment?",
      a: (
        <>
          Band meets daily as a regular class. Beginners have no after-school
          rehearsals. From the second year on, students attend{" "}
          <Link href="/schedule" className="text-primary hover:underline font-medium">
            one after-school sectional per week
          </Link>{" "}
          for their instrument (Monday&ndash;Thursday, 4:00&ndash;5:00 PM).
        </>
      ),
    },
    {
      q: "What if we cannot afford an instrument or the fees?",
      a: "Talk to us. Partial payments are accepted for cash and check, and we will work with you. No student is turned away from band over cost.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Future Panthers
      </h1>

      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <p className="text-lg text-gray-dark leading-relaxed">
            The Panther Band is one of the largest and most successful groups at C.E. King
            Middle School &mdash; over 250 students strong. If your student is coming to KMS
            next year, we would love to have them. No experience necessary.
          </p>
        </section>

        {/* Instrument Drive — the single most time-sensitive item on this page */}
        <section className="mb-12">
          <div className="bg-primary text-secondary p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Instrument Drive &mdash; Friday, August 21, 2026
            </h2>
            <p className="mb-3">
              <strong>5:00&ndash;8:00 PM &middot; Null Middle School cafeteria</strong>
            </p>
            <p className="mb-3">
              Please note the location: this event is at <strong>Null Middle School</strong>,
              not C.E. King.
            </p>
            <p>
              All three recommended vendors will be there with rental and purchase options,
              plus the required accessories. This is the easiest way to walk out with
              everything your student needs for the first day.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Choosing an Instrument</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary-tint p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-primary">Provided by the School</h3>
              <p className="text-gray-dark text-sm mb-3">
                No rental needed. A <strong>$100/year</strong> usage fee applies, and you buy
                only the accessories.
              </p>
              <ul className="text-gray-dark space-y-1">
                {schoolOwned.map((i) => (
                  <li key={i}>&bull; {i}</li>
                ))}
              </ul>
              <p className="text-gray-dark text-sm mt-3">
                Percussion becomes a $100/year school-owned instrument starting in Year 2.
              </p>
            </div>
            <div className="bg-primary-tint p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-primary">Provided by the Family</h3>
              <p className="text-gray-dark text-sm mb-3">
                Rent or purchase from a recommended vendor. Rental runs about
                <strong> $30&ndash;$50/month</strong>.
              </p>
              <ul className="text-gray-dark space-y-1">
                {parentProvided.map((i) => (
                  <li key={i}>&bull; {i}</li>
                ))}
              </ul>
              <p className="text-gray-dark text-sm mt-3">
                All three vendors visit our campus weekly, so repairs do not mean a drive
                across town.
              </p>
            </div>
          </div>
          <div className="text-center mt-6 flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center">
            <Link href="/instrument-rental" className="text-primary hover:underline font-medium">
              See recommended music stores and rental details &rarr;
            </Link>
            <Link href="/supply-list" className="text-primary hover:underline font-medium">
              See the full supply list per instrument &rarr;
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">What It Costs</h2>
          <div className="bg-primary-tint p-6 rounded-lg">
            <ul className="space-y-2 text-gray-dark mb-4">
              <li>• <strong>$25/year</strong> band activity fee &mdash; every student</li>
              <li>• <strong>$100/year</strong> school-owned instrument usage fee, if applicable</li>
              <li>• <strong>$30&ndash;$50/month</strong> if you rent from a vendor</li>
            </ul>
            <p className="text-gray-dark mb-3">
              The activity fee covers the band T-shirt, a 1&quot; black binder, a pencil pouch,
              an instrument case tag, and the class method book.
            </p>
            <p className="text-gray-dark">
              Pay by Ludus (credit/debit), check made out to the campus, or cash. Partial
              payments are accepted for cash and check.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="bg-primary-tint p-6 rounded-lg">
                <h3 className="font-semibold mb-2">{f.q}</h3>
                <p className="text-gray-dark">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center bg-primary text-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Still Have Questions?</h2>
          <p className="mb-6">
            Call the band office at{" "}
            <a href="tel:+12817273500" className="text-white underline hover:no-underline">(281) 727-3500</a>{" "}
            or email a director &mdash; we are happy to talk it through.
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
