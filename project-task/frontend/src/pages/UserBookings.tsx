import React, { useState, useEffect } from 'react';
import { fetchUserBookings } from '../services/api';
import { useNavigate } from 'react-router-dom';

const UserBookings: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBookings = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (!token) {
        alert('You must be logged in to view your bookings.');
        navigate('/login');
        return;
      }

      try {
        const userBookings = await fetchUserBookings(token); // Fetch bookings using the token
        setBookings(userBookings);
      } catch (error) {
        alert('Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [navigate]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (bookings.length === 0) {
    return <p className="text-center">You have no bookings yet.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Your Bookings</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Booking ID</th>
            <th className="border border-gray-300 px-4 py-2">Vehicle</th>
            <th className="border border-gray-300 px-4 py-2">Start Date</th>
            <th className="border border-gray-300 px-4 py-2">End Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{booking.id}</td>
              <td className="border border-gray-300 px-4 py-2">{booking?.vehicle?.model || 'N/A'}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(booking.startDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(booking.endDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserBookings;