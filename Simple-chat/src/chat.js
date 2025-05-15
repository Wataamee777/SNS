import React, { useState, useEffect } from "react";

export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("chat_messages");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage = {
      user,
      text: input.trim(),
      time: new Date().toLocaleTimeString()
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h2>チャットルーム</h2>
      <p>ログイン中: <strong>{user}</strong></p>

      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="メッセージを入力"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          style={{ width: "70%", padding: "6px", marginRight: 10 }}
        />
        <button onClick={handleSend} style={{ padding: "6px 12px" }}>
          送信
        </button>
      </div>

      <div style={{
        border: "1px solid #ccc",
        padding: 10,
        borderRadius: 5,
        height: 300,
        overflowY: "scroll",
        backgroundColor: "#f9f9f9"
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            marginBottom: 8,
            padding: 5,
            backgroundColor: msg.user === user ? "#d0f0d0" : "#e0e0e0",
            borderRadius: 4
          }}>
            <strong>{msg.user}</strong> <small style={{ float: "right" }}>{msg.time}</small>
            <div>{msg.text}</div>
          </div>
        ))}
      </div>
    </div>
  useEffect(() => {
  // ↓ 将来的にサーバーからメッセージ取得
  // fetch("/api/messages")
  //   .then(res => res.json())
  //   .then(data => setMessages(data));

  // 今はローカル保存から取得
  const saved = localStorage.getItem("chat_messages");
  if (saved) {
    setMessages(JSON.parse(saved));
  }
}, []);

const handleSend = async () => {
  if (input.trim() === "") return;

  const newMessage = {
    user,
    text: input.trim(),
    time: new Date().toLocaleTimeString(),
  };

  const updated = [...messages, newMessage];
  setMessages(updated);
  setInput("");

  // ↓ 将来的にサーバーに保存
  // await fetch("/api/messages", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(newMessage),
  // });

  // 今はローカル保存
  localStorage.setItem("chat_messages", JSON.stringify(updated));
};
            }
