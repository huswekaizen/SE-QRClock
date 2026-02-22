// LoginPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutFunction from "../utils/logoutFunction";
import { supabaseAuth } from "../utils/supabaseClient.js";

import AdminLayout from "../layouts/admin-layout.jsx";


export default function AdminPage() {
  return (
      <>
        <h1 className="text-3xl font-semibold mb-6">Welcome, Admin</h1>
        <div className="bg-white shadow rounded-lg p-6">
          Home page of the admin Page
        </div>
      </>
  );
}
