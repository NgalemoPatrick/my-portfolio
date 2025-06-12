// frontend/src/pages/ProjectsPage.js
import React, { useState, useEffect } from "react";
import { getProjects } from "../services/apiService";
import {
  ExternalLink,
  Github,
  Calendar,
  Layers,
  Briefcase,
} from "lucide-react"; // Added Briefcase
import styles from "./ProjectsPage.module.css"; // Import CSS Module

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data || []);
        setError("");
      } catch (err) {
        setError("Failed to load projects. Please try refreshing the page.");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Ongoing"; // Changed from 'Present' for clarity
    const options = { year: "numeric", month: "short" };
    try {
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      return "Invalid Date";
    }
  };

  if (loading) {
    return <div className={styles.loadingMessage}>Loading Projects...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  if (projects.length === 0) {
    return (
      <div className={styles.noProjectsMessage}>
        No projects to display yet. Check back soon!
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>
        <Briefcase size={36} className={styles.pageTitleIcon} /> My Projects
      </h1>
      <p className={styles.pageSubtitle}>
        A collection of projects I've worked on, showcasing my skills and
        passion for development.
      </p>
      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <div
            key={project._id || project.title}
            className={styles.projectCard}
          >
            <div className={styles.imageContainer}>
              <img
                src={
                  project.imageUrl ||
                  "https://placehold.co/600x400/EAEAEA/757575?text=Project+Image"
                }
                alt={project.title || "Project image"}
                className={styles.projectImage}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/CCCCCC/757575?text=Image+Not+Found";
                }}
              />
              {project.featured && (
                <span className={styles.featuredBadge}>Featured</span>
              )}
            </div>
            <div className={styles.cardContent}>
              <h2 className={styles.projectTitle}>
                {project.title || "Untitled Project"}
              </h2>

              {(project.startDate || project.endDate) && (
                <p className={styles.projectDates}>
                  <Calendar size={16} className={styles.contentIcon} />
                  {formatDate(project.startDate)} &ndash;{" "}
                  {project.endDate ? formatDate(project.endDate) : "Ongoing"}
                </p>
              )}

              <p className={styles.projectDescription}>
                {project.description || "No description available."}
              </p>

              {project.technologies && project.technologies.length > 0 && (
                <div className={styles.technologiesContainer}>
                  <h3 className={styles.technologiesTitle}>
                    <Layers size={16} className={styles.contentIcon} />{" "}
                    Technologies Used:
                  </h3>
                  <div className={styles.techTags}>
                    {project.technologies.map((tech, index) => (
                      <span key={index} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.projectLinks}>
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.linkButton} ${styles.viewProjectLink}`}
                  >
                    <ExternalLink size={18} /> View Project
                  </a>
                )}
                {project.sourceCodeUrl && (
                  <a
                    href={project.sourceCodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.linkButton} ${styles.sourceCodeLink}`}
                  >
                    <Github size={18} /> Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
