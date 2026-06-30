import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import SkillBadges from "../components/SkillBadges";
import QuickStats from "../components/QuickStats";

import "./Dashboard.css";

function Dashboard() {
  const [careerScore, setCareerScore] = useState(0);
  const [resumeScore, setResumeScore] = useState(0);
  const [githubScore, setGithubScore] = useState(0);
  const [skillsScore, setSkillsScore] = useState(0);

  useEffect(() => {
    async function loadData() {
      if (!auth.currentUser) return;

      const snap = await getDoc(
        doc(db, "users", auth.currentUser.uid)
      );

      if (snap.exists()) {
        const data = snap.data();

        setResumeScore(data.resumeScore || 0);
        setGithubScore(data.githubScore || 0);

        const skill = Math.min(
          100,
          (data.detectedSkills?.length || 0) * 10
        );

        setSkillsScore(skill);

        const career = Math.round(
          ((data.resumeScore || 0) +
            (data.githubScore || 0) +
            skill) /
            3
        );

        setCareerScore(career);
      }
    }

    loadData();
  }, []);

  const Card = ({ title, value }) => (
    <div className="dashboard-card">
      <h2>{title}</h2>

      <div className="small-score">
        {value}%
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${value}%`,
          }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-page">

      <h1>📊 Career Dashboard</h1>

      <p>
        Your AI career companion is tracking your progress.
      </p>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h2>Career Score</h2>

          <div className="big-score">
            {careerScore}%
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${careerScore}%`,
              }}
            ></div>
          </div>
        </div>

        <Card
          title="Resume Score"
          value={resumeScore}
        />

        <Card
          title="GitHub Score"
          value={githubScore}
        />

        <Card
          title="Skills Score"
          value={skillsScore}
        />

      </div>

      <QuickStats />

      <SkillBadges />

      <div className="recommendation">
        <h2>🤖 AI Recommendations</h2>

        <ul>
          <li>🚀 Build one Full Stack MERN project</li>
          <li>💻 Practice DSA daily</li>
          <li>📂 Push every project to GitHub</li>
          <li>🧠 Learn REST APIs</li>
          <li>📄 Improve ATS Resume</li>
          <li>🎯 Apply to internships every week</li>
        </ul>
      </div>

    </div>
  );
}

export default Dashboard;