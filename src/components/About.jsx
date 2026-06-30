function About() {
  return (
    <section className="about">
      <h2>Why SkillTwin?</h2>

      <p>
        SkillTwin is an AI-powered career platform designed to help students
        become internship and placement ready. Instead of using multiple
        websites, SkillTwin brings resume analysis, GitHub review, AI career
        guidance, and personalized learning roadmaps into one platform.
      </p>

      <div className="about-grid">
        <div className="about-box">
          <h3>🎯 Personalized Guidance</h3>
          <p>Receive AI recommendations based on your skills and goals.</p>
        </div>

        <div className="about-box">
          <h3>⚡ Save Time</h3>
          <p>Everything you need for career growth is available in one place.</p>
        </div>

        <div className="about-box">
          <h3>🚀 Internship Ready</h3>
          <p>Build projects, improve your profile, and prepare for interviews.</p>
        </div>
      </div>
    </section>
  );
}

export default About;