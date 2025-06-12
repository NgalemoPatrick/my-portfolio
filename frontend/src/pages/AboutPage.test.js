// frontend/src/pages/AboutPage.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AboutPage from "./AboutPage";

// Mock the apiService to prevent actual network calls during the test
jest.mock("../services/apiService", () => ({
  getAboutInfo: jest.fn(),
}));

// Import the mocked service to control its behavior
const { getAboutInfo } = require("../services/apiService");

describe("AboutPage Component", () => {
  // This block runs before each test in this file
  beforeEach(() => {
    // Reset the mock before each test to ensure a clean state
    getAboutInfo.mockClear();
  });

  test('renders the main heading "About Me"', async () => {
    // Arrange: Define the mock data the component will receive
    const mockAboutData = {
      name: "Patrick Ngalemo",
      tagline: "RHEL System Administrator",
      bio: "A dedicated and detail-oriented RHEL System Administrator...",
      profileImageUrl: "",
      email: "test@example.com",
      phone: "123-456-7890",
      location: "City, State",
      socialLinks: [],
      skills: [],
    };

    // Tell the mocked getAboutInfo function to return our mock data
    getAboutInfo.mockResolvedValue(mockAboutData);

    // Act: Render the component
    render(<AboutPage />);

    // Assert: Check if the expected text is in the document.
    // We use findByText because the component fetches data asynchronously.
    // 'findBy' waits for the element to appear.
    const headingElement = await screen.findByText(/About Me/i);
    expect(headingElement).toBeInTheDocument();

    // You can also test for other elements
    const nameElement = await screen.findByText(/Patrick Ngalemo/i);
    expect(nameElement).toBeInTheDocument();
  });

  test("shows a loading message initially", () => {
    // Arrange: We don't resolve the mock promise, so it stays in a "loading" state
    getAboutInfo.mockReturnValue(new Promise(() => {})); // A promise that never resolves

    // Act
    render(<AboutPage />);

    // Assert
    const loadingMessage = screen.getByText(/Loading About Me.../i);
    expect(loadingMessage).toBeInTheDocument();
  });

  test("shows an error message if the API call fails", async () => {
    // Arrange: Tell the mock function to reject the promise (simulate an error)
    getAboutInfo.mockRejectedValue(new Error("Failed to fetch"));

    // Act
    render(<AboutPage />);

    // Assert
    const errorMessage = await screen.findByText(
      /Failed to load about information/i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
