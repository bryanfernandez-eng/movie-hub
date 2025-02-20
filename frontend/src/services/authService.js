import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

export const signup = async (userData) => {
  try {
    const response = await axios.post(API_URL + "signup", userData, {
      withCredentials: true,
    });
    console.log(response.data.message);
    return response.data.message;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + "login", userData, {
      withCredentials: true,
    });
    return response.data.message;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = async () => {
  try {
    await axios.post(
      API_URL + "logout",
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const checkAuth = async () => {
  try {
    const response = await axios.get(API_URL + "check", {
      withCredentials: true,
    });
    return response.data.success;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
