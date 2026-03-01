import React, { useState } from "react";

export default function DeleteEmployeeModal({
  isOpen,
  onClose,
  onConfirm,
  employee,
}) {
  const [confirmationText, setConfirmationText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !employee) return null;

  const isMatch = confirmationText === "DELETE";

  const handleDelete = async () => {
    if (!isMatch) return;

    setIsLoading(true);
    const success = await onConfirm(employee.id, setError);
    setIsLoading(false);

    if (success) {
      setConfirmationText("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Delete Employee
        </h2>

        <p className="mb-3 text-gray-600">
          This will permanently delete{" "}
          <strong>{employee.full_name}</strong>.
        </p>

        <p className="mb-2 text-sm text-gray-500">
          Type <span className="font-bold text-black">DELETE</span> to confirm.
        </p>

        <input
          type="text"
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => {
              setConfirmationText("");
              onClose();
              setError("");
            }}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={!isMatch || isLoading}
            className={`px-4 py-2 rounded-lg text-white transition ${
              isMatch
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-300 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}