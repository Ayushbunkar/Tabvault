// src/pages/AddSession.jsx
import React, { useState } from "react";

export function AddSession() {
  const [title, setTitle] = useState("");
  const [tabs, setTabs] = useState([{ title: "", url: "" }]);
  const [notes, setNotes] = useState("");

  const handleTabChange = (index, field, value) => {
    const updatedTabs = [...tabs];
    updatedTabs[index][field] = value;
    setTabs(updatedTabs);
  };

  const addNewTab = () => {
    setTabs([...tabs, { title: "", url: "" }]);
  };

  const saveSession = () => {
    if (!title.trim()) return alert("Session title is required");
    const newSession = {
      id: Date.now(),
      title,
      date: new Date().toLocaleDateString(),
      tabs: tabs.filter(tab => tab.url.trim()),
      notes,
    };
    const existing = JSON.parse(localStorage.getItem("tabVaultSessions") || "[]");
    localStorage.setItem("tabVaultSessions", JSON.stringify([newSession, ...existing]));
    alert("Session saved!");
    setTitle("");
    setTabs([{ title: "", url: "" }]);
    setNotes("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">➕ Save a New Tab Session</h1>

        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Session Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {tabs.map((tab, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              className="flex-1 border p-2 rounded"
              placeholder="Tab Title"
              value={tab.title}
              onChange={(e) => handleTabChange(index, "title", e.target.value)}
            />
            <input
              className="flex-1 border p-2 rounded"
              placeholder="Tab URL"
              value={tab.url}
              onChange={(e) => handleTabChange(index, "url", e.target.value)}
            />
          </div>
        ))}

        <button
          onClick={addNewTab}
          className="text-blue-600 hover:underline text-sm mb-4"
        >
          ➕ Add Another Tab
        </button>

        <textarea
          className="w-full border p-2 rounded mb-4"
          rows={3}
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={saveSession}
        >
          💾 Save Session
        </button>
      </div>
    </div>
  );
}
