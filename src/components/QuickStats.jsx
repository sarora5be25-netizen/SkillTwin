import "./QuickStats.css";

function QuickStats() {
  const stats = [
    {
      title: "Projects",
      value: "06",
      icon: "📂",
    },
    {
      title: "Certificates",
      value: "08",
      icon: "🏆",
    },
    {
      title: "GitHub",
      value: "Connected",
      icon: "💻",
    },
    {
      title: "Resume",
      value: "Uploaded",
      icon: "📄",
    },
  ];

  return (
    <div className="quick-stats">
      {stats.map((item, index) => (
        <div className="quick-card" key={index}>
          <div className="quick-icon">{item.icon}</div>

          <h2>{item.value}</h2>

          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
}

export default QuickStats;