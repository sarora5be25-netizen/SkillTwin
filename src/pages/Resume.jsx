import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CircularProgressbar } from "react-circular-progressbar";
import { pdfjs } from "react-pdf";
import "react-circular-progressbar/dist/styles.css";
import "./Resume.css";

import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const skillDatabase = [
  "react",
  "javascript",
  "typescript",
  "html",
  "css",
  "tailwind",
  "bootstrap",
  "node",
  "express",
  "mongodb",
  "mysql",
  "sql",
  "firebase",
  "git",
  "github",
  "python",
  "java",
  "c++",
  "c",
  "aws",
  "docker",
  "linux",
  "rest api",
  "vite",
];

function Resume() {
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(0);
  const [detectedSkills, setDetectedSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  async function analyzeResume(file) {
    setLoading(true);

    try {
      const buffer = await file.arrayBuffer();

      const pdf = await pdfjs.getDocument({
        data: buffer,
      }).promise;

      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);

        const content = await page.getTextContent();

        text +=
          " " +
          content.items
            .map((item) => item.str)
            .join(" ");
      }

      text = text.toLowerCase();

      const found = skillDatabase.filter((skill) =>
        text.includes(skill)
      );

      const missing = skillDatabase.filter(
        (skill) => !found.includes(skill)
      );

      let ats = 35;

      ats += found.length * 5;

      if (text.length > 1000) ats += 10;
      if (text.includes("project")) ats += 5;
      if (text.includes("education")) ats += 5;
      if (text.includes("experience")) ats += 5;

      if (ats > 100) ats = 100;

      setDetectedSkills(found);
      setMissingSkills(missing.slice(0, 8));
      setScore(ats);

      if (auth.currentUser) {
        await setDoc(
          doc(db, "users", auth.currentUser.uid),
          {
            resumeScore: ats,
            detectedSkills: found,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    } catch (e) {
      console.error(e);
      alert("Unable to read PDF.");
    }

    setLoading(false);
  }

  const onDrop = async (acceptedFiles) => {
    const resume = acceptedFiles[0];

    if (!resume) return;

    setFile(resume);

    await analyzeResume(resume);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div className="resume-page">
      <h1>📄 AI Resume Analyzer</h1>

      <div {...getRootProps()} className="drop-box">
        <input {...getInputProps()} />

        {!file ? (
          <>
            <h2>Upload Resume</h2>
            <p>Drag & Drop PDF here</p>
          </>
        ) : (
          <>
            <h2>{file.name}</h2>
            <p>{(file.size / 1024).toFixed(2)} KB</p>
          </>
        )}
      </div>

      {loading && <h2>Analyzing Resume...</h2>}

      {file && !loading && (
        <div className="score-section">
          <div style={{ width: 180 }}>
            <CircularProgressbar
              value={score}
              text={`${score}%`}
            />
          </div>

          <h2>ATS Score</h2>

          <h3>Detected Skills</h3>

          <div className="skill-list">
            {detectedSkills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>

          <h3 style={{ marginTop: 30 }}>
            Recommended Skills
          </h3>

          <div className="skill-list">
            {missingSkills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Resume;