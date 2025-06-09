// backend/models/ResumeItem.js
const mongoose = require("mongoose");

const ResumeItemSchema = new mongoose.Schema(
  {
    category: {
      // e.g., "Experience", "Education", "Certification", "Skills"
      type: String,
      required: true,
      enum: ["Experience", "Education", "Certification", "Skill", "Award"],
    },
    title: {
      // e.g., "Software Engineer", "B.S. in Computer Science"
      type: String,
      required: true,
    },
    organization: {
      // e.g., "Google", "University of Example"
      type: String,
      required: function () {
        return (
          this.category === "Experience" ||
          this.category === "Education" ||
          this.category === "Certification" ||
          this.category === "Award"
        );
      },
    },
    location: {
      // e.g., "Mountain View, CA"
      type: String,
    },
    startDate: {
      type: Date,
      required: function () {
        return this.category === "Experience" || this.category === "Education";
      },
    },
    endDate: {
      // Can be null if current
      type: Date,
    },
    description: {
      // Bullet points or paragraph
      type: String,
    },
    details: [
      {
        // For bullet points or specific achievements
        type: String,
      },
    ],
    // For skills category
    skillName: {
      type: String,
      required: function () {
        return this.category === "Skill";
      },
    },
    skillLevel: {
      // e.g., "Proficient", "Intermediate", "Expert"
      type: String,
      required: function () {
        return this.category === "Skill";
      },
    },
    // You can add more fields specific to categories if needed
    // e.g., GPA for education, certificate ID for certification
    gpa: {
      type: Number,
      required: function () {
        return this.category === "Education" && this.grade !== undefined;
      },
    },
    certificateURL: {
      type: String,
      required: function () {
        return this.category === "Certification";
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResumeItem", ResumeItemSchema);
