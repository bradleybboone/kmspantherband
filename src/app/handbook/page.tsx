import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Band Handbook",
  description:
    "The KMS Panther Band handbook, with a quick reference for grading, attire, and expectations.",
};
export default function Handbook() {
  const handbookUrl = "https://docs.google.com/document/d/1una3PXJwVNUcgznEZXNXnNqMYKTe4eacf_3yeU0BwHA/edit?usp=sharing";
  const handbookEmbedUrl = "https://docs.google.com/document/d/1una3PXJwVNUcgznEZXNXnNqMYKTe4eacf_3yeU0BwHA/preview";

  return (
    <div className="min-h-screen bg-primary-canvas">
      {/* Page content */}
      <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Band Handbook
      </h1>
      
      <div className="max-w-6xl mx-auto">
        <section className="mb-12">
          <p className="text-lg text-gray-dark leading-relaxed mb-8">
            The C.E. King Middle School Band Handbook contains important information about our program, 
            including policies, procedures, expectations, and resources for students and parents.
          </p>
          
          <div className="bg-primary text-secondary p-8 rounded-lg text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">View or Download Band Handbook</h2>
            <p className="mb-6">
              View the handbook below or open in Google Docs to download in your preferred format (PDF, Word, etc.)
            </p>
            <div className="mb-4">
              <a 
                href={handbookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 font-semibold transition-colors duration-200"
              >
                Open in Google Docs
              </a>
            </div>
          </div>

          {/* Embedded Google Doc Viewer */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
            <iframe
              src={handbookEmbedUrl}
              className="w-full iframe-fluid-tall"
              loading="lazy"
              title="C.E. King Middle School Band Handbook"
            >
              Loading handbook...
            </iframe>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Quick Reference</h2>
          
          <div className="space-y-6">
            <div className="bg-primary-tint p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Grading</h3>
              <ul className="space-y-2 text-gray-dark">
                <li>• 50% Major Grades &mdash; playing tests and performances</li>
                <li>• 50% Daily Grades &mdash; participation and quizzes</li>
              </ul>
              <p className="text-gray-dark mt-3">
                Daily practice at home is still expected of every student, but practice
                cards are no longer used and are not turned in for a grade.
              </p>
            </div>

            <div className="bg-primary-tint p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Fees</h3>
              <ul className="space-y-2 text-gray-dark">
                <li>• <strong>$25/year</strong> band activity fee &mdash; all students</li>
                <li>• <strong>$100/year</strong> school-owned instrument usage fee</li>
                <li>• <strong>$100/year</strong> percussion usage fee, starting Year 2</li>
              </ul>
              <p className="text-gray-dark mt-3">
                Pay by Ludus (credit/debit), check made out to the campus, or cash.
                Partial payments are accepted for cash and check.
              </p>
            </div>

            <div className="bg-primary-tint p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Concert Attire</h3>
              <p className="text-gray-dark mb-2"><strong>Beginners:</strong></p>
              <ul className="space-y-1 text-gray-dark mb-4">
                <li>• Blue band performance T-shirt, tucked in</li>
                <li>• Black dress pants and black belt</li>
                <li>• Black long dress socks and black dress shoes</li>
              </ul>
              <p className="text-gray-dark mb-2"><strong>Returning students:</strong></p>
              <ul className="space-y-1 text-gray-dark mb-4">
                <li>• Blue performance polo</li>
                <li>• Black dress pants, black dress shoes and socks</li>
              </ul>
              <p className="text-gray-dark">
                <strong>Not permitted:</strong> jeans, sneakers, Converse, or Crocs.
              </p>
            </div>

            <div className="bg-primary-tint p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Key Dates</h3>
              {/*
                Event dates only. Form and fee due dates live on
                /resources/forms (single source of truth — see the Important
                Forms section below), so they are not repeated here.
              */}
              <ul className="space-y-2 text-gray-dark">
                <li>• <strong>Aug 17</strong> &mdash; Fall sectionals begin (Mon&ndash;Thu, 4:00&ndash;5:00 PM)</li>
                <li>• <strong>Sept 28</strong> &mdash; Sheldon ISD District Honor Band</li>
                <li>• <strong>Oct 31</strong> &mdash; Region 33 All-Region Auditions</li>
                <li>• <strong>March 2027</strong> &mdash; UIL Concert &amp; Sightreading Assessment</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-primary">Important Forms</h2>
          
          {/*
            Single source of truth: /resources/forms. This section used to list
            its own set of forms, which named only three, invented two that
            appear nowhere else on the site, and called the medical release a
            "Medical Information Form" 15 lines below Key Dates calling it a
            medical release. Link out rather than maintain a second list that
            can drift from the handbook again.
          */}
          <div className="bg-primary-tint p-6 rounded-lg">
            <p className="text-gray-dark mb-4">
              Every start-of-year form and its due date is listed on the Forms &amp;
              Documents page. The forms themselves are printable from the handbook above.
            </p>
            <Link
              href="/resources/forms"
              className="inline-block bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              See Forms &amp; Due Dates
            </Link>
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}