export function SessionDetail({ session }) {
  if (!session) return <p className="text-center p-10">Session not found</p>;
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{session.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{session.date}</p>
      <ul className="list-disc ml-5 mb-4">
        {session.tabs.map((tab, i) => (
          <li key={i}>
            <a href={tab.url} target="_blank" className="text-blue-600 underline">{tab.title}</a>
          </li>
        ))}
      </ul>
      <p className="italic text-gray-700">📝 {session.notes}</p>
    </div>
  );
}