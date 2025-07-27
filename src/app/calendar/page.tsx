import Header from "@/components/Header";

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Solid header for calendar page */}
      <Header variant="solid" />
      
      {/* Spacer div to push content below fixed header */}
      <div className="h-20 lg:h-24" />
      
      {/* Page content */}
      <div className="pb-12">
        <div className="container py-12">
          <h1 className="text-4xl lg:text-5xl text-center mb-8 text-primary">
            CALENDAR
          </h1>
          
          {/* Calendar description */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-base text-gray-dark text-center leading-relaxed">
              Please see our current KMS Band Calendar for the 2025-2026 school year below. 
              These dates are subject to change. We will notify parents in the weekly 
              ParentSquare newsletter of changes, so please be sure the Band Directors 
              have a parent email address on file.
            </p>
          </div>
          
          {/* Team Up Calendar Embed */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <iframe 
              src="https://teamup.com/ksy2fym655un5pdh88?tz=Calendar%20default&showProfileAndInfo=0&showSidepanel=1&showViewHeader=1&showAgendaDetails=0&showDateControls=1&showDateRange=1" 
              style={{ width: '100%', height: '600px', border: '1px solid #cccccc' }}
              loading="lazy" 
              frameBorder="0"
              title="KMS Band Calendar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}