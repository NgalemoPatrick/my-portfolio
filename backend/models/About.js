// backend/models/About.js
const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Your Name" // Default value
  },
  tagline: {
    type: String,
    default: "Your Professional Tagline"
  },
  bio: {
    type: String,
    required: true,
    default: "A brief biography about yourself. Highlight your key skills, experiences, and passions. Make it engaging and professional."
  },
  profileImageUrl: {
    type: String,
    default: 'https://placehold.co/300x300/E0E0E0/757575?text=Profile' // Placeholder image
  },
  email: {
    type: String,
    default: "your.email@example.com"
  },
  phone: {
    type: String,
    default: "+1 123-456-7890"
  },
  location: {
    type: String,
    default: "City, Country"
  },
  socialLinks: [{
    platform: String, // e.g., LinkedIn, GitHub, Twitter
    url: String
  }],
  skills: [{ // Can also be part of ResumeItem or a separate Skills model
    name: String, // e.g., JavaScript, React, Node.js
    level: String // e.g., Proficient, Advanced, Intermediate
  }],
  // You might want a single document for "About Me" data
  // To ensure only one document, you can use a fixed ID or a unique field.
  // For simplicity, we'll assume one document is created/managed.
  singleton: {
    type: Boolean,
    default: true,
    unique: true, // Ensures only one document can have this field set to true
    // This is a common pattern for a settings-like collection
  }
}, { timestamps: true });

// Ensure only one document for "About" section
// This is a simplified way. A more robust way is to handle this at the application logic level
// when creating/updating the about information.
// AboutSchema.index({ singleton: 1 }, { unique: true, partialFilterExpression: { singleton: true } });


module.exports = mongoose.model('About', AboutSchema);