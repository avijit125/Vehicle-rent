import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API call for registration
export const registerUser = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to register user');
  }
};

// API call for login
export const loginUser = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to log in');
  }
};

// Fetch vehicle types (GET)
export const fetchVehicleTypes = async (wheels: string) => {
  try {
    const response = await axios.get(`${API_URL}/vehicles/types`, {
      params: { wheels },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch vehicle types');
  }
};

// Fetch vehicle models based on type (GET)
export const fetchVehicleModels = async (type: string) => {
  try {
    const response = await axios.get(`${API_URL}/vehicles/models`, {
      params: { type },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch vehicle models');
  }
};

// Create a booking (POST)
export const createBooking = async (data: any, token: string) => {
    try {
      const response = await axios.post(
        `${API_URL}/bookings`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to create booking');
    }
  };

  export const fetchUserBookings = async (token: string) => {
    try {
      const response = await axios.post(
        `${API_URL}/bookings/get-bookings`, // Adjust endpoint if necessary
        {}, // Include body if needed, here it's empty
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass Bearer token in the headers
          },
        }
      );
      return response.data; // Return the data from the response
    } catch (error) {
      throw new Error('Failed to fetch user bookings');
    }
  };
  
