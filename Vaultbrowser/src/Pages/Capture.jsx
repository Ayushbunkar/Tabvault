export function Capture() {
  const [title, setTitle] = useState("");
  const [tabs, setTabs] = useState([{ title: "", url: "" }]);
  const [notes, setNotes] = useState("");

  const handleTabChange = (i, field, value) => {
    const newTabs = [...tabs];
    newTabs[i][field] = value;
    setTabs(newTabs);
  };
  // ds

  const addTabField = () => setTabs([...tabs, { title: "", url: "" }]);

  const saveSession = async () => {
    const date = new Date().toISOString().split("T")[0];
    const payload = { title, tabs, notes, date };
    await fetch("http://localhost:5000/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    alert("Session saved!");
    setTitle(""); setTabs([{ title: "", url: "" }]); setNotes("");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📥 Capture Session Manually</h1>
      <input type="text" placeholder="Session Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded mb-4" />
      {tabs.map((tab, i) => (
        <div key={i} className="grid grid-cols-2 gap-4 mb-2">
          <input type="text" placeholder="Tab Title" value={tab.title} onChange={(e) => handleTabChange(i, "title", e.target.value)} className="p-2 border rounded" />
          <input type="url" placeholder="Tab URL" value={tab.url} onChange={(e) => handleTabChange(i, "url", e.target.value)} className="p-2 border rounded" />
        </div>
      ))}
      <button onClick={addTabField} className="text-blue-600 underline mb-4">+ Add Another Tab</button>
      <textarea placeholder="Notes..." value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-2 border rounded mb-4" />
      <button onClick={saveSession} className="bg-green-600 text-white px-4 py-2 rounded">Save Session</button>
    </div>
  );
}