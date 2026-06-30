import "./Career.css";

const roadmap = [
  {
    title: "Frontend",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "REST API",
      "JWT",
    ],
  },
  {
    title: "Database",
    skills: [
      "MongoDB",
      "Firebase",
      "SQL",
    ],
  },
  {
    title: "Placement",
    skills: [
      "DSA",
      "OOP",
      "DBMS",
      "OS",
      "CN",
    ],
  },
];

function Career() {
  return (
    <div className="career-page">
      <h1>🚀 Career Roadmap</h1>

      <p>
        Follow this roadmap to become internship ready.
      </p>

      <div className="career-grid">
        {roadmap.map((section) => (
          <div
            className="career-card"
            key={section.title}
          >
            <h2>{section.title}</h2>

            <ul>
              {section.skills.map((skill) => (
                <li key={skill}>✅ {skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Career;