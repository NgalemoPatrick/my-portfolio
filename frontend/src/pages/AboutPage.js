// frontend/src/pages/AboutPage.js
import React, { useState, useEffect } from "react";
import { getAboutInfo } from "../services/apiService";
import {
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Code,
  UserCircle,
  ChevronsRight,
} from "lucide-react"; // Added UserCircle, ChevronsRight
import styles from "./AboutPage.module.css"; // Import CSS Module

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const data = await getAboutInfo();
        setAboutData(data);
        setError("");
      } catch (err) {
        console.error("API Error in AboutPage:", err);
        setError(
          "Failed to load about information. Please try refreshing the page."
        );
        setAboutData({
          name: "N/A",
          bio: "Error loading content.",
          profileImageUrl: "",
          email: "",
          phone: "",
          location: "",
          socialLinks: [],
          skills: [],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  if (loading) {
    return <div className={styles.loadingMessage}>Loading About Me...</div>;
  }

  if (error || !aboutData) {
    return (
      <div className={styles.errorMessage}>
        {error || "About data is unavailable."}
      </div>
    );
  }

  const {
    name,
    tagline,
    bio,
    profileImageUrl,
    email,
    phone,
    location,
    socialLinks,
    skills,
  } = aboutData;

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "linkedin":
        return <Linkedin size={24} className={styles.socialIcon} />;
      case "github":
        return <Github size={24} className={styles.socialIcon} />;
      default:
        return <ChevronsRight size={24} className={styles.socialIcon} />; // Default icon
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.profileHeader}>
        <div className={styles.profileImageContainer}>
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt={name || "Profile"}
              className={styles.profileImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none"; // Hide broken image
                // Optionally, show a placeholder div or icon if image fails
                const placeholder = e.target.nextSibling;
                if (
                  placeholder &&
                  placeholder.classList.contains(styles.profileImagePlaceholder)
                ) {
                  placeholder.style.display = "flex";
                }
              }}
            />
          ) : null}
          {/* Fallback Icon if no image URL or image fails to load */}
          {!profileImageUrl && (
            <div className={styles.profileImagePlaceholder}>
              <UserCircle size={80} strokeWidth={1.5} />
            </div>
          )}
          {/* This placeholder is also shown by onError if image fails */}
          <div
            className={`${styles.profileImagePlaceholder} ${styles.hiddenOnErrorPlaceholder}`}
          >
            <UserCircle size={80} strokeWidth={1.5} />
          </div>
        </div>
        <div className={styles.profileInfo}>
          <h1 className={styles.name}>{name || "Your Name"}</h1>
          {tagline && <p className={styles.tagline}>{tagline}</p>}

          <div className={styles.contactDetails}>
            {email && (
              <a href={`mailto:${email}`} className={styles.contactItem}>
                <Mail size={18} className={styles.contactIcon} /> {email}
              </a>
            )}
            {phone && (
              <span className={styles.contactItem}>
                <Phone size={18} className={styles.contactIcon} /> {phone}
              </span>
            )}
            {location && (
              <span className={styles.contactItem}>
                <MapPin size={18} className={styles.contactIcon} /> {location}
              </span>
            )}
          </div>

          {socialLinks && socialLinks.length > 0 && (
            <div className={styles.socialLinksContainer}>
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className={styles.socialLink}
                >
                  {getSocialIcon(link.platform)}
                  <span className={styles.socialPlatformName}>
                    {link.platform}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {bio && (
        <section className={styles.bioSection}>
          <h2 className={styles.sectionTitle}>
            <UserCircle size={28} className={styles.sectionTitleIcon} /> About
            Me
          </h2>
          <p className={styles.bioText}>{bio}</p>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className={styles.skillsSection}>
          <h2 className={styles.sectionTitle}>
            <Code size={28} className={styles.sectionTitleIcon} /> Technical
            Skills
          </h2>
          <div className={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <div key={index} className={styles.skillItem}>
                <span className={styles.skillName}>{skill.name}</span>
                {skill.level && (
                  <span className={styles.skillLevel}>{skill.level}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AboutPage;
