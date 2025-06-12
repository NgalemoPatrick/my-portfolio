// frontend/src/components/Navbar.js
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css"; // Import CSS Module

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.navLogo} onClick={closeMenu}>
          Patrick Ngalemo
        </Link>

        <div className={styles.menuIcon} onClick={toggleMenu}>
          {/* Basic hamburger/close icon using spans */}
          <span
            className={`${styles.iconBar} ${isOpen ? styles.iconBarOpen1 : ""}`}
          ></span>
          <span
            className={`${styles.iconBar} ${isOpen ? styles.iconBarOpen2 : ""}`}
          ></span>
          <span
            className={`${styles.iconBar} ${isOpen ? styles.iconBarOpen3 : ""}`}
          ></span>
        </div>

        <ul
          className={`${styles.navMenu} ${isOpen ? styles.navMenuActive : ""}`}
        >
          <li className={styles.navItem}>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={closeMenu}
            >
              About Me
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={closeMenu}
            >
              Projects
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/resume"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={closeMenu}
            >
              Resume
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={closeMenu}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
