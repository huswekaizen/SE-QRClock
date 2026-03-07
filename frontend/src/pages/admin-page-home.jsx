// LoginPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutFunction from "../utils/logoutFunction.jsx";
import { supabaseAuth } from "../utils/supabaseClient.js";

import AdminLayout from "../layouts/admin-layout.jsx";
import StatusCard from "../components/status-card.jsx";
import {
  UsersIcon,
  ClipboardDocumentListIcon,
  QrCodeIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";


export default function AdminPageHome() {

  const [totalEmployees, setTotalEmployees] = useState(0);

  async function fetchTotalEmployees() {
    try {
      const res = await fetch("http://localhost:5000/api/admin-dashboard");
      const data = await res.json();
      setTotalEmployees(data.totalEmployees);
    } catch (error) {
      console.error("Error fetching total employees:", error);
    }
  }

  useEffect(() => {
        fetchTotalEmployees();
    }, []);


  return (
    <div className="space-y-8 p-4">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Summary of system activity and statistics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard
          title="Total Employees"
          value={totalEmployees}
          Icon={UsersIcon}
          iconColor="text-blue-500"
        />
        <StatusCard
          title="Today's Attendance"
          value={0}
          Icon={ClipboardDocumentListIcon}
          iconColor="text-green-500"
        />
        <StatusCard
          title="QR Generated"
          value={0}
          Icon={QrCodeIcon}
          iconColor="text-purple-500"
        />
        <StatusCard
          title="Reports Created"
          value={0}
          Icon={DocumentChartBarIcon}
          iconColor="text-orange-500"
        />
      </div>

      {/* Placeholder Section for Charts or Table */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <div className="text-gray-500 text-sm">
          Activity data will appear here.
        </div>
      </div>
    </div>
  );
}