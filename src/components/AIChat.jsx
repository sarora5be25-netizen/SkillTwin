import { useState } from "react";
import "./AIChat.css";

const replies = {
  resume:
    "Keep your resume to one page. Add measurable achievements, projects and GitHub links.",
  react:
    "Learn React Router, Context API, Node.js, Express and MongoDB next.",
  internship:
    "Build projects, solve DSA, optimize LinkedIn, keep GitHub active and apply consistently.",
  github:
    "Write proper READMEs, pin your best repositories and commit regularly.",
  interview:
    "Practice HR + DSA + Core CS questions. Mock interviews help a lot.",
  roadmap:
    "Complete HTML → CSS → JavaScript → React → Node → MongoDB → Deployment.",
};

function AIChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const askAI = () => {
    if (!message.trim()) return;

    const input = message.toLowerCase();

    let answer =
      "I'm still learning. Ask about resume, React, GitHub, internship, interview or roadmap.";

    Object.keys(replies).forEach((key) => {
      if (input.includes(key)) {
        answer = replies[key];
      }
    });

    setChat((prev) => [
      ...prev,
      {
        question: message,
        answer,
      },
    ]);

    setMessage("");
  };

  return (
    <>
      <button
        className="chat-button"
        onClick={() => setOpen(!open)}
      >
        🤖
      </button>

      {open && (
        <div className="chat-box">
          <h2>AI Career Assistant</h2>

          <div className="chat-history">
            {chat.map((item, index) => (
              <div key={index}>
                <p><b>You:</b> {item.question}</p>
                <p><b>AI:</b> {item.answer}</p>
                <hr />
              </div>
            ))}
          </div>

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything..."
          />

          <button
            className="send-btn"
            onClick={askAI}
          >
            Ask AI
          </button>
        </div>
      )}
    </>
  );
}

export default AIChat;