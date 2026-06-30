import "./ATSScore.css";

function ATSScore() {
  return (
    <div className="ats-card">

      <h2>🎯 ATS Resume Score</h2>

      <div className="circle-score">
        89%
      </div>

      <h3>Excellent</h3>

      <div className="bar">
        <span>Formatting</span>
        <progress value="95" max="100"></progress>
      </div>

      <div className="bar">
        <span>Keywords</span>
        <progress value="82" max="100"></progress>
      </div>

      <div className="bar">
        <span>Skills</span>
        <progress value="90" max="100"></progress>
      </div>

    </div>
  );
}

export default ATSScore;
