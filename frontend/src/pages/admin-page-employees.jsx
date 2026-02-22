// LoginPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutFunction from "../utils/logoutFunction";
import { supabaseAuth } from "../utils/supabaseClient.js";

import AdminLayout from "../layouts/admin-layout.jsx";
import FunctionSmallButton from "../components/functional-small-button.jsx";
import CreateEmployeeModal from "../components/create-employee-modal.jsx";
import EditEmployeeModal from "../components/edit-employee-modal.jsx";
import SuccessModal from "../components/success-modal.jsx";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function AdminPageEmployees() {
    const [employees, setEmployees] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [isCreateModalOpen, setCreateModal] = useState(false);
    const [isEditModalOpen, setEditModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isSuccessOpen, setSuccessOpen] = useState(false);

    const fetchEmployees = async () => {
        try {
        const response = await fetch("http://localhost:5000/api/employee-list");
        const data = await response.json();

        if (response.ok) {
            setEmployees(data);
        } else {
            console.error(data.error);
        }
        } catch (err) {
        console.error("Failed to fetch employees", err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleCreateEmployee = async (employeeData, setModalError) => {
        const response = await fetch("http://localhost:5000/api/create-employee", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employeeData),
        });

        const result = await response.json();

        if (response.ok) {
            setCreateModal(false);
            setSuccessMessage("Employee created successfully!");
            setSuccessOpen(true);
            fetchEmployees();
            return true;
        } else {
            console.error(result.error);
            setModalError(result.error || "Something went wrong");
            return false;
        }
    };

    const handleEditEmployee = async (employeeData, setError) => {

        if (!selectedEmployee) return false;

        try {
            const response = await fetch(`http://localhost:5000/api/edit-employee/${selectedEmployee.id}`, {
                method: "PUT", // PUT for updates
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employeeData),
            });

            const result = await response.json();

             if (response.ok) {
                setEditModal(false);
                setSuccessMessage("Employee updated successfully!");
                setSuccessOpen(true);
                fetchEmployees();
                return true;
            }

            if (!response.ok) {
                if (setError) setError(result.error || "Failed to update employee");
                return false;
            }

            return true;
        } catch (error) {
            console.error(error);
            if (setError) setError("Failed to update employee");
            return false;
        }
    };

    return (
        <>
            <div className="flex flex-col mb-6"> 
                <h1 className="text-3xl font-semibold mb-[4px]">Employee's list</h1>
                <p className="text-gray-400">Check / Manage Employees</p>
            </div>
            <div >
                <div className="flex flex-row-reverse items-center justify-between gap-44 mb-[34px]">
                    <input
                        type="search"
                        placeholder="Search Employees..."
                        className="p-2 border border-gray-300 rounded-lg w-[400px] h-[40px]"
                    />
                    <FunctionSmallButton label="+ Create Employee" onClick={() => setCreateModal(true)} />
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2">Full Name</th>
                                <th className="py-2">Email</th>
                                <th className="py-2">Role</th>
                                <th className="py-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="py-4 text-center text-gray-400">
                                        No employees found
                                    </td>
                                </tr>
                            ) : (
                                employees.map((emp) => (
                                    <tr key={emp.id} className="border-b hover:bg-gray-50">
                                        <td className="py-2">{emp.full_name}</td>
                                        <td className="py-2">{emp.email}</td>
                                        <td className="py-2 capitalize">{emp.role}</td>

                                        <td className="py-2 text-right space-x-2 flex justify-end">

                                            <PencilIcon
                                                onClick={() => {
                                                    setSelectedEmployee(emp); 
                                                    setEditModal(true)
                                                }}
                                                
                                                className="w-5 h-5 text-gray-500 hover:text-blue-700 cursor-pointer"
                                            />

                                            <TrashIcon
                                                onClick={() => {
                                                    setSelectedEmployee(emp);
                                                    handleDelete(emp.id);
                                                }}
                                                className="w-5 h-5 text-gray-500 hover:text-red-700 cursor-pointer"
                                            />
                                            <EyeIcon
                                                onClick={() => {
                                                    setSelectedEmployee(emp);
                                                    handleView(emp);
                                                }}
                                                className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer"
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <CreateEmployeeModal
                isOpen={isCreateModalOpen}
                onClose={() => setCreateModal(false)}
                onSubmit={handleCreateEmployee}
            />
            <SuccessModal
                isOpen={isSuccessOpen}
                message={successMessage}
                onClose={() => setSuccessOpen(false)}
            />
            <EditEmployeeModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModal(false)}
                onSubmit={handleEditEmployee}
                employee={selectedEmployee}
            />
        </>
    );
}
