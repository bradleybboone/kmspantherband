import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forms & Documents",
  description:
    "Current KMS Panther Band forms and documents, all in one place.",
};

export default function FormsDocuments() {
  const handbookUrl =
    "https://docs.google.com/document/d/1una3PXJwVNUcgznEZXNXnNqMYKTe4eacf_3yeU0BwHA/edit?usp=sharing";

  const forms = [
    {
      name: "Sectional Acknowledgement",
      due: "August 14, 2026",
      note: "Confirms you have seen the fall sectional schedule.",
    },
    {
      name: "Handbook Acknowledgement",
      due: "August 21, 2026",
      note: "Signed by both student and parent or guardian.",
    },
    {
      name: "Medical Release",
      due: "August 21, 2026",
      note: "Required before any off-campus performance or trip.",
    },
    {
      name: "Random Drug Test Consent",
      due: "August 21, 2026",
      note: "Required for all extracurricular participants.",
    },
    {
      name: "Activity Fee & Shirt Order",
      due: "September 4, 2026",
      note: "$25 per student. Pay by Ludus, check to the campus, or cash.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Forms &amp; Documents
      </h1>

      <div className="max-w-4xl mx-auto">
        <p className="text-lg text-gray-dark leading-relaxed mb-12">
          All forms below are included in the band handbook. Print the pages you need,
          or pick up a paper copy from the band hall.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Start-of-Year Forms</h2>
          <div className="space-y-4">
            {forms.map((f) => (
              <div key={f.name} className="bg-white p-6 rounded-lg shadow">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <h3 className="font-semibold text-lg">{f.name}</h3>
                  <p className="text-primary font-medium text-sm">Due {f.due}</p>
                </div>
                <p className="text-gray-dark text-sm">{f.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center bg-primary text-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Find the Forms in the Handbook
          </h2>
          <p className="mb-6">
            Every form above is printable from the 2026&ndash;2027 band handbook.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/handbook"
              className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 font-semibold transition-colors duration-200"
            >
              View the Handbook
            </Link>
            <a
              href={handbookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 font-semibold transition-colors duration-200"
            >
              Open in Google Docs
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}