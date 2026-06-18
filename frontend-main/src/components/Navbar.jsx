import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { fetchNotifications }
  from "../services/userService";

import "./navbar.css";

import logo
  from "../assets/github-mark-white.svg";
const Navbar = () => {
  const [notificationCount, setNotificationCount] =
    useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {

    const loadCount = async () => {

      try {

        const userId =
          localStorage.getItem("userId");

        if (!userId) return;

        const notifications =
          await fetchNotifications(userId);

        setNotificationCount(
          notifications.length
        );

      } catch (err) {

        console.error(err);

      }

    };

    loadCount();

  }, []);
  return (
    <nav className="navbar">

      <div className="nav-left">

        <Link to="/">
          <div className="nav-logo">

            <img
              src={logo}
              alt="GitHub Logo"
            />

            <h3>GitHub</h3>

          </div>
        </Link>

      </div>

      <div className="nav-center">



      </div>

      <button
        className="nav-hamburger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-menu-container ${isMenuOpen ? "active" : ""}`}>
        <div className="nav-links">

          <Link to="/explore" onClick={() => setIsMenuOpen(false)}>
            <span>Explore</span>
          </Link>

          <Link to="/repositories" onClick={() => setIsMenuOpen(false)}>
            <span>Repositories</span>
          </Link>

        </div>

        <div className="nav-right">

          <Link to="/notifications" onClick={() => setIsMenuOpen(false)}>

            <div className="notification-wrapper">

              <button
                className="notification-btn"
              >
                🔔
              </button>

              {notificationCount > 0 && (

                <span
                  className="notification-badge"
                >
                  {notificationCount}
                </span>

              )}

            </div>

          </Link>

          <Link to="/create" onClick={() => setIsMenuOpen(false)}>
            <button className="create-btn">
              Create Repository
            </button>
          </Link>

          <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
            <button className="profile-btn">
              Profile
            </button>
          </Link>

          <button

            className="logout-btn"

            onClick={() => {

              localStorage.removeItem(
                "userId"
              );

              localStorage.removeItem(
                "username"
              );

              localStorage.removeItem(
                "token"
              );

              window.location.replace(
                "/auth"
              );

            }}
          >
            Logout
          </button>

        </div>
      </div>

    </nav>
  );
};

export default Navbar;