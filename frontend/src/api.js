import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/auth', // Update with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Signup API request
export const signup = async (name, email, password) => {
  try {
    const response = await api.post('/signup', { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Error in signup:', error);
    throw error;
  }
};

// Login API request
export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error in login:', error);
    throw error;
  }
};

// Logout API request
export const logout = async () => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    console.error('Error in logout:', error);
    throw error;
  }
};
