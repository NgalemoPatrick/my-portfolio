// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ResumePage from "./pages/ResumePage";
import ContactPage from "./pages/ContactPage";
import "./App.css"; // You can create this file for global styles or use Tailwind

// Basic styling for layout (can be in App.css or using Tailwind classes)
const styles = {
  container: {
    paddingTop: "80px", // Adjust if Navbar height changes
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    marginTop: "40px",
    borderTop: "1px solid #eee",
    color: "#777",
  },
};

function App() {
  return (
    <Router>
      <Navbar />
      <div
        style={styles.container}
        className="app-container pt-20 px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto"
      >
        {" "}
        {/* Example Tailwind classes */}
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* You can add a 404 Not Found page here */}
          <Route
            path="*"
            element={
              <div className="text-center py-10">
                <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
                <p className="mt-4">
                  The page you are looking for does not exist.
                </p>
              </div>
            }
          />
        </Routes>
      </div>
      <footer
        style={styles.footer}
        className="text-center p-5 mt-10 border-t border-gray-200 text-gray-600"
      >
        <p>
          &copy; {new Date().getFullYear()} Patrick Ngalemo. All Rights
          Reserved.
        </p>
        {/* You can add links to social media or other footers here */}
      </footer>
    </Router>
  );
}

export default App;
