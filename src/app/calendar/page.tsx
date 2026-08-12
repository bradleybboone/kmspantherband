import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar",
  description:
    "Rehearsals, concerts, and events for the KMS Panther Band, straight from the band’s live calendar.",
};

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-primary-canvas">
      {/* Page content */}
      <div className="pb-12">
        <div className="container py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
            Calendar
          </h1>
          
          {/* Calendar description */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-base text-gray-dark text-center leading-relaxed">
              Please see our current KMS Band Calendar for the 2026-2027 school year below.
              These dates are subject to change. We will notify parents in the weekly 
              ParentSquare newsletter of changes, so please be sure the Band Directors 
              have a parent email address on file.
            </p>
          </div>
          
          {/* Team Up Calendar Embed */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <iframe
              src="https://teamup.com/ksy2fym655un5pdh88?view=w&tz=Calendar%20default&showProfileAndInfo=0&showSidepanel=1&showViewHeader=1&showAgendaDetails=0&showDateControls=1&showDateRange=1"
              className="w-full iframe-fluid"
              loading="lazy"
              title="KMS Band Calendar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}