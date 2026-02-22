import React from "react";

export default function FunctionSmallButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        px-4 py-2 
        border border-blue-600 text-blue-600 
        rounded-lg
        hover:bg-gray-700 hover:text-white hover:border-gray-100
        transition-colors
        font-medium
        h-[40px] flex items-center justify-center
      "
    >
      {label}
    </button>
  );
}
