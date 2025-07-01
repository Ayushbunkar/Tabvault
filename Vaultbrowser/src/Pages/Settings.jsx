export function Settings() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">⚙️ Settings</h1>
      <p className="mb-2">🔄 Clear all sessions (reset app)</p>
      <button className="bg-red-600 text-white px-4 py-2 rounded">Clear Sessions</button>
      <p className="mt-6 mb-2">⬇️ Export data (coming soon)</p>
    </div>
  );
}