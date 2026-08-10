import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach the KMS Panther Band directors at C.E. King Middle School.",
};

export default function Contact() {
  const directors = [
    { name: "Dr. Bradley Boone", role: "Head Band Director", email: "bradleyboone@sheldonisd.com" },
    { name: "Ms. Catherine Ruiz", role: "Assistant Band Director", email: "catherineruiz@sheldonisd.com" },
    { name: "Mrs. Amanda Chavez", role: "Assistant Band Director", email: "amandachavez@sheldonisd.com" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Contact Us
      </h1>

      <div className="max-w-4xl mx-auto">
        <p className="text-lg text-gray-dark leading-relaxed text-center mb-12">
          The fastest way to reach us is by email. We check messages daily during the
          school week and will get back to you as soon as we can.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Band Directors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {directors.map((d) => (
              <div key={d.email} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-1">{d.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{d.role}</p>
                <a href={`mailto:${d.email}`} className="text-primary hover:underline break-words">
                  {d.email}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Band Office</h2>
          <div className="bg-primary-tint p-6 rounded-lg">
            <p className="text-gray-dark mb-3">
              C.E. King Middle School<br />
              8540 C.E. King Parkway<br />
              Houston, TX 77044
            </p>
            <p className="text-gray-dark mb-3">
              Phone: <a href="tel:+12817273500" className="text-primary hover:underline">(281) 727-3500</a>
            </p>
            <p className="text-gray-dark">
              <strong>Office Hours:</strong> Monday &ndash; Friday, 7:45 AM &ndash; 4:00 PM
            </p>
          </div>
        </section>

        <section className="bg-primary text-secondary p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Weekly Updates</h2>
          <p>
            Announcements and schedule changes go out through ParentSquare. Please make sure
            the band directors have a current parent email address on file.
          </p>
        </section>
      </div>
    </div>
  );
}
