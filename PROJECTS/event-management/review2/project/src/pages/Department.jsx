import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Department = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const events = [
    { department: "CSE", date: "2023-11-10", title: "Hackathon" },
    { department: "ECE", date: "2023-11-15", title: "Robotics Workshop" },
    { department: "EEE", date: "2023-11-20", title: "Energy Symposium" },
  ];

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentMonth(new Date());
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = daysInMonth(month, year);

    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push(<td key={j} className="border px-4 py-6"></td>);
        } else if (day > totalDays) {
          week.push(<td key={j} className="border px-4 py-6"></td>);
        } else {
          const dayEvents = events.filter(
            (e) => new Date(e.date).toDateString() === new Date(year, month, day).toDateString()
          );
          week.push(
            <td key={j} className="border px-4 py-6 text-center align-top">
              <div className="font-bold">{day}</div>
              {dayEvents.map((event, idx) => (
                <div
                  key={idx}
                  className="mt-1 text-xs bg-purple-200 text-purple-800 rounded px-1 py-0.5"
                >
                  {event.title}
                </div>
              ))}
            </td>
          );
          day++;
        }
      }
      calendar.push(<tr key={i}>{week}</tr>);
    }
    return calendar;
  };

  return (
    <div className="flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-purple-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Department Page</h1>
        <p className="text-lg">
          Explore department-specific events, participants, and past event galleries.
        </p>
      </section>

      

     

      {/* Calendar Section */}
      <section className="p-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-4">Event Calendar</h2>
        <div className="bg-orange-400  p-4 rounded-md text-center mb-4">
          <div className="flex justify-between items-center">
            <button onClick={handlePrevMonth} className="px-4 py-2 bg-white text-orange-400 rounded-md">
              Prev Month
            </button>
            <div className="font-bold">
              {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
            </div>
            <button onClick={handleNextMonth} className="px-4 py-2 bg-white text-orange-400 rounded-md">
              Next Month
            </button>
          </div>
          <button onClick={handleToday} className="mt-2 px-4 py-2 bg-white text-orange-400 rounded-md">
            Today
          </button>
        </div>
        <table className="table-auto w-full bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-orange-400 text-white">
              <th className="px-4 py-2">Sun</th>
              <th className="px-4 py-2">Mon</th>
              <th className="px-4 py-2">Tue</th>
              <th className="px-4 py-2">Wed</th>
              <th className="px-4 py-2">Thu</th>
              <th className="px-4 py-2">Fri</th>
              <th className="px-4 py-2">Sat</th>
            </tr>
          </thead>
          <tbody>{renderCalendar()}</tbody>
        </table>
      </section>

      {/* Feature Sections */}
      {["CSE", "ECE", "EEE"].map((dept, index) => (
        <section key={index} className="p-6 bg-gray-100">
          <h2 className="text-3xl font-bold mb-4">{dept} Department</h2>
          <p className="text-lg mb-4">
            Detailed profile of the {dept} department, including key information and highlights.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white shadow-md rounded-md">
              <h3 className="text-xl font-semibold">Upcoming Event</h3>
              <p className="text-gray-700">Event details for {dept}.</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-md">
              <h3 className="text-xl font-semibold">Past Event Gallery</h3>
              <p className="text-gray-700">Gallery of past events for {dept}.</p>
            </div>
          </div>
        </section>
      ))}

      
      {/* Timeline Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold mb-6">Timeline</h2>
        <ul className="space-y-4">
          {[
            { date: "2023-01-15", description: "Annual Tech Fest" },
            { date: "2023-05-10", description: "Robotics Workshop" },
            { date: "2023-08-20", description: "Energy Symposium" },
          ].map((event, index) => (
            <li key={index} className="p-4 bg-gray-100 shadow-md rounded-md">
              <p className="font-semibold">{event.date}</p>
              <p className="text-gray-600">{event.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold mb-6">Testimonials</h2>
        <div className="space-y-4">
          {[
            { name: "Participant A", feedback: "The event was amazing and well-organized!" },
            { name: "Participant B", feedback: "I learned so much from the workshops." },
            { name: "Participant C", feedback: "Looking forward to the next event!" },
          ].map((testimonial, index) => (
            <div key={index} className="p-4 bg-gray-100 shadow-md rounded-md">
              <h3 className="font-semibold">{testimonial.name}</h3>
              <p className="text-gray-600">{testimonial.feedback}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Past Event Gallery Section */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-6">Past Event Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["event1.jpg", "event2.jpg", "event3.jpg"].map((image, index) => (
            <img
              key={index}
              src={`/images/${image}`}
              alt={`Event ${index + 1}`}
              className="w-full h-48 object-cover rounded-md shadow-md"
            />
          ))}
        </div>
      </section>

      
      {/* Team Section */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-6">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["John Doe", "Jane Smith", "Alice Johnson"].map((member, index) => (
            <div key={index} className="p-4 bg-white shadow-md rounded-md text-center">
              <h3 className="text-xl font-semibold">{member}</h3>
              <p className="text-gray-700">Role: Event Coordinator</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="p-6 bg-purple-600 text-center">
        <h2 className="text-3xl font-bold mb-4">Get Involved</h2>
        <p className="text-lg mb-6">
          Contact us to learn more or participate in department events.
        </p>
        <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-md hover:bg-gray-200">
          Contact Us
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-4 px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm">&copy; 2023 EventPortal. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-purple-400">Privacy Policy</a>
            <a href="#terms" className="hover:text-purple-400">Terms of Service</a>
            <a href="#contact" className="hover:text-purple-400">Contact Us</a>
          </div>
        </div>
      </footer>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html, body, #root {
          width: 100%;
          height: 100%;
          overflow-x: hidden;  /* Prevents white space */
        }
        main {
          min-height: calc(100vh - 64px - 64px); /* Adjust main height dynamically */
        }
      `}</style>
    </div>
  );
};

export default Department;
