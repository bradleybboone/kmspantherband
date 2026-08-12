import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Instrument Rental",
  description:
    "School-owned and parent-provided instruments, recommended vendors, and what it costs — no student is turned away over cost.",
};

export default function InstrumentRental() {
  return (
    <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
          Instrument Rental Program
        </h1>
      
      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <p className="text-lg text-gray-dark leading-relaxed text-center">
            Every student gets a quality instrument: some come from the school, and the rest
            rent from one of our three recommended music stores. No student is turned away
            from band over cost.
          </p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary text-center">Rental Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary-tint p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">School-Owned Instruments</h3>
              <p className="text-gray-dark mb-4">
                Oboe, bassoon, alto saxophone, French horn, euphonium, and tuba are
                provided by the school &mdash; no rental needed.
              </p>
              <ul className="space-y-2 text-gray-dark">
                <li>• $100/year usage fee</li>
                <li>• Percussion: $100/year starting Year 2</li>
                <li>
                  • You purchase accessories only &mdash; see the{" "}
                  <Link href="/supply-list" className="text-primary hover:underline font-medium">
                    supply list
                  </Link>
                </li>
                <li>• Distributed on campus at the start of the year</li>
              </ul>
            </div>
            
            <div className="bg-primary-tint p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Music Store Partners</h3>
              <p className="text-gray-dark mb-4">
                Rent from our recommended local music stores.
              </p>
              <ul className="space-y-2 text-gray-dark">
                <li>• Monthly payment plans</li>
                <li>• Rent-to-own options</li>
                <li>• Insurance available</li>
                <li>• New and used instruments</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary text-center">Recommended Music Stores</h2>
          
                      <div className="space-y-6">
            <div className="bg-primary-tint p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Brook Mays (H & H Music Company)</h3>
              <p className="text-gray-dark mb-1">Store #28 - North Houston - 1960</p>
              <p className="text-gray-dark mb-1">713 Cypress Creek Pkwy, Houston, TX 77090</p>
              <p className="text-gray-dark text-sm mb-1">(Formerly FM 1960 West)</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <p className="text-gray-dark">Phone: <a href="tel:+12815808000" className="text-primary hover:underline">(281) 580-8000</a></p>
                <span className="hidden sm:inline text-gray-light">|</span>
                <p className="text-gray-dark">Fax: (281) 580-5151</p>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-light">
                <p className="text-sm font-medium text-gray-dark mb-1">Hours:</p>
                <p className="text-sm text-gray-dark">Monday - Friday: 10 AM - 6 PM</p>
                <p className="text-sm text-gray-dark">Saturday: 10 AM - 4 PM</p>
              </div>
              <p className="text-sm text-gray-dark mt-2">Available Repair Services: Brass, Woodwind</p>
              <div className="mt-4">
                <a 
                  href="https://rental.brookmays.com/rental_Choose_Instrument.aspx?schoolid=53674" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center sm:inline-block sm:w-auto bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors duration-200"
                >
                  Rent Online for KMS Band
                </a>
              </div>
            </div>
            <div className="bg-primary-tint p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Music & Arts</h3>
              <p className="text-gray-dark mb-1">Humble, TX</p>
              <p className="text-gray-dark mb-1">234 FM 1960 Bypass Rd E, Humble, TX 77338</p>
              <p className="text-gray-dark mb-2">Phone: <a href="tel:+12815407260" className="text-primary hover:underline">(281) 540-7260</a></p>
              <div className="mt-2 pt-2 border-t border-gray-light">
                <p className="text-sm font-medium text-gray-dark mb-1">Hours:</p>
                <p className="text-sm text-gray-dark">Sunday: 12:00 PM - 5:00 PM</p>
                <p className="text-sm text-gray-dark">Monday - Friday: 11:00 AM - 8:00 PM</p>
                <p className="text-sm text-gray-dark">Saturday: 10:00 AM - 5:00 PM</p>
              </div>
              <p className="text-sm text-gray-dark mt-2">
                Available Services: Rentals, lessons, and returns
              </p>
              <div className="mt-4">
                <a 
                  href="https://www.musicarts.com/rentals?schoolTypeId=0&schoolId=14443" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center sm:inline-block sm:w-auto bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors duration-200"
                >
                  Rent Online for KMS Band
                </a>
              </div>
            </div>
            <div className="bg-primary-tint p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Veritas Instrument Rental (RG&apos;s Music Repair)</h3>
              <p className="text-gray-dark mb-1">Houston, TX</p>
              <p className="text-gray-dark mb-1">
                Phone: <a href="tel:+17135697821" className="text-primary hover:underline">(713) 569-7821</a>
              </p>
              <p className="text-sm text-gray-dark font-medium mb-2">Call for repair appointments</p>
              <p className="text-gray-dark mb-1">
                Rentals delivered to your door, with weekly service visits to our campus.
              </p>
              <p className="text-gray-dark text-sm">
                Rental runs approximately $30&ndash;$50/month depending on instrument and brand.
              </p>
              <div className="mt-2 pt-2 border-t border-gray-light">
                <p className="text-sm font-bold text-primary mb-1">Introductory Offer &ndash; One Month Free</p>
                <p className="text-sm text-gray-dark">Pay for the first month, then pay nothing for the second month!</p>
                <p className="text-xs text-gray-dark mt-1 italic">Some instruments do not qualify for the offer. Choose an instrument for details.</p>
              </div>
              <div className="mt-4">
                <a
                  href="https://www.rentfromhome.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center sm:inline-block sm:w-auto bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors duration-200"
                >
                  Rent Online for KMS Band
                </a>
              </div>
            </div>
          </div>
        </section>
        
        <section className="text-center bg-primary text-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
          <p className="mb-6">
            Not sure which option fits? The directors will walk you through it.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Contact the Directors
          </Link>
        </section>
      </div>
    </div>
  );
}