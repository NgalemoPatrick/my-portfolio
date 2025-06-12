// frontend/src/pages/ResumePage.js
import React, { useState, useEffect } from "react";
import { getResumeItems } from "../services/apiService";
import {
  Briefcase,
  GraduationCap,
  Award,
  Star,
  Calendar,
  MapPin,
  Settings,
  Download,
  FileText,
  ExternalLink,
} from "lucide-react"; // Added ExternalLink
import styles from "./ResumePage.module.css"; // Import CSS Module

const ResumePage = () => {
  const [resumeData, setResumeData] = useState({
    Experience: [],
    Education: [],
    Certification: [],
    Skill: [],
    Award: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        setLoading(true);
        const items = await getResumeItems();
        if (items && items.length > 0) {
          const categorizedData = items.reduce(
            (acc, item) => {
              if (!acc[item.category]) {
                acc[item.category] = []; // Ensure category array exists
              }
              acc[item.category].push(item);
              return acc;
            },
            {
              Experience: [],
              Education: [],
              Certification: [],
              Skill: [],
              Award: [],
            }
          );
          setResumeData(categorizedData);
        } else {
          setResumeData({
            Experience: [],
            Education: [],
            Certification: [],
            Skill: [],
            Award: [],
          });
        }
        setError("");
      } catch (err) {
        setError("Failed to load resume information. Please try refreshing.");
        setResumeData({
          Experience: [],
          Education: [],
          Certification: [],
          Skill: [],
          Award: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Present"; // Or 'Ongoing'
    const options = { year: "numeric", month: "long" };
    try {
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      return "Invalid Date";
    }
  };

  const getSectionIcon = (category) => {
    switch (category) {
      case "Experience":
        return <Briefcase size={28} className={styles.sectionTitleIcon} />;
      case "Education":
        return <GraduationCap size={28} className={styles.sectionTitleIcon} />;
      case "Certification":
        return <Award size={28} className={styles.sectionTitleIcon} />;
      case "Skill":
        return <Settings size={28} className={styles.sectionTitleIcon} />;
      case "Award":
        return <Star size={28} className={styles.sectionTitleIcon} />;
      default:
        return <FileText size={28} className={styles.sectionTitleIcon} />;
    }
  };

  const renderSection = (title, items) => {
    if (!items || items.length === 0) {
      return null; // Don't render section if no items
    }

    // Special rendering for 'Skill' category
    if (title === "Skill") {
      return (
        <section key={title} className={styles.resumeSection}>
          <h2 className={styles.sectionTitle}>
            {getSectionIcon(title)} {title}s
          </h2>
          <div className={styles.skillsGrid}>
            {items.map((item) => (
              <div
                key={item._id || item.skillName}
                className={styles.skillItem}
              >
                <span className={styles.skillName}>{item.skillName}</span>
                {item.skillLevel && (
                  <span className={styles.skillLevel}>{item.skillLevel}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      );
    }

    // Default rendering for other categories
    return (
      <section key={title} className={styles.resumeSection}>
        <h2 className={styles.sectionTitle}>
          {getSectionIcon(title)} {title}
        </h2>
        <div className={styles.itemsList}>
          {items.map((item) => (
            <div key={item._id || item.title} className={styles.resumeItemCard}>
              <div className={styles.itemHeader}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                {(item.startDate || item.endDate) && (
                  <p className={styles.itemDates}>
                    <Calendar size={14} className={styles.itemDetailIcon} />
                    {formatDate(item.startDate)} &ndash;{" "}
                    {item.endDate ? formatDate(item.endDate) : "Present"}
                  </p>
                )}
              </div>
              {item.organization && (
                <p className={styles.itemOrganization}>
                  {/* Consider adding specific icon for organization based on category */}
                  {item.organization}
                </p>
              )}
              {item.location && (
                <p className={styles.itemLocation}>
                  <MapPin size={14} className={styles.itemDetailIcon} />
                  {item.location}
                </p>
              )}
              {item.description && (
                <p className={styles.itemDescription}>{item.description}</p>
              )}
              {item.details && item.details.length > 0 && (
                <ul className={styles.itemDetailsList}>
                  {item.details.map((detail, index) => (
                    <li key={index} className={styles.itemDetailPoint}>
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
              {item.certificateURL && item.category === "Certification" && (
                <a
                  href={item.certificateURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.certificateLink}
                >
                  View Certificate{" "}
                  <ExternalLink size={14} style={{ marginLeft: "5px" }} />
                </a>
              )}
              {item.gpa && item.category === "Education" && (
                <p className={styles.itemGpa}>GPA: {item.gpa}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  if (loading) {
    return (
      <div className={styles.loadingMessage}>Loading Resume Information...</div>
    );
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  const orderedCategories = [
    "Experience",
    "Education",
    "Skill",
    "Certification",
    "Award",
  ];
  const hasContent = orderedCategories.some(
    (category) => resumeData[category] && resumeData[category].length > 0
  );

  if (!hasContent) {
    return (
      <div className={styles.noContentMessage}>
        No resume information available yet.
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>
        <FileText size={36} className={styles.pageTitleIcon} /> My Resume
      </h1>
      <p className={styles.pageSubtitle}>
        A detailed overview of my professional experience, education, and
        skills.
      </p>

      {orderedCategories.map((category) =>
        renderSection(category, resumeData[category])
      )}

      <div className={styles.downloadSection}>
        <a
          href="/resume.pdf" // Replace with actual path to your PDF resume in the public folder
          download="YourName_Resume.pdf" // Customize the downloaded file name
          className={styles.downloadButton}
          // To prevent 404 if file not present, you might need JS to check or simply ensure file exists
        >
          <Download size={20} /> Download PDF Resume
        </a>
        <p className={styles.downloadNote}>
          (Ensure you have a `resume.pdf` in your `public` folder for this link
          to work)
        </p>
      </div>
    </div>
  );
};

export default ResumePage;
