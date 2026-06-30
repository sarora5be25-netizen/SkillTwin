import { useState } from "react";
import "./Interview.css";

const questions = [
  "Tell me about yourself.",
  "What is React?",
  "Difference between let, var and const?",
  "What is Virtual DOM?",
  "Explain useState.",
  "What is a REST API?",
  "What is Git?",
  "Why should we hire you?",
];

function Interview() {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const nextQuestion = () => {
    if (answer.trim().length < 30) {
      setFeedback("⚠️ Answer is too short.");
      return;
    }

    setFeedback("✅ Good answer. Try adding examples and measurable impact.");
    setAnswer("");

    if (index < questions.length - 1) {
      setTimeout(() => {
        setIndex(index + 1);
        setFeedback("");
      }, 1200);
    }
  };

  return (
    <div className="interview-page">
      <h1>🎤 AI Mock Interview</h1>

      <div className="question-card">
        <h2>Question {index + 1}</h2>

        <p>{questions[index]}</p>

        <textarea
          rows="8"
          placeholder="Type your answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <button onClick={nextQuestion}>
          Submit Answer
        </button>

        {feedback && (
          <div className="feedback-box">
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}

export default Interview;