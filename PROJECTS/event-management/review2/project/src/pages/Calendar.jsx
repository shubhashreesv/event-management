import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Placeholder events data
  const events = [
    {
      id: 1,
      title: 'Tech Workshop',
      date: new Date(2024, 2, 25),
      type: 'Workshop',
      organizer: 'Computer Science Club'
    },
    {
      id: 2,
      title: 'Cultural Night',
      date: new Date(2024, 2, 28),
      type: 'Cultural',
      organizer: 'Cultural Club'
    },
    {
      id: 3,
      title: 'Science Exhibition',
      date: new Date(2024, 3, 5),
      type: 'Exhibition',
      organizer: 'Science Department'
    }
  ];

  // Filter events for selected date
  const selectedDateEvents = events.filter(event => 
    format(event.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Event Calendar</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              inline
              calendarClassName="w-full"
            />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Events for {format(selectedDate, 'MMMM d, yyyy')}
            </h2>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map(event => (
                  <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>Type: {event.type}</p>
                      <p>Organizer: {event.organizer}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No events scheduled for this date.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;