import Image from "next/image";
import Link from "next/link";
import ImageCarousel from "@/components/ImageCarousel";

export default function Home() {
  return (
    <>
      {/* Hero Section - Rouse Band Style with full-screen background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/*
          The entrance classes (hero-enter-*) are the site's one authored
          motion moment — see globals.css. The overlay stays static so white
          text never sits on unoverlaid photography mid-animation.
        */}
        <Image
          src="/images/hero-image.jpg"
          alt="KMS Panther Band performing"
          fill
          className="object-cover hero-enter-media"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-8">
          <h1 className="hero-title hero-enter-title mb-4">
            KMS PANTHER BAND
          </h1>
          <p className="hero-subtitle hero-enter-subtitle">
            Excellence From Within
          </p>
        </div>
      </section>


      {/* Quick Links Section */}
      <section className="py-20 bg-primary-canvas">
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
          <ImageCarousel
            images={[
              { src: "/images/landing1.jpg", alt: "Band students in blue Panther Band polos sharing a treat by the flower beds on the amusement park trip" },
              { src: "/images/landing2.jpg", alt: "The full band in matching green trip shirts posing in front of the carousel at Six Flags Over Texas" },
              { src: "/images/landing3.jpg", alt: "Eight band students posing with the giant KING letters outside C.E. King Middle School" },
              { src: "/images/landing4.jpg", alt: "Students in Panther Band polos huddled around a director for a talk before a performance" },
              { src: "/images/landing5.jpg", alt: "The band performing on a concert stage under blue lights as the director conducts" },
              { src: "/images/landing6.jpg", alt: "Three band students smiling arm in arm in front of an arcade claw machine" },
              { src: "/images/landing7.jpg", alt: "Band members playing in the stadium stands at an evening football game" },
              { src: "/images/landing8.jpg", alt: "Families in a full auditorium watching the band perform in matching blue shirts" },
              { src: "/images/landing9.jpg", alt: "Band students crowded together for a group photo, the front row holding up a plaque after a UIL performance" }
            ]}
          />
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
          {/*
            On the black band a navy-filled button is invisible (~1.5:1 edge
            contrast) -- use the documented on-dark outline variant instead.
          */}
          <Link href="/future-members" className="btn btn-outline">
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
      <div className="bg-white p-8 shadow-md hover:shadow-xl motion-safe:hover:-translate-y-0.5 transition-[box-shadow,transform] duration-300 h-full min-h-[240px] flex flex-col">
        <h3 className="text-lg font-display font-medium mb-3 text-primary group-hover:text-primary-hover transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-dark mb-4 font-body flex-grow">
          {description}
        </p>
        <p className="text-primary font-medium text-sm uppercase tracking-wide group-hover:text-primary-hover transition-colors">
          Learn more →
        </p>
      </div>
    </Link>
  );
}