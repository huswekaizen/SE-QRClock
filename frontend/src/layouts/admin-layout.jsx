// src/layouts/AdminLayout.jsx
import { useState, useEffect } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { supabaseAuth } from "../utils/supabaseClient";
import LogoutFunction from "../utils/logoutFunction";

import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  QrCodeIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon
} from "@heroicons/react/24/outline";

export default function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabaseAuth.auth.getSession();
      if (!session) {
        navigate("/", { replace: true });
      }
    };
    checkSession();
  }, [navigate]);

  const handleLogout = async () => {
    await LogoutFunction();
    navigate("/", { replace: true });
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 block px-4 py-2 rounded-lg transition font-semibold ${
      isActive
        ? "bg-black text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white text-gray-200 p-6 flex flex-col justify-between
        transform transition-transform duration-300 z-50
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div>
          <div className="mb-8">
            <h1 className="text-xl font-bold text-black">Admin Panel</h1>
            <h4 className="text-gray-400">Admin User</h4>
          </div>

          <nav className="flex flex-col">
            <NavLink to="/admin" end className={navItemClass}>
              <HomeIcon className="w-5 h-5" />
              Home
            </NavLink>
            <NavLink to="/admin/employees" className={navItemClass}>
              <UsersIcon className="w-5 h-5" />
              Employees
            </NavLink>
            <NavLink to="/admin/attendance" className={navItemClass}>
              <ClipboardDocumentListIcon className="w-5 h-5" />
              Attendance
            </NavLink>
            <NavLink to="/admin/generate-qr" className={navItemClass}>
              <QrCodeIcon className="w-5 h-5" />
              Generate QR
            </NavLink>
            <NavLink to="/admin/reports" className={navItemClass}>
              <DocumentChartBarIcon className="w-5 h-5" />
              Reports
            </NavLink>
            <NavLink to="/admin/settings" className={navItemClass}>
              <Cog6ToothIcon className="w-5 h-5" />
              Settings
            </NavLink>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="text-left text-red-400 font-semibold hover:text-red-500 transition"
        >
          <ArrowRightStartOnRectangleIcon className="w-5 h-5 inline-block mr-2" />
          Logout
        </button>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Mobile Toggle */}
        <div className="md:hidden bg-white shadow px-4 py-3">
          <button
            className="text-gray-700"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
        </div>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}