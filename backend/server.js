// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Add this line to see what connection string is being used:
console.log('Attempting to connect to MongoDB with URI:', process.env.MONGODB_URI);

// Connect to MongoDB
connectDB();

// Middleware
// Enable CORS - configure this more securely for production
app.use(cors()); // Allows all origins by default
// Example for specific origin:
// app.use(cors({ origin: 'http://localhost:3000' }));

// Body parser middleware to handle JSON request bodies
app.use(express.json({ extended: false })); // 'extended: false' is for parsing simple bodies

// Define a simple route for the root
app.get("/", (req, res) => res.send("Portfolio API Running"));

// Define API routes
app.use("/api", require("./routes/api")); // All API routes will be prefixed with /api

// Define Port
const PORT = process.env.PORT || 5001; // Use port from .env or default to 5001

// Start the server
app.listen(PORT, () => console.log(`Backend server started on port ${PORT}`));
