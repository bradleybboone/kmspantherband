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
            <div className="bg-primary-tint p-12 rounded-lg text-center">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Coming Soon!</h2>
              <p className="text-lg text-gray-dark mb-6">
                We&apos;re currently updating information about our Beginner Band program. 
                Please check back soon for details about this ensemble.
              </p>
              <p className="text-gray-dark mb-8">
                In the meantime, feel free to contact our band directors for more information.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </section>
          
          <section className="text-center">
            <Link
              href="/"
              className="text-primary hover:text-primary-hover underline"
            >
              ← Back to Home
            </Link>
          </section>
        </div>
      </div>
  );
}