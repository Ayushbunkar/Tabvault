import React from "react";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <h1 className="text-xl font-bold text-blue-700">🌀 TabVault</h1>
      <div className="space-x-4">
        <Link
          to="/"
          className={`text-sm font-medium ${
            location.pathname === "/" ? "text-blue-600" : "text-gray-600"
          } hover:text-blue-700`}
        >
          🏠 Home
        </Link>
        <Link
          to="/add"
          className={`text-sm font-medium ${
            location.pathname === "/add" ? "text-green-600" : "text-gray-600"
          } hover:text-green-700`}
        >
          ➕ Add Session
        </Link>
      </div>
    </nav>
  );
}
