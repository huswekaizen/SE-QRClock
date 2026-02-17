// LoginPage.jsx
import { useState } from "react";

// AdminPage.jsx
export default function AdminPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`
          bg-gray-800 text-gray-100 p-6
          flex flex-col
          md:w-64 md:flex
          ${isSidebarOpen ? "flex" : "hidden"} md:flex
        `}
      >
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
        <nav className="flex flex-col space-y-4">
          <a href="#" className="hover:text-white">Dashboard</a>
          <a href="#" className="hover:text-white">Users</a>
          <a href="#" className="hover:text-white">Settings</a>
          <a href="#" className="hover:text-white">Logout</a>
        </nav>
      </aside>

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <h1 className="font-bold">Admin</h1>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">
          Welcome, Admin, Topurio Apturo
        </h1>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4">Main Content Area</h2>
          <p className="text-gray-700">
            This is where your dashboard components like charts, tables, and stats will go.
          </p>
        </div>
      </main>
    </div>
  );
}
