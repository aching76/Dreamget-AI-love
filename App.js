
import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await fetch("https://api.chatanywhere.tech/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer free"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: input }]
        })
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Maaf, tidak ada balasan.";

      setMessages([...newMessages, { sender: 'ai', text: reply }]);
    } catch (error) {
      setMessages([...newMessages, { sender: 'ai', text: 'Gagal terhubung ke AI.' }]);
    }
  };

  return (
    <div className="container">
      <h2>DreamGen Gratis</h2>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender}>{msg.sender === 'user' ? '🧍 Kamu:' : '🤖 AI:'} {msg.text}</div>
        ))}
      </div>
      <div className="input-area">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Tulis pesan..." />
        <button onClick={sendMessage}>Kirim</button>
      </div>
    </div>
  );
}

export default App;
