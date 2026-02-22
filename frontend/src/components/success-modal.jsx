// src/components/SuccessModal.jsx
import React from "react";

export default function SuccessModal({ isOpen, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
        <h2 className="text-xl font-semibold mb-[4px]">Success</h2>
        <p className="text-green-600 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}