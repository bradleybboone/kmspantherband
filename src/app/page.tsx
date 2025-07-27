import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      {/* Transparent header for homepage */}
      <Header variant="transparent" />
      {/* Hero Section - Rouse Band Style with full-screen background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-image.jpg"
          alt="KMS Panther Band performing"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 text-center px-8">
          <h1 className="hero-title mb-4">
            KMS PANTHER BAND
          </h1>
          <p className="hero-subtitle">
            Excellence From Within
          </p>
        </div>
      </section>


      {/* Quick Links Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-center text-3xl lg:text-4xl mb-12 text-primary">
            QUICK LINKS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <QuickLinkCard
              title="UPCOMING EVENTS"
              description="Stay updated with our concerts, competitions, and performances"
              href="/calendar"
            />
            <QuickLinkCard
              title="BAND HANDBOOK"
              description="Access important information, policies, and resources"
              href="/handbook"
            />
            <QuickLinkCard
              title="INSTRUMENT RENTAL"
              description="Learn about our instrument rental program and forms"
              href="/instrument-rental"
            />
            <QuickLinkCard
              title="CONTACT DIRECTOR"
              description="Get in touch with our band directors and staff"
              href="/contact"
            />
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-center text-3xl lg:text-4xl mb-12 text-primary">
            PANTHER PRIDE
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="relative aspect-square bg-gray-200 overflow-hidden group">
                <Image
                  src={`/images/gallery-${i}.jpg`}
                  alt={`Band photo ${i}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-full-width bg-accent text-white py-16 mb-8">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl mb-6">
            READY TO JOIN THE PANTHER BAND FAMILY?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Whether you&apos;re a beginner or an experienced musician, there&apos;s a place for you in our band.<br /> 
            Join us and be part of something special!
          </p>
          <Link href="/join" className="btn btn-primary">
            LEARN HOW TO JOIN
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
    <Link href={href} className="group block">
      <div className="bg-white shadow-md hover:shadow-xl transition-all duration-300 h-full min-h-[240px] flex flex-col" style={{ padding: '32px' }}>
        <h3 className="text-lg font-display font-medium mb-3 text-primary group-hover:text-primary-hover transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 font-body flex-grow">
          {description}
        </p>
        <p className="text-primary font-medium text-sm uppercase tracking-wide group-hover:text-primary-hover transition-colors">
          Learn more →
        </p>
      </div>
    </Link>
  );
}