// Home.jsx - Loads sessions from localStorage with working restore functionality
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Home() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tabVaultSessions") || "[]");
    setSessions(stored);
  }, []);

  const restoreSession = (tabs) => {
    let popupBlocked = false;
    tabs.forEach((tab) => {
      const win = window.open(tab.url, "_blank");
      if (!win) popupBlocked = true;
    });
    if (popupBlocked) {
      alert("⚠️ Popup blocked by browser. Please allow popups for this site.");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat px-4 py-10 flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1549921296-3a4c2e6d8796?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 max-w-3xl mx-auto text-white w-full">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center mb-4 drop-shadow-xl"
        >
          🌀 Welcome to TabVault
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-gray-300 mb-10 text-lg"
        >
          Save your browser tab sessions, keep notes, and restore them anytime.
        </motion.p>

        <div className="grid gap-6">
          {sessions.length > 0 ? (
            sessions.map((session, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white text-gray-800 rounded-xl shadow-lg p-6 backdrop-blur-sm hover:shadow-2xl transition"
              >
                <h2 className="text-xl font-bold mb-1">📁 {session.title}</h2>
                <p className="text-sm text-gray-500">📅 {session.date}</p>
                <ul className="list-disc list-inside text-blue-600 mt-3 space-y-1">
                  {session.tabs.map((tab, i) => (
                    <li key={i}>
                      <a
                        href={tab.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-blue-700"
                      >
                        {tab.title || tab.url}
                      </a>
                    </li>
                  ))}
                </ul>
                {session.notes && (
                  <p className="mt-3 italic text-gray-700">📝 {session.notes}</p>
                )}
                <button
                  className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded hover:from-purple-600 hover:to-blue-600 transition"
                  onClick={() => restoreSession(session.tabs)}
                >
                  🔄 Restore Session
                </button>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/20 text-white text-center rounded-xl p-6 border border-white/30"
            >
              No sessions saved yet.
            </motion.div>
          )}
        </div>

        <div className="mt-10 text-center">
          <a href="/add">
            <button className="bg-white text-blue-700 px-5 py-2 rounded-full font-semibold shadow hover:shadow-xl transition">
              ➕ Add New Session
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
