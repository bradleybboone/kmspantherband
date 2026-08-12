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

  const formsFolderUrl =
    "https://drive.google.com/drive/folders/1eGPvqrQplxbzMsrZq8kPvzF3KR-GVOTu";

  // PDFs live in the shared Drive folder above. Revise them in place via
  // Drive's "Manage versions" so these file links never change (see runbook).
  const forms: { name: string; due: string; note: string; url?: string }[] = [
    {
      name: "Sectional Acknowledgement",
      due: "August 14, 2026",
      note: "Concert, Symphonic, and Honor Band students only. Confirms you have seen the fall sectional schedule.",
      url: "https://drive.google.com/file/d/1aOOROWTRy4MjpmnSJEdOnYp6qRVFFNiL/view",
    },
    {
      name: "Handbook Acknowledgement",
      due: "August 21, 2026",
      note: "Signed by both student and parent or guardian. Also collects your student's shirt size.",
      url: "https://drive.google.com/file/d/1Tud1IjYZKpy2jZ4o50qIQ8l2wL5ssDx6/view",
    },
    {
      name: "Medical Release",
      due: "August 21, 2026",
      note: "Required before any off-campus performance or trip.",
      url: "https://drive.google.com/file/d/1O2qXPNU_Hd83fCMfXjWGJuFU2YKQJHYY/view",
    },
    {
      name: "Random Drug Test Consent",
      due: "August 21, 2026",
      note: "Concert, Symphonic, and Honor Band (returning) students only.",
      url: "https://drive.google.com/file/d/1eUbIDSLBGDHlyxxc0KiACfuXoelJMhKM/view",
    },
    {
      name: "Activity Fee & Shirt Order",
      due: "September 4, 2026",
      note: "$25 per student, 1st and 2nd year band students only. Pay by Ludus, check to the campus, or cash. No separate form — shirt sizes are collected on the Handbook Acknowledgement.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Forms &amp; Documents
      </h1>

      <div className="max-w-4xl mx-auto">
        <p className="text-lg text-gray-dark leading-relaxed mb-12">
          The forms below link straight to printable PDFs. Print the ones you
          need, or pick up a paper copy from the band hall.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Start-of-Year Forms</h2>
          <div className="space-y-4">
            {forms.map((f) => (
              <div key={f.name} className="bg-primary-tint p-6 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <h3 className="font-semibold text-lg">{f.name}</h3>
                  <p className="text-primary font-medium text-sm">Due {f.due}</p>
                </div>
                <p className="text-gray-dark text-sm">{f.note}</p>
                {f.url && (
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 py-2 text-primary font-semibold hover:underline"
                  >
                    View / print the PDF &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="text-center bg-primary text-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            All Forms in One Place
          </h2>
          <p className="mb-6">
            Browse the shared forms folder, or print any form straight from the
            2026&ndash;2027 band handbook.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={formsFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Open the Forms Folder
            </a>
            <Link
              href="/handbook"
              className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              View the Handbook
            </Link>
            <a
              href={handbookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Open in Google Docs
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}