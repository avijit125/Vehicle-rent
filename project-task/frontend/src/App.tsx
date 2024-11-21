import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // Custom Auth context to manage login state
import Login from './pages/Login'; // Login page component
import Register from './pages/Register'; // Register page component
import BookingForm from './pages/BookingForm'; // Booking form page component
import {ProtectedRoute} from './components/ProtectedRoute'; // Protect certain routes
import { Container } from '@mui/material'; // Material UI container for layout
import UserBookings from './pages/UserBookings';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Container maxWidth="sm" className="mt-8">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/booking"
              element={
                <ProtectedRoute>
                  <BookingForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/confirmation"
              element={
                <ProtectedRoute>
                  <UserBookings/>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
