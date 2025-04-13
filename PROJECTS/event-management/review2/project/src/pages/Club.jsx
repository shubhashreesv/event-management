import React from "react";
import Navbar from "../components/Navbar";

const Club = () => {
  const clubs = [
    {
      name: "CSEA - Computer Science and Engineering Association",
      description:
        "Welcome to the Computer Science and Engineering Association (CSEA), where technical excellence meets innovation. Join us to participate in hackathons, workshops, and seminars.",
      contact: {
        phone: "+123 456 7890",
        email: "csea@university.com",
        website: "https://csea.university.com",
      },
      gallery: ["csea1.jpg", "csea2.jpg", "csea3.jpg"],
      events: [
        { id: 1, title: "Web Development Workshop", description: "Learn to build websites.", image: "/images/event4.jpg" },
      
        { id: 2, title: "AI Workshop", description: "Learn about AI and ML.", image: "/images/event2.jpg" },
      ],
    },
    {
      name: "CCC - Coding Club of CSE",
      description:
        "Welcome to the Coding Club of CSE (CCC), a hub for coding enthusiasts. Participate in coding contests, workshops, and collaborative projects to enhance your skills.",
      contact: {
        phone: "+987 654 3210",
        email: "ccc@university.com",
        website: "https://ccc.university.com",
      },
      gallery: ["ccc1.jpg", "ccc2.jpg", "ccc3.jpg"],
      events: [
        { id: 1, title: "Competitive Coding Contest", description: "Test your coding skills.", image: "/images/event3.jpg" },
        { id: 2, title: "Hackathon", description: "A 24-hour coding competition.", image: "/images/event1.jpg" },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-purple-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Clubs</h1>
        <p className="text-lg">
          Explore the vibrant clubs at our university, including the Computer Science and Engineering Association (CSEA) and the Coding Club of CSE (CCC).
        </p>
      </section>

      {/* Club Profiles */}
      {clubs.map((club, index) => (
        <section key={index} className="py-16 px-6 bg-white">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Sidebar Section */}
            <aside className="w-full md:w-1/3 bg-white shadow-md rounded-md p-6">
              <div className="text-center mb-6">
                <img
                  src={
                    club.name.includes("CSEA")
                      ? "/assets/images/csea-logo.png"
                      : "/images/club-logo.png"
                  }
                  alt={`${club.name} Logo`}
                  className="w-24 h-24 mx-auto rounded-full shadow-md"
                />
                <h2 className="text-2xl font-bold mt-4">{club.name}</h2>
                <p className="text-gray-600 mt-2">{club.description}</p>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">
                  <strong>Contact:</strong> {club.contact.email}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {club.contact.phone}
                </p>
                <p className="text-gray-700">
                  <strong>Website:</strong>{" "}
                  <a
                    href={club.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline"
                  >
                    {club.contact.website}
                  </a>
                </p>
                <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
                  Send Message
                </button>
              </div>
            </aside>

            {/* Main Section */}
            <div className="w-full md:w-2/3">
              {/* Gallery */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Gallery</h3>
                <div className="grid grid-cols-3 gap-4">
                  {club.gallery.map((image, idx) => (
                    <img
                      key={idx}
                      src={`/images/${image}`}
                      alt={`${club.name} Event ${idx + 1}`}
                      className="w-full h-32 object-cover rounded-md shadow-md"
                    />
                  ))}
                </div>
              </div>

              {/* Events */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Our Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {club.events.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white shadow-md rounded-md overflow-hidden"
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="text-lg font-semibold">{event.title}</h4>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm">&copy; 2023 EventPortal. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-purple-400">Privacy Policy</a>
            <a href="#terms" className="hover:text-purple-400">Terms of Service</a>
            <a href="#contact" className="hover:text-purple-400">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Club;