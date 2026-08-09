import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "That page isn't here — but the band is. Find your way back.",
};

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-dark leading-relaxed mb-4">
          The page you&apos;re looking for isn&apos;t here. It may have moved
          when we rebuilt the site, or the link may be out of date.
        </p>
        <p className="text-lg text-gray-dark leading-relaxed mb-12">
          Here&apos;s where most families are headed:
        </p>
        <nav aria-label="Popular pages" className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            href="/"
            className="inline-block bg-primary hover:bg-primary-hover text-secondary px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/calendar"
            className="inline-block bg-primary hover:bg-primary-hover text-secondary px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Calendar
          </Link>
          <Link
            href="/handbook"
            className="inline-block bg-primary hover:bg-primary-hover text-secondary px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Band Handbook
          </Link>
          <Link
            href="/join"
            className="inline-block bg-primary hover:bg-primary-hover text-secondary px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Join Band
          </Link>
        </nav>
        <p className="text-lg text-gray-dark leading-relaxed">
          Still can&apos;t find it?{" "}
          <Link href="/contact" className="font-semibold underline">
            Contact the directors
          </Link>{" "}
          — we&apos;re happy to help.
        </p>
      </div>
    </div>
  );
}
