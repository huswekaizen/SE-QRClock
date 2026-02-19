// LoginPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutFunction from "../utils/logoutFunction";
import { supabaseAuth } from "../utils/supabaseClient.js";

import AdminLayout from "../layouts/admin-layout.jsx";
import FunctionSmallButton from "../components/functional-small-button.jsx";
import CreateEmployee from "../components/create-employee.jsx";

export default function AdminPageEmployees() {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <>
            <h1 className="text-3xl font-semibold mb-6">Employees</h1>
            <div >
                <div className="flex items-center justify-between gap-44 mb-[34px]">
                    <input
                        type="search"
                        placeholder="Search Employees..."
                        className="p-2 border border-gray-300 rounded-lg w-[400px] h-[40px]"
                    />
                    <FunctionSmallButton label="+ Create Employee" onClick={() => setModalOpen(true)} />
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                Employee table goes here
                </div>
            </div>
            <CreateEmployee
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
            />
        
        </>
    );
}
