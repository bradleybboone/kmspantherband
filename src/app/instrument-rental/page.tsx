export default function InstrumentRental() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Instrument Rental Program
      </h1>
      
      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <p className="text-lg text-gray-dark leading-relaxed">
            KMS offers an instrument rental program to ensure every student has access to a 
            quality instrument. We work with local music stores to provide affordable rental 
            options for families.
          </p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Rental Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
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
            
            <div className="bg-white p-6 rounded-lg shadow">
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
          <h2 className="text-2xl font-semibold mb-6 text-primary">How to Rent</h2>
          
          <div className="bg-gray-100 p-6 rounded-lg">
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
          <h2 className="text-2xl font-semibold mb-6 text-primary">Approved Music Stores</h2>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold">Music & Arts</h3>
              <p className="text-gray-dark">123 Main Street • (555) 234-5678</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold">Sam's Music Center</h3>
              <p className="text-gray-dark">456 Oak Avenue • (555) 345-6789</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold">Melody Music Shop</h3>
              <p className="text-gray-dark">789 Pine Road • (555) 456-7890</p>
            </div>
          </div>
        </section>
        
        <section className="text-center bg-primary text-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
          <p className="mb-4">
            Contact the band office for rental forms and assistance.
          </p>
          <p className="font-semibold">Band Office: (555) 123-4567</p>
        </section>
      </div>
    </div>
  );
}