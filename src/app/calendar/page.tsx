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
          <h1 className="text-4xl lg:text-5xl text-center mb-12 text-primary">
            CALENDAR
          </h1>
          
          {/* Calendar content would go here */}
          <div className="bg-white p-8 shadow-md">
            <div className="grid grid-cols-7 gap-4">
              {/* Calendar grid */}
              <div className="text-center font-bold text-sm uppercase">Sun</div>
              <div className="text-center font-bold text-sm uppercase">Mon</div>
              <div className="text-center font-bold text-sm uppercase">Tue</div>
              <div className="text-center font-bold text-sm uppercase">Wed</div>
              <div className="text-center font-bold text-sm uppercase">Thu</div>
              <div className="text-center font-bold text-sm uppercase">Fri</div>
              <div className="text-center font-bold text-sm uppercase">Sat</div>
              
              {/* Sample calendar days */}
              {Array.from({ length: 35 }, (_, i) => (
                <div key={i} className="aspect-square border border-gray-200 p-2 hover:bg-gray-50 cursor-pointer">
                  <div className="text-sm font-medium">{(i % 31) + 1}</div>
                  {i === 10 && (
                    <div className="mt-1">
                      <div className="text-xs bg-primary text-white px-1 py-0.5 rounded">
                        Concert 7pm
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}