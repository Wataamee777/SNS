import React, { useState } from "react";

export default function SimpleChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="メッセージを入力"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
        style={{ width: "300px", marginRight: 10 }}
      />
      <button onClick={handleSend}>送信</button>

      <div style={{ marginTop: 20 }}>
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
    </div>
  );
}
