// EmployeePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutFunction from "../utils/logoutFunction";
import { supabaseAuth } from "../utils/supabaseClient.js";

export default function EmployeePage() {
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
  }, []);

  const handleLogout = async () => {
    await LogoutFunction();   // ends session in Supabase
    navigate("/", { replace: true });       // redirect to login
  };

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
        <h1 className="text-xl font-bold mb-6">Employee</h1>
        <nav className="flex flex-col space-y-4">
          <a href="#" className="hover:text-white">Profile</a>
          <a href="#" className="hover:text-white">Settings</a>
          <a href="#" className="hover:text-white" onClick={handleLogout}>Logout</a>
        </nav>
      </aside>

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <h1 className="font-bold">Employee</h1>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          Welcome, Employee
        </h1>
        <div className="flex flex-col space-y-6">
          <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-medium">
            Clock In
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-medium">
            Clock Out
          </button>
        </div>
      </main>
    </div>
  );
}
