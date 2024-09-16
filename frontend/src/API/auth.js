import axios from "axios";

const API_URL = "http://localhost:3100/api/auth";

// API object containing all the authentication-related methods
const API = {
  /**
   * Method to log in a user.
   * @param {Object} credentials - The user's credentials (identifier and password).
   * @returns {string} - The JWT token if login is successful.
   */
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      const { token } = response.data;

      // Store the JWT token in localStorage
      localStorage.setItem("umia", token);

      return token;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw new Error("Login failed. Please check your credentials.");
    }
  },

  /**
   * Method to register a new user.
   * @param {Object} userData - The new user's data (username, email, password, etc.).
   * @returns {string} - The JWT token if registration is successful.
   */
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      const { token } = response.data;
      console.log("datataa",userData)
      // Store the JWT token in localStorage
      localStorage.setItem("umia", token);

      return token;
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      throw new Error("Registration failed. Please check your details.");
    }
  },

  /**
   * Method to get the JWT token from localStorage.
   * @returns {string | null} - The JWT token if it exists, otherwise null.
   */
  getToken: () => {
    return localStorage.getItem("umia");
  },

  /**
   * Method to log out a user.
   * Removes the JWT token from localStorage.
   */
  logout: () => {
    localStorage.removeItem("umia");
  },

  /**
   * Method to update user details.
   * @param {number} userId - The ID of the user to update.
   * @param {Object} updatedData - The updated user details.
   * @returns {Object} - The updated user details.
   */
  updateUserDetails: async (userId, updatedData) => {
    try {
      const token = API.getToken();
      const response = await axios.put(
        `${API_URL}/update/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      throw new Error("Failed to update user details.");
    }
  },

  /**
   * Method to change user password.
   * @param {number} userId - The ID of the user to change password.
   * @param {Object} passwords - Object containing oldPassword and newPassword.
   * @returns {string} - Success message if the password change is successful.
   */
  changeUserPassword: async (userId, passwords) => {
    try {
      const token = API.getToken();
      const response = await axios.put(
        `${API_URL}/change-password/${userId}`,
        passwords,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Password change failed:",
        error.response?.data || error.message
      );
      throw new Error(
        "Failed to change password. Please check your credentials."
      );
    }
  },
};

export default API;
