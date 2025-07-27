import Header from "@/components/Header";

export default function Handbook() {
  const handbookUrl = "https://docs.google.com/document/d/1una3PXJwVNUcgznEZXNXnNqMYKTe4eacf_3yeU0BwHA/edit?usp=sharing";
  const handbookEmbedUrl = "https://docs.google.com/document/d/1una3PXJwVNUcgznEZXNXnNqMYKTe4eacf_3yeU0BwHA/preview";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Solid header for handbook page */}
      <Header variant="solid" />
      
      {/* Spacer div to push content below fixed header */}
      <div className="h-20 lg:h-24" />
      
      {/* Page content */}
      <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Band Handbook
      </h1>
      
      <div className="max-w-6xl mx-auto">
        <section className="mb-12">
          <p className="text-lg text-gray-dark leading-relaxed mb-8">
            The C.E. King Middle School Band Handbook contains important information about our program, 
            including policies, procedures, expectations, and resources for students and parents.
          </p>
          
          <div className="bg-primary text-secondary p-8 rounded-lg text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white !text-white">View or Download Band Handbook</h2>
            <p className="mb-6">
              View the handbook below or open in Google Docs to download in your preferred format (PDF, Word, etc.)
            </p>
            <div className="mb-4">
              <a 
                href={handbookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 font-semibold transition-colors duration-200"
              >
                Open in Google Docs
              </a>
            </div>
          </div>

          {/* Embedded Google Doc Viewer */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
            <iframe
              src={handbookEmbedUrl}
              width="100%"
              height="800"
              className="w-full"
              title="C.E. King Middle School Band Handbook"
            >
              Loading handbook...
            </iframe>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Quick Reference</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Attendance Policy</h3>
              <p className="text-gray-dark">
                All rehearsals and performances are mandatory. Students must notify directors 
                in advance of any conflicts. More than 3 unexcused absences may result in 
                removal from performances.
              </p>
            </div>
            
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Grading Policy</h3>
              <ul className="space-y-2 text-gray-dark">
                <li>• Participation & Attendance: 40%</li>
                <li>• Playing Tests & Assessments: 30%</li>
                <li>• Concert Performances: 20%</li>
                <li>• Practice Records: 10%</li>
              </ul>
            </div>
            
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Concert Attire</h3>
              <p className="text-gray-dark mb-2"><strong>Formal Concerts:</strong></p>
              <ul className="space-y-1 text-gray-dark mb-4">
                <li>• Black dress pants or long black skirt</li>
                <li>• White button-up shirt or blouse</li>
                <li>• Black dress shoes</li>
              </ul>
              <p className="text-gray-dark">Specific requirements in handbook</p>
            </div>
            
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Practice Expectations</h3>
              <div className="text-gray-dark">
                <p className="mb-2"><strong>Minimum Daily Practice:</strong></p>
                <ul className="space-y-1">
                  <li>• 6th Grade: 20 minutes</li>
                  <li>• 7th Grade: 25 minutes</li>
                  <li>• 8th Grade: 30 minutes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-primary">Important Forms</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Medical Information Form</h3>
              <p className="text-sm text-gray-dark">Required for all trips and events</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Field Trip Permission</h3>
              <p className="text-sm text-gray-dark">For off-campus performances</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Practice Log</h3>
              <p className="text-sm text-gray-dark">Weekly practice record sheet</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Instrument Agreement</h3>
              <p className="text-sm text-gray-dark">For school-owned instruments</p>
            </div>
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}