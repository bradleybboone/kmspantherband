export default function Schedule() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Band Schedule
      </h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-100 p-8 rounded-lg text-center mb-12">
          <p className="text-lg text-gray-dark">
            Daily rehearsal schedules and practice times will be posted here.
          </p>
        </div>
        
        {/* Sample Schedule */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Daily Class Schedule</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-primary text-secondary">
                  <tr>
                    <th className="px-6 py-3 text-left">Period</th>
                    <th className="px-6 py-3 text-left">Time</th>
                    <th className="px-6 py-3 text-left">Class</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4">1st Period</td>
                    <td className="px-6 py-4">8:00 - 8:50 AM</td>
                    <td className="px-6 py-4">6th Grade Band</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">3rd Period</td>
                    <td className="px-6 py-4">10:00 - 10:50 AM</td>
                    <td className="px-6 py-4">7th Grade Band</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">5th Period</td>
                    <td className="px-6 py-4">1:00 - 1:50 PM</td>
                    <td className="px-6 py-4">8th Grade Band</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-primary">After School Rehearsals</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-dark mb-2">
                <strong>Jazz Band:</strong> Tuesdays & Thursdays, 3:30 - 4:30 PM
              </p>
              <p className="text-gray-dark">
                <strong>Full Band (before concerts):</strong> As scheduled, typically 3:30 - 5:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}