// backend/routes/api.js
const express = require("express");
const router = express.Router(); // This line was likely missing or misplaced
const nodemailer = require("nodemailer");

// Import Mongoose Models
const About = require("../models/About");
const Project = require("../models/Project");
const ResumeItem = require("../models/ResumeItem");

// --- ABOUT SECTION ---
// GET About information
router.get("/about", async (req, res) => {
  try {
    let aboutInfo = await About.findOne({ singleton: true });

    if (!aboutInfo) {
      console.log("No 'About' document found, creating a default one.");
      aboutInfo = new About({
        name: "Your Name",
        tagline: "Your Professional Tagline",
        bio: "Please update your bio in the database.",
        email: "your.email@example.com",
        phone: "Your Phone",
        location: "Your Location",
        singleton: true,
      });
      await aboutInfo.save();
    }
    res.json(aboutInfo);
  } catch (err) {
    console.error("Error fetching about info:", err.message);
    res.status(500).send("Server Error");
  }
});

// PUT (Update or Create) About information
router.put("/about", async (req, res) => {
  try {
    const aboutData = req.body;
    // Find and update the single 'About' document, or create if it doesn't exist (upsert)
    const updatedAboutInfo = await About.findOneAndUpdate(
      { singleton: true },
      aboutData,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json(updatedAboutInfo);
  } catch (err) {
    console.error("Error updating about info:", err.message);
    res.status(500).send("Server Error");
  }
});

// --- PROJECTS SECTION ---
// GET all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ startDate: -1 });
    if (!projects || projects.length === 0) {
      return res.json([
        {
          _id: "defaultProjectId",
          title: "Sample Project",
          description:
            "This is a sample project. Add your projects to the database.",
          technologies: ["MongoDB", "Express", "React", "Node"],
          projectUrl: "#",
          sourceCodeUrl: "#",
          featured: true,
        },
      ]);
    }
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err.message);
    res.status(500).send("Server Error");
  }
});

// POST a new project
router.post("/projects", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const project = await newProject.save();
    res.status(201).json(project);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error adding project", error: err.message });
  }
});

// PUT (Update) a project by ID
router.put("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating project", error: err.message });
  }
});

// DELETE a project by ID
router.delete("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting project", error: err.message });
  }
});

// --- RESUME ITEMS SECTION ---
// GET all resume items
router.get("/resume", async (req, res) => {
  try {
    const query = req.query.category ? { category: req.query.category } : {};
    const resumeItems = await ResumeItem.find(query).sort({
      startDate: -1,
      category: 1,
    });
    if (!resumeItems || resumeItems.length === 0) {
      return res.json([
        {
          _id: "defaultResumeExpId",
          category: "Experience",
          title: "Lead Developer",
          organization: "Tech Solutions Inc.",
          location: "Remote",
          startDate: new Date("2020-01-15T00:00:00.000Z"),
          description: "Led a team to develop innovative web applications.",
          details: [
            "Mentored junior developers.",
            "Improved application performance by 20%.",
          ],
        },
        {
          _id: "defaultResumeEduId",
          category: "Education",
          title: "M.Sc. Computer Science",
          organization: "State University",
          location: "City, State",
          startDate: new Date("2018-08-01T00:00:00.000Z"),
          endDate: new Date("2020-05-01T00:00:00.000Z"),
          description: "Focused on AI and Machine Learning.",
        },
        {
          _id: "defaultResumeSkillId",
          category: "Skill",
          skillName: "Node.js",
          skillLevel: "Expert",
        },
      ]);
    }
    res.json(resumeItems);
  } catch (err) {
    console.error("Error fetching resume items:", err.message);
    res.status(500).send("Server Error");
  }
});

// POST a new resume item
router.post("/resume", async (req, res) => {
  try {
    const newResumeItem = new ResumeItem(req.body);
    const item = await newResumeItem.save();
    res.status(201).json(item);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error adding resume item", error: err.message });
  }
});

// PUT (Update) a resume item by ID
router.put("/resume/:id", async (req, res) => {
  try {
    const item = await ResumeItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item)
      return res.status(404).json({ message: "Resume item not found" });
    res.json(item);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating resume item", error: err.message });
  }
});

// DELETE a resume item by ID
router.delete("/resume/:id", async (req, res) => {
  try {
    const item = await ResumeItem.findByIdAndDelete(req.params.id);
    if (!item)
      return res.status(404).json({ message: "Resume item not found" });
    res.json({ message: "Resume item deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting resume item", error: err.message });
  }
});

// --- CONTACT FORM SUBMISSION ---
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields." });
  }

  // Create a transporter object using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address from .env file
      pass: process.env.EMAIL_PASS, // Your Gmail App Password from .env file
    },
  });

  // Set up email data using best practices to avoid spam filters
  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`, // Send FROM your own verified email address
    to: process.env.RECIPIENT_EMAIL, // The email address that will receive the message
    replyTo: email, // Set the visitor's email as the reply-to address
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <h2>New Message from your Portfolio Contact Form</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email (for reply):</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res
      .status(200)
      .json({
        success: true,
        message: "Message sent successfully! Thank you for reaching out.",
      });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to send message. Please try again later.",
      });
  }
});

module.exports = router;
