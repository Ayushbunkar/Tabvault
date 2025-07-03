// // src/pages/AddSession.jsx
// import React, { useState } from "react";

// export function AddSession() {
//   const [title, setTitle] = useState("");
//   const [tabs, setTabs] = useState([{ title: "", url: "" }]);
//   const [notes, setNotes] = useState("");

//   const handleTabChange = (index, field, value) => {
//     const updatedTabs = [...tabs];
//     updatedTabs[index][field] = value;
//     setTabs(updatedTabs);
//   };

//   const addNewTab = () => {
//     setTabs([...tabs, { title: "", url: "" }]);
//   };

//   const saveSession = () => {
//     if (!title.trim()) return alert("Session title is required");
//     const newSession = {
//       id: Date.now(),
//       title,
//       date: new Date().toLocaleDateString(),
//       tabs: tabs.filter(tab => tab.url.trim()),
//       notes,
//     };
//     const existing = JSON.parse(localStorage.getItem("tabVaultSessions") || "[]");
//     localStorage.setItem("tabVaultSessions", JSON.stringify([newSession, ...existing]));
//     alert("Session saved!");
//     setTitle("");
//     setTabs([{ title: "", url: "" }]);
//     setNotes("");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">➕ Save a New Tab Session</h1>

//         <input
//           className="w-full border p-2 rounded mb-4"
//           placeholder="Session Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         {tabs.map((tab, index) => (
//           <div key={index} className="flex gap-2 mb-2">
//             <input
//               className="flex-1 border p-2 rounded"
//               placeholder="Tab Title"
//               value={tab.title}
//               onChange={(e) => handleTabChange(index, "title", e.target.value)}
//             />
//             <input
//               className="flex-1 border p-2 rounded"
//               placeholder="Tab URL"
//               value={tab.url}
//               onChange={(e) => handleTabChange(index, "url", e.target.value)}
//             />
//           </div>
//         ))}

//         <button
//           onClick={addNewTab}
//           className="text-blue-600 hover:underline text-sm mb-4"
//         >
//           ➕ Add Another Tab
//         </button>

//         <textarea
//           className="w-full border p-2 rounded mb-4"
//           rows={3}
//           placeholder="Notes (optional)"
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//         ></textarea>

//         <button
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={saveSession}
//         >
//           💾 Save Session
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddSession = () => {
  const [name, setName] = useState("");
  const [urls, setUrls] = useState([""]);
  const navigate = useNavigate();

  const handleAddField = () => {
    setUrls([...urls, ""]);
  };

  const handleChange = (i, value) => {
    const newUrls = [...urls];
    newUrls[i] = value;
    setUrls(newUrls);
  };

  const saveSession = () => {
    const session = {
      name,
      date: new Date().toLocaleString(),
      urls: urls.filter((u) => u),
    };

    const existing = JSON.parse(localStorage.getItem("tabSessions")) || [];
    existing.push(session);
    localStorage.setItem("tabSessions", JSON.stringify(existing));
    navigate("/");
  };

  return (
    <div className="p-4 min-h-screen bg-white">
      <h1 className="text-xl font-bold mb-4">➕ Add New Session</h1>

      <input
        className="border p-2 mb-4 w-full"
        placeholder="Session Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {urls.map((url, i) => (
        <input
          key={i}
          className="border p-2 mb-2 w-full"
          placeholder={`URL ${i + 1}`}
          value={url}
          onChange={(e) => handleChange(i, e.target.value)}
        />
      ))}

      <button
        className="bg-gray-500 text-white px-3 py-1 rounded mr-3"
        onClick={handleAddField}
      >
        ➕ Add URL
      </button>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={saveSession}
      >
        💾 Save Session
      </button>
    </div>
  );
};

export default AddSession;

