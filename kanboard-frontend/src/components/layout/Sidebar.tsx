import React from "react";
import { Link } from "react-router-dom";

export const Sidebar: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <nav className="space-y-2">
        <Link
          to="/dashboard"
          className="block text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          Dashboard
        </Link>
        <Link
          to="/"
          className="block text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          Boards
        </Link>
      </nav>
    </div>
  );
};
