// frontend/src/services/apiService.js
import axios from "axios";

// The base URL will be proxied to your backend server (e.g., http://localhost:5001)
// during development, thanks to the "proxy" setting in package.json.
// In production, you'd configure your web server (like Nginx) to handle this.
const API_BASE_URL = "/api"; // Uses the proxy

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- About ---
export const getAboutInfo = async () => {
  try {
    const response = await apiClient.get("/about");
    return response.data;
  } catch (error) {
    console.error("Error fetching about info:", error);
    // Return a default structure or throw the error for the component to handle
    return {
      name: "Error Loading Name",
      bio: "Could not load bio. Please check API connection.",
      email: "",
      phone: "",
      location: "",
      profileImageUrl: "https://placehold.co/300x300/FF0000/FFFFFF?text=Error",
      socialLinks: [],
      skills: [],
    };
  }
};

// --- Projects ---
export const getProjects = async () => {
  try {
    const response = await apiClient.get("/projects");
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return []; // Return empty array on error
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    return null; // Return null or throw
  }
};

// --- Resume ---
export const getResumeItems = async (category = null) => {
  try {
    const url = category ? `/resume?category=${category}` : "/resume";
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching resume items:", error);
    return [];
  }
};

// --- Contact ---
export const submitContactForm = async (contactData) => {
  try {
    const response = await apiClient.post("/contact", contactData);
    return response.data; // Should include { success: true, message: '...' }
  } catch (error) {
    console.error("Error submitting contact form:", error);
    // Check if error.response exists for more detailed error info from backend
    if (error.response && error.response.data) {
      return {
        success: false,
        message:
          error.response.data.message || "Submission failed. Please try again.",
      };
    }
    return {
      success: false,
      message: "Submission failed due to a network or server error.",
    };
  }
};

// You can add more functions here for POST, PUT, DELETE if you build an admin interface.
// For example:
// export const createProject = async (projectData) => {
//   const response = await apiClient.post('/projects', projectData);
//   return response.data;
// };
