import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

/* ================= CONFIG ================= */

// ❗ FRONTEND API KEY (VISIBLE IN BROWSER)
const TAVILY_API_KEY = "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";

/* ================= MAIN PAGE ================= */

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi 👋 I'm your Football AI assistant. Ask me anything!"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");

    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
      const botText = await fetchFromTavily(userText);
      setMessages(prev => [...prev, { role: "assistant", text: botText }]);
      speak(botText);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "⚠️ Error contacting Tavily API." }
      ]);
    }

    setLoading(false);
  }

  return (
    <>
      <style>{`
        .chat-page {
          height: calc(100vh - 80px);
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          background: radial-gradient(circle at top, #1b5e20, #0b3d2e);
          color: white;
        }

        .chat-panel {
          display: flex;
          flex-direction: column;
          padding: 20px;
          backdrop-filter: blur(14px);
          background: rgba(0,0,0,0.55);
        }

        .messages {
          flex: 1;
          overflow-y: auto;
          margin-top: 10px;
        }

        .msg {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 14px;
          margin-bottom: 12px;
          line-height: 1.4;
          font-size: 14px;
        }

        .user {
          background: #ffd54f;
          color: black;
          align-self: flex-end;
        }

        .assistant {
          background: rgba(255,255,255,0.15);
          align-self: flex-start;
        }

        .input-bar {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .input-bar input {
          flex: 1;
          padding: 12px;
          border-radius: 10px;
          border: none;
          outline: none;
        }

        .input-bar button {
          padding: 12px 18px;
          border-radius: 10px;
          background: #ffd54f;
          border: none;
          cursor: pointer;
          font-weight: bold;
        }

        .avatar-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.35);
        }

        .loading {
          opacity: 0.6;
          font-style: italic;
        }
      `}</style>

      <div className="chat-page">
        {/* CHAT */}
        <div className="chat-panel">
          <h2>⚽ Football AI Assistant</h2>

          <div className="messages">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="msg assistant loading">Thinking…</div>
            )}
            <div ref={endRef} />
          </div>

          <div className="input-bar">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask about formations, players, tactics..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>

        {/* 3D AVATAR */}
        <div className="avatar-panel">
          <Avatar3D />
        </div>
      </div>
    </>
  );
}

/* ================= TAVILY FRONTEND CALL ================= */

async function fetchFromTavily(query) {
  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TAVILY_API_KEY}`
    },
    body: JSON.stringify({
      query,
      search_depth: "advanced",
      include_answer: true
    })
  });

  const data = await response.json();

  return (
    data.answer ||
    data.results?.[0]?.content ||
    "I couldn't find a good answer."
  );
}

/* ================= VOICE OUTPUT ================= */

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.pitch = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

/* ================= 3D AVATAR ================= */

function Avatar3D() {
  return (
    <Canvas camera={{ position: [0, 1.6, 3] }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 5, 5]} />
      {/* Placeholder avatar */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#ffd54f" />
      </mesh>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
