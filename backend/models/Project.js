// backend/models/Project.js
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    technologies: [
      {
        type: String,
        required: true,
      },
    ], // Array of strings, e.g., ["React", "Node.js", "MongoDB"]
    imageUrl: {
      type: String,
      default: "https://placehold.co/600x400/CCCCCC/757575?text=Project+Image", // Default placeholder
    },
    projectUrl: {
      // Link to live project
      type: String,
    },
    sourceCodeUrl: {
      // Link to GitHub repo
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date, // Can be null if ongoing
    },
    featured: {
      // To highlight specific projects
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
