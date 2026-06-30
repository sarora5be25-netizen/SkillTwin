import { useState } from "react";
import { askGemini } from "../gemini";
import "./AIChat.css";

function AIChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!message.trim()) return;

    const question = message;

    setLoading(true);

    try {
      const answer = await askGemini(question);

      setChat((prev) => [
        ...prev,
        {
          question,
          answer,
        },
      ]);

      setMessage("");
    } catch (err) {
      setChat((prev) => [
        ...prev,
        {
          question,
          answer: "Unable to contact Gemini AI.",
        },
      ]);
    }

    setLoading(false);
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
            disabled={loading}
          >
            {loading ? "Thinking..." : "Ask AI"}
          </button>

        </div>
      )}
    </>
  );
}

export default AIChat;