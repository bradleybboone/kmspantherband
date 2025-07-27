import Header from "@/components/Header";

export default function InstrumentRental() {
  return (
    <>
      <Header variant="solid" />
      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-20 lg:h-24" />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
          Instrument Rental Program
        </h1>
      
      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <p className="text-lg text-gray-dark leading-relaxed text-center">
            KMS offers an instrument rental program to ensure every student has access to a 
            quality instrument. We work with local music stores to provide affordable rental 
            options for families.
          </p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary text-center">Rental Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">School Rental Program</h3>
              <p className="text-gray-dark mb-4">
                Limited instruments available for students with financial need.
              </p>
              <ul className="space-y-2 text-gray-dark">
                <li>• $50 per semester</li>
                <li>• First come, first served</li>
                <li>• Maintenance included</li>
                <li>• Financial assistance available</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Music Store Partners</h3>
              <p className="text-gray-dark mb-4">
                Rent from our approved local music stores.
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
          <h2 className="text-2xl font-semibold mb-6 text-primary text-center">How to Rent</h2>
          
          <div className="bg-gray-100 p-8 rounded-lg">
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="font-semibold mr-2">1.</span>
                <span>Attend instrument fitting with band directors</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">2.</span>
                <span>Receive instrument recommendation</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">3.</span>
                <span>Complete rental application form</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">4.</span>
                <span>Submit payment or set up payment plan</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">5.</span>
                <span>Pick up instrument and begin playing!</span>
              </li>
            </ol>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary text-center">Approved Music Stores</h2>
          
                      <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">Brook Mays (H & H Music Company)</h3>
              <p className="text-gray-dark mb-1">Store #28 - North Houston - 1960</p>
              <p className="text-gray-dark mb-1">713 Cypress Creek Pkwy, Houston, TX 77090</p>
              <p className="text-gray-dark text-sm mb-1">(Formerly FM 1960 West)</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <p className="text-gray-dark">Phone: <a href="tel:2815808000" className="text-primary hover:underline">281.580.8000</a></p>
                <span className="hidden sm:inline text-gray-light">|</span>
                <p className="text-gray-dark">Fax: 281.580.5151</p>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-lighter">
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
                  className="inline-block bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Rent Online for KMS Band
                </a>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">Music & Arts</h3>
              <p className="text-gray-dark mb-1">Humble, TX</p>
              <p className="text-gray-dark mb-1">234 FM 1960 Bypass Rd E, Humble, TX 77338</p>
              <p className="text-gray-dark mb-2">Phone: <a href="tel:2815407260" className="text-primary hover:underline">(281) 540-7260</a></p>
              <div className="mt-2 pt-2 border-t border-gray-lighter">
                <p className="text-sm font-medium text-gray-dark mb-1">Store Hours:</p>
                <p className="text-sm text-gray-dark">Sunday: 12:00 PM - 5:00 PM</p>
                <p className="text-sm text-gray-dark">Monday - Friday: 11:00 AM - 8:00 PM</p>
                <p className="text-sm text-gray-dark">Saturday: 10:00 AM - 5:00 PM</p>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-lighter">
                <p className="text-sm font-medium text-gray-dark mb-1">Available Services:</p>
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-sm text-gray-dark flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Curbside Pickup
                  </p>
                  <p className="text-sm text-gray-dark flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Lessons
                  </p>
                  <p className="text-sm text-gray-dark flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Rentals
                  </p>
                  <p className="text-sm text-gray-dark flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Returns Allowed
                  </p>
                  <p className="text-sm text-gray-dark flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Ship to Store
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <a 
                  href="https://www.musicarts.com/rentals?schoolTypeId=0&schoolId=14443" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Rent Online for KMS Band
                </a>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">RG&apos;s Music Repair-Houston</h3>
              <p className="text-gray-dark mb-1">Houston, TX</p>
              <p className="text-gray-dark mb-1">Phone: <a href="tel:7135697821" className="text-primary hover:underline">(713) 569-7821</a></p>
              <p className="text-sm text-gray-dark font-medium mb-2">Call for Appointment</p>
              <div className="mt-2 pt-2 border-t border-gray-lighter">
                <p className="text-sm font-bold text-primary mb-1">Introductory Offer - One Month Free</p>
                <p className="text-sm text-gray-dark">Pay for the first month, then pay nothing for the second month!</p>
                <p className="text-xs text-gray-dark mt-1 italic">Some instruments do not qualify for offer. Choose instrument for details.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="text-center bg-primary text-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white !text-white">Need Help?</h2>
          <p className="mb-4">
            Contact the band office for rental forms and assistance.
          </p>
        </section>
      </div>
    </div>
    </>
  );
}