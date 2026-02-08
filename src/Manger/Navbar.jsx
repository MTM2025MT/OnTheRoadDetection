import React, { useState } from 'react';
import './NavbarManger.css'; // Make sure to import the CSS file
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbarManger">
      {/* LEFT SIDE */}
      <div className="nav-left">
        {/* HAMBURGER ICON (Visible on Mobile) */}
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="logo">
          <svg
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3.5,12 C3.5,10 5,8.5 7,8.5 C9,8.5 10,10 12,12 C14,14 15,15.5 17,15.5 C19,15.5 20.5,14 20.5,12" />
            <path d="M3.5,16 C5.5,16 7,14 9,12" opacity="0.6" />
          </svg>
        </div>

        {/* MENU LINKS */}
        {/* We toggle the "active" class based on the state */}
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li><Link to="/manager">Main</Link></li>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><Link to="/manager/employeemanagement">CreateUser</Link></li>
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">
        {/* <button className="btn-new-job">
          <span style={{ fontSize: '18px', lineHeight: '1' }}>+</span>
          <span className="btn-text">New Job</span>
        </button> */}

        <div className="notification-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </div>

        <img
          src="https://i.pravatar.cc/150?img=11"
          alt="Profile"
          className="profile-pic"
        />
      </div>
    </nav>
  );
};

export default Navbar;