import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the KMS Panther Band and its directors — a cornerstone of the community’s instrumental music education for more than two decades.",
};

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        {/*
          Navy into deeper navy, never into white: the old `to-white` gradient
          put the white hero text on mid-tones that fail 4.5:1 (Overlay Rule).
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary-active" />
        <div className="relative z-10 text-center px-8">
          <h1 className="hero-title mb-4">
            ABOUT US
          </h1>
          <p className="hero-subtitle">
            Excellence in Music Education
          </p>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
      {/* Program Overview */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="prose prose-lg mx-auto text-gray-dark">
          <p className="text-lg leading-relaxed mb-6">
            The KMS Panther Band program has been a cornerstone of instrumental music education in our
            community for over two decades. We believe every student has the potential to excel in
            music &mdash; over 250 students strong, band is one of the largest and most successful
            groups at C.E. King Middle School.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Students perform in concerts through the year and compete at the UIL Concert &amp;
            Sight-reading Assessment each spring. They also help run the band themselves &mdash;
            section leaders, setup crew, and load crew are student jobs.
          </p>
        </div>
      </section>

      {/* Directors Section */}
      <section id="directors" className="mb-16">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          Meet Our Directors
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Director 1 - Boone */}
          <div className="bg-white overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src="/images/boone-bio.jpg"
                alt="Dr. Bradley Boone - Head Band Director"
                fill
                className="object-contain"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Dr. Bradley Boone</h3>
              <p className="text-primary font-medium mb-3">Head Band Director</p>
              <p className="text-gray-dark mb-3">
                This is Dr. Boone&apos;s fifth year at C.E. King Middle School. He holds a Bachelor
                of Music Education from Stetson University in Deland, Florida, as well as Master
                of Music and Doctor of Musical Arts degrees from Louisiana State University. He is
                a euphonium and trombone player.
              </p>
              <p className="text-gray-dark mb-3">
                Prior to joining the KMS Band, Dr. Boone taught at Bondy Intermediate and Shaw 
                Middle School in Pasadena ISD. Dr. Boone is also a veteran of the U.S. Army where 
                he served as a musician for nine years and traveled to over 25 countries.
              </p>
              <p className="text-gray-dark mb-3">
                His wife is a trumpet player and is the head band director at C.E. King High School.
              </p>
              <p className="text-gray-dark mb-3">
                Dr. Boone loves composing and arranging music, playing chess, movies, and reading.
              </p>
              <p className="text-gray-dark">
                <strong>Email:</strong> <a href="mailto:bradleyboone@sheldonisd.com" className="text-primary hover:underline">bradleyboone@sheldonisd.com</a>
              </p>
            </div>
          </div>

          {/* Director 2 - Ruiz */}
          <div className="bg-white overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src="/images/ruiz-bio.jpg"
                alt="Assistant Band Director"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Ms. Catherine Ruiz</h3>
              <p className="text-primary font-medium mb-3">Assistant Band Director</p>
              <p className="text-gray-dark mb-3">
                My name is Catherine Ruiz and I am so glad to be back with the team at C.E. King
                Middle School! I received my Music Education degree from Sam Houston State
                University in 2020 and started my career on staff at MacArthur High School
                in Aldine ISD.
              </p>
              <p className="text-gray-dark mb-3">
                This is going to be my 5th year of teaching in the Houston area and I am so 
                grateful for the privilege of getting to share my passion for music with my 
                students. Whenever I am not teaching, I enjoy staying active and exploring 
                what Houston has to offer.
              </p>
              <p className="text-gray-dark mb-3">
                I look forward to creating a vibrant and inspiring environment for our talented 
                students at C.E. King Middle School!
              </p>
              <p className="text-gray-dark">
                <strong>Email:</strong> <a href="mailto:catherineruiz@sheldonisd.com" className="text-primary hover:underline">catherineruiz@sheldonisd.com</a>
              </p>
            </div>
          </div>

          {/* Director 3 - Chavez */}
          <div className="bg-white overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src="/images/chavez-bio.jpg"
                alt="Mrs. Amanda Chavez - Assistant Band Director"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Mrs. Amanda Chavez</h3>
              <p className="text-primary font-medium mb-3">Assistant Band Director</p>
              <p className="text-gray-dark mb-3">
                B.M. and M.M. &ndash; Stephen F. Austin State University
              </p>
              <p className="text-gray-dark mb-3">
                Mrs. Chavez will be joining the KMS team all the way from Lubbock ISD, where
                she spent her first two years teaching at Atkins Middle School. She holds a
                bachelor&apos;s and master&apos;s degree from Stephen F. Austin State University
                (Go Jacks!) and is a clarinet player by trade.
              </p>
              <p className="text-gray-dark mb-3">
                Mrs. Chavez loves spending her time outside of school with her husband, Esteban,
                and their baby girl, Alondra. She loves playing board games, going on walks, and
                cooking. She also has two cats, Pepper and Sugar, who love to be lazy, snuggle
                and get into general cat trouble.
              </p>
              <p className="text-gray-dark">
                <strong>Email:</strong> <a href="mailto:amandachavez@sheldonisd.com" className="text-primary hover:underline">amandachavez@sheldonisd.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
    </>
  );
}