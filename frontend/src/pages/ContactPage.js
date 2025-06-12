// frontend/src/pages/ContactPage.js
import React, { useState } from "react";
import { submitContactForm } from "../services/apiService";
import { Send, User, Mail, MessageSquare } from "lucide-react"; // Icons
import styles from "./ContactPage.module.css"; // Import CSS Module

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null); // null, true, or false
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage("Please fill in all fields.");
      setIsSuccess(false);
      return;
    }
    setIsSubmitting(true);
    setStatusMessage("");
    try {
      const response = await submitContactForm(formData);
      if (response.success) {
        setStatusMessage(
          response.message || "Message sent successfully! Thank you."
        );
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" }); // Clear form
      } else {
        setStatusMessage(
          response.message || "Failed to send message. Please try again."
        );
        setIsSuccess(false);
      }
    } catch (error) {
      setStatusMessage("An unexpected error occurred. Please try again later.");
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Get In Touch</h1>
      <p className={styles.subtitle}>
        Have a question or want to work together? Fill out the form below.
      </p>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Your Name
          </label>
          <User className={styles.inputIcon} size={20} />
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className={styles.inputField}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Your Email
          </label>
          <Mail className={styles.inputIcon} size={20} />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={handleChange}
            className={styles.inputField}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="message" className={styles.label}>
            Your Message
          </label>
          <MessageSquare className={styles.textareaIcon} size={20} />
          <textarea
            name="message"
            id="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className={`${styles.inputField} ${styles.textareaField}`}
            required
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          <Send size={18} />
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>

      {statusMessage && (
        <div
          className={`${styles.statusMessage} ${
            isSuccess ? styles.success : styles.error
          }`}
        >
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default ContactPage;
