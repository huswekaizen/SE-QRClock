// src/layouts/AdminLayout.jsx
import { useState, useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { supabaseAuth } from "../utils/supabaseClient";
import LogoutFunction from "../utils/logoutFunction";

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

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`text-gray-100 p-6 flex flex-col md:w-64 md:flex ${
          isSidebarOpen ? "flex" : "hidden"
        } md:flex bg-[#22262A]`}
      >
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
        <nav className="flex flex-col space-y-4">
            <Link to="/admin" className="hover:text-white">Dashboard</Link>
            <Link to="/admin/employees" className="hover:text-white">Employees</Link>
            <Link to="/admin/attendance" className="hover:text-white">Attendance</Link>
            <Link to="/admin/generate-qr" className="hover:text-white">Generate QR</Link>
            <Link to="/admin/reports" className="hover:text-white">Reports</Link>
            <Link to="/admin/settings" className="hover:text-white">Settings</Link>
            <button onClick={handleLogout} className="text-left hover:text-white">Logout</button>
        </nav>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <h1 className="font-bold">Admin</h1>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Main Content injected here */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
