import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Organizer Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white shadow rounded-lg p-4">
            <nav className="space-y-2">
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-50"
              >
                Overview
              </Link>
              <Link
                to="/dashboard/events/new"
                className="block px-4 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-50"
              >
                Create Event
              </Link>
              <Link
                to="/dashboard/events"
                className="block px-4 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-50"
              >
                Manage Events
              </Link>
            </nav>
          </div>
        </div>

        <div className="md:col-span-3">
          <Routes>
            <Route index element={<DashboardOverview />} />
            <Route path="events/new" element={<EventForm />} />
            <Route path="events" element={<EventList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function DashboardOverview() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome to your Dashboard</h2>
      <p className="text-gray-600">
        Here you can manage your events, view statistics, and update your organization's profile.
      </p>
    </div>
  );
}