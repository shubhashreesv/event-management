import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import EventForm from './EventForm';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    fetchEvents();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/me');
      setUser(response.data);
    } catch (error) {
      toast.error('Error fetching user info');
      console.error('Error fetching user:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      toast.error('Error loading events');
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventCreated = async () => {
    await fetchEvents();
  };

  const handleEdit = (eventId) => {
    navigate(`/dashboard/events/edit/${eventId}`);
  };

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${eventId}`);
        toast.success('Event deleted successfully');
        fetchEvents();
      } catch (error) {
        toast.error('Error deleting event');
        console.error('Error deleting event:', error);
      }
    }
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Loading user info...</h2>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Manage Events</h2>

      <button
        onClick={toggleForm}
        className="px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-md hover:bg-primary-700"
      >
        {showForm ? 'Cancel' : 'Create Event'}
      </button>

      {showForm && <EventForm onEventCreated={handleEventCreated} />}

      <div className="space-y-4 mt-6">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-500">
                    {format(new Date(event.date), 'MMMM d, yyyy')} at {event.venue}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Category: {event.category}</p>
                </div>
                {user && user._id === event.createdBy && (
                  <div className="flex space-x-2">
                    <button
                      className="px-3 py-1 text-sm text-primary-600 hover:text-primary-700"
                      onClick={() => handleEdit(event._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No events found.</p>
        )}
      </div>
    </div>
  );
}
