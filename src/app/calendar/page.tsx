export default function Calendar() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Band Calendar
      </h1>
      
      <div className="max-w-4xl mx-auto">
        {/* Coming Soon Notice */}
        <div className="bg-gradient-to-br from-primary to-primary-hover text-secondary p-16 rounded-2xl text-center mb-12 shadow-2xl">
          <h2 className="text-3xl font-bold mb-4 uppercase tracking-wide">Calendar Coming Soon</h2>
          <p className="text-lg mb-6">
            We're working on bringing you an interactive calendar with all band events, 
            rehearsals, concerts, and competitions.
          </p>
          <p className="text-lg">
            In the meantime, please check your email for important dates or contact 
            Dr. Boone at{' '}
            <a href="mailto:bradleyboone@sheldonisd.com" className="underline hover:text-gray-light">
              bradleyboone@sheldonisd.com
            </a>
          </p>
        </div>
        
        {/* Temporary Event List */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-primary text-center">
            Key Dates for 2024-2025
          </h2>
          <div className="space-y-4">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
              <h3 className="font-semibold text-lg">Fall Concert</h3>
              <p className="text-gray-dark">October 2024 - Date TBA</p>
              <p className="text-sm text-gray-dark mt-1">C.E. King Middle School Auditorium</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
              <h3 className="font-semibold text-lg">Winter Concert</h3>
              <p className="text-gray-dark">December 2024 - Date TBA</p>
              <p className="text-sm text-gray-dark mt-1">C.E. King Middle School Auditorium</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
              <h3 className="font-semibold text-lg">UIL Concert & Sight Reading</h3>
              <p className="text-gray-dark">March 2025 - Date TBA</p>
              <p className="text-sm text-gray-dark mt-1">Location TBA</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
              <h3 className="font-semibold text-lg">Spring Concert</h3>
              <p className="text-gray-dark">May 2025 - Date TBA</p>
              <p className="text-sm text-gray-dark mt-1">C.E. King Middle School Auditorium</p>
            </div>
          </div>
          <p className="text-center text-gray-dark mt-8 italic">
            Specific dates and additional events will be announced via email and updated here soon.
          </p>
        </div>
      </div>
    </div>
  );
}