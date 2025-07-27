import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <Image
          src="/images/hero-image.jpg"
          alt="KMS Panther Band performing"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="relative z-10 w-full text-secondary px-8 lg:px-16 pb-20">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Welcome to the KMS Panther Band
            </h1>
            <p className="text-lg md:text-xl max-w-3xl">
              We are proud to offer a comprehensive music education program that inspires excellence, 
              builds character, and creates lifelong memories through the power of music.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <h2 className="text-2xl font-bold text-center mb-12 text-primary">
            Quick Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <QuickLinkCard
              title="Upcoming Events"
              description="Stay updated with our concerts, competitions, and performances"
              href="/calendar"
            />
            <QuickLinkCard
              title="Band Handbook"
              description="Access important information, policies, and resources"
              href="/handbook"
            />
            <QuickLinkCard
              title="Instrument Rental"
              description="Learn about our instrument rental program and forms"
              href="/instrument-rental"
            />
            <QuickLinkCard
              title="Contact Director"
              description="Get in touch with our band directors and staff"
              href="/contact"
            />
          </div>
        </div>
      </section>

      {/* Excellence Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <h2 className="text-2xl font-bold mb-8 text-primary text-center">
            Excellence in Music Education
          </h2>
          <p className="text-gray-700 mb-12 max-w-3xl mx-auto text-center">
            The C.E. King Middle School Band program is dedicated to fostering musical excellence and personal growth 
            in every student. Through dedication, practice, and teamwork, our students develop skills that 
            extend far beyond the music classroom.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-2 text-primary">Musical Excellence</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive instruction in woodwind, brass, and percussion instruments with expert guidance from our accomplished directors
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-primary">Teamwork & Leadership</h3>
              <p className="text-gray-600 text-sm">
                Build lasting friendships and develop essential leadership skills through collaborative music-making
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-primary">Performance Opportunities</h3>
              <p className="text-gray-600 text-sm">
                Showcase your talents at concerts, UIL competitions, and community events throughout the year
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-primary text-secondary">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Join the Panther Band Family?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Whether you're a beginner or an experienced musician, there's a place for you in our band. 
            Join us and be part of something special!
          </p>
          <Link
            href="/join"
            className="inline-block bg-secondary text-primary px-8 py-3 font-medium"
          >
            Learn How to Join
          </Link>
        </div>
      </section>
    </>
  );
}

function QuickLinkCard({ title, description, href }: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="block text-center p-4">
      <h3 className="text-lg font-bold mb-2 text-primary">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">
        {description}
      </p>
      <p className="text-primary text-sm mt-2">Learn more ›</p>
    </Link>
  );
}