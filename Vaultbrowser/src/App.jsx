import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Capture } from "./pages/Capture";
import { SessionDetail } from "./pages/SessionDetail";
import { Settings } from "./pages/Settings";
import { NotFound } from "./pages/NotFound";
import { Navbar } from "./components/Navbar";

function App() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/sessions")
      .then(res => res.json())
      .then(data => setSessions(data));
  }, []);

  const restoreSession = (tabs) => {
    tabs.forEach(tab => window.open(tab.url, "_blank"));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home sessions={sessions} restoreSession={restoreSession} />} />
        <Route path="/capture" element={<Capture />} />
        <Route path="/session/:id" element={<SessionDetail session={sessions[0]} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

