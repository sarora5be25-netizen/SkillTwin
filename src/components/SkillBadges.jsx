import {
  FaReact,
  FaJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
} from "react-icons/fa";

import "./SkillBadges.css";

function SkillBadges() {
  const skills = [
    { name: "React", icon: <FaReact color="#61DBFB" /> },
    { name: "JavaScript", icon: <FaJs color="#F7DF1E" /> },
    { name: "Python", icon: <FaPython color="#3776AB" /> },
    { name: "HTML", icon: <FaHtml5 color="#E34F26" /> },
    { name: "CSS", icon: <FaCss3Alt color="#1572B6" /> },
    { name: "Git", icon: <FaGitAlt color="#F05032" /> },
  ];

  return (
    <div className="skills-section">
      <h2>🚀 Top Skills</h2>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div className="skill-card" key={index}>
            <div className="skill-icon">{skill.icon}</div>
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillBadges;