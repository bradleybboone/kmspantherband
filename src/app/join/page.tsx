import Link from "next/link";

export default function Join() {
  return (
    <div className="max-w-7xl mx-auto px-8 lg:px-16 py-20">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Join the KMS Panther Band
      </h1>

      <div className="max-w-4xl mx-auto">
        {/* Introduction */}
        <section className="mb-12">
          <p className="text-lg text-gray-dark leading-relaxed">
            We're thrilled that you're interested in joining the KMS Panther Band! Whether you're 
            a complete beginner or have previous musical experience, there's a place for you in 
            our program. Band is an exciting journey that will challenge you, help you make new 
            friends, and create memories that will last a lifetime.
          </p>
        </section>

        {/* Who Can Join */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Who Can Join?</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            <ul className="space-y-3 text-gray-dark">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>All KMS students in grades 6-8 are eligible to join</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>No previous musical experience required for 6th grade beginners</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Students with experience can join at any grade level</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Commitment to attend all rehearsals and performances</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Instruments Available */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Instruments We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2 text-primary">Woodwinds</h3>
              <ul className="text-gray-dark text-sm space-y-1">
                <li>Flute</li>
                <li>Clarinet</li>
                <li>Alto Saxophone</li>
                <li>Tenor Saxophone</li>
                <li>Oboe (advanced)</li>
                <li>Bassoon (advanced)</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2 text-primary">Brass</h3>
              <ul className="text-gray-dark text-sm space-y-1">
                <li>Trumpet</li>
                <li>French Horn</li>
                <li>Trombone</li>
                <li>Baritone/Euphonium</li>
                <li>Tuba</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2 text-primary">Percussion</h3>
              <ul className="text-gray-dark text-sm space-y-1">
                <li>Snare Drum</li>
                <li>Bass Drum</li>
                <li>Timpani</li>
                <li>Mallet Instruments</li>
                <li>Auxiliary Percussion</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How to Join */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">How to Join</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary text-secondary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                1
              </div>
              <div className="ml-4">
                <h3 className="font-semibold mb-1">Contact the Band Directors</h3>
                <p className="text-gray-dark">
                  Reach out to Mr. Boone or Ms. Ruiz to express your interest and schedule a meeting.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary text-secondary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                2
              </div>
              <div className="ml-4">
                <h3 className="font-semibold mb-1">Attend an Instrument Fitting</h3>
                <p className="text-gray-dark">
                  We'll help you find the instrument that's the best fit for you based on your 
                  interests and physical characteristics.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary text-secondary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                3
              </div>
              <div className="ml-4">
                <h3 className="font-semibold mb-1">Complete Registration</h3>
                <p className="text-gray-dark">
                  Fill out the band registration form and return it with any required fees.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary text-secondary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                4
              </div>
              <div className="ml-4">
                <h3 className="font-semibold mb-1">Get Your Instrument</h3>
                <p className="text-gray-dark">
                  Rent or purchase your instrument. We have rental programs available for families.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary text-secondary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                5
              </div>
              <div className="ml-4">
                <h3 className="font-semibold mb-1">Start Making Music!</h3>
                <p className="text-gray-dark">
                  Join us for rehearsals and begin your musical journey with the Panther Band family.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">What to Expect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Daily Band Class</h3>
              <p className="text-gray-dark">
                Band meets every day during the regular school schedule. You'll learn 
                fundamentals, practice ensemble playing, and prepare for performances.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">After-School Rehearsals</h3>
              <p className="text-gray-dark">
                Occasional after-school rehearsals before major performances. Schedule 
                provided well in advance.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Performances</h3>
              <p className="text-gray-dark">
                Multiple concerts throughout the year including Winter Concert, Spring 
                Concert, and festival performances.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Practice Expectations</h3>
              <p className="text-gray-dark">
                Regular home practice is essential. Beginners start with 15-20 minutes 
                daily, advancing to 30+ minutes.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-primary text-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Ready to Start Your Musical Journey?</h2>
          <p className="mb-6">
            Contact us today to learn more about joining the KMS Panther Band!
          </p>
          <Link
            href="/contact"
            className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
}