function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">

        <span className="tag">
          🚀 AI-Powered Career Growth Platform
        </span>

        <h1>
          Build Your Engineering
          <br />
          Career with AI
        </h1>

        <p>
          Hi, I'm <strong>Sirjan Kaur</strong>, creator of SkillTwin.
          Helping students improve resumes, GitHub profiles, projects,
          and technical skills using Artificial Intelligence.
        </p>

        <div className="buttons">
          <button>Get Started</button>
          <button className="secondary">Watch Demo</button>
        </div>

        <div className="creator-card">
          <h3>👩‍💻 Created by</h3>
          <h2>Sirjan Kaur</h2>
          <p>AI Enthusiast • Full Stack Developer</p>
          <p>
            Building SkillTwin to help students become internship and
            placement ready.
          </p>
        </div>

      </div>

      <div className="hero-right">

        <div className="dashboard">

          <div className="score-card">
            <h3>Career Score</h3>

            <div className="score-circle">
              <span>85%</span>
            </div>

            <p>Excellent Progress 🚀</p>
          </div>

          <div className="strength-card">
            <h3>AI Analysis</h3>

            <ul>
              <li>✅ Resume Score : 91%</li>
              <li>✅ GitHub Score : 84%</li>
              <li>✅ Skills Score : 87%</li>
            </ul>
          </div>

          <div className="recommend-card">
            <h3>AI Recommendation</h3>

            <p>
              Learn React + Node.js and build three full-stack projects.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;