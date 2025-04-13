import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function EventForm({ onEventCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: new Date(),
    venue: '',
    startTime: '',
    endTime: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [venueAvailable, setVenueAvailable] = useState(true); // Track availability
  const navigate = useNavigate();
  const { eventId } = useParams(); // Get event ID from URL if editing

  const checkAvailability = async (venue, date, startTime, endTime) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/events/availability?venue=${venue}&date=${date}&startTime=${startTime}&endTime=${endTime}`
      );
      return response.data.isAvailable;
    } catch (error) {
      console.error('Error checking availability:', error);
      return false;
    }
  };

  useEffect(() => {
    if (eventId) {
      setIsEditing(true);
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
          setFormData({
            ...response.data,
            date: new Date(response.data.date),
          });
        } catch (error) {
          toast.error('Error loading event details');
          console.error('Error:', error);
        }
      };
      fetchEvent();
    }
  }, [eventId]);

  useEffect(() => {
    if (formData.venue && formData.date && formData.startTime && formData.endTime) {
      const check = async () => {
        const available = await checkAvailability(
          formData.venue,
          formData.date,
          formData.startTime,
          formData.endTime
        );
        setVenueAvailable(available);
      };
      check();
    }
  }, [formData.venue, formData.date, formData.startTime, formData.endTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        date: formData.date.toISOString(), // Convert JS Date to string
      };
      if (isEditing) {
        const response = await axios.put(`http://localhost:5000/api/events/${eventId}`, payload);
        if (response.status !== 200) {
          throw new Error('Failed to update event');
        }
        toast.success('Event updated successfully!');
      } else {
        const response = await axios.post('http://localhost:5000/api/events', payload);
        if (response.status !== 201) {
          throw new Error('Failed to create event');
        }
        toast.success('Event created successfully!');
      }

      if (onEventCreated) {
        onEventCreated(); // Call the callback passed from parent to refetch events
      }

      navigate('/events');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
      console.error('Error creating/updating event:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">{isEditing ? 'Edit Event' : 'Create New Event'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900"
            required
          >
            <option value="">Select a category</option>
            <option value="technical">Technical</option>
            <option value="cultural">Cultural</option>
            <option value="sports">Sports</option>
            <option value="academic">Academic</option>
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-900">
            Date
          </label>
          <DatePicker
            selected={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900"
            dateFormat="MMMM d, yyyy"
            minDate={new Date()}
          />
        </div>

        <div>
          <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
            Venue
          </label>
          <select
            id="venue"
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900"
            required
          >
            <option value="">Select a venue</option>
            <option value="CC3">CC3</option>
            <option value="CC4">CC4</option>
            <option value="CC5">CC5</option>
            <option value="CC6">CC6</option>
            <option value="CC7">CC7</option>
            <option value="CC8">CC8</option>
            <option value="CC9">CC9</option>
            <option value="CC10">CC10</option>
            <option value="CC11">CC11</option>
            <option value="CC12">CC12</option>
            <option value="CC16">CC16</option>
          </select>
        </div>

        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900"
            required
          />
        </div>

        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-900"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          disabled={isSubmitting || !venueAvailable}
        >
          {isEditing ? 'Update Event' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}
