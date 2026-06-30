import { Link } from "react-router-dom";
import {
  FaHome,
  FaFileAlt,
  FaGithub,
  FaChartLine,
  FaRocket,
  FaSignInAlt,
  FaBriefcase,
  FaUserTie,
} from "react-icons/fa";

import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaRocket />
        <span>SkillTwin</span>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">
            <FaHome /> Home
          </Link>
        </li>

        <li>
          <Link to="/resume">
            <FaFileAlt /> Resume
          </Link>
        </li>

        <li>
          <Link to="/github">
            <FaGithub /> GitHub
          </Link>
        </li>

        <li>
          <Link to="/dashboard">
            <FaChartLine /> Dashboard
          </Link>
        </li>

        <li>
          <Link to="/career">
            <FaBriefcase /> Career
          </Link>
        </li>

        <li>
          <Link to="/interview">
            <FaUserTie /> Interview
          </Link>
        </li>

        <li>
          <Link to="/login">
            <FaSignInAlt /> Login
          </Link>
        </li>
      </ul>

      <button className="nav-btn">
        Get Started
      </button>
    </nav>
  );
}

export default Navbar;