import axios from "axios";

const API_URL = "http://localhost:3100/api/auth";

// API object containing all the authentication-related methods
const API = {
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
};

export default API;
