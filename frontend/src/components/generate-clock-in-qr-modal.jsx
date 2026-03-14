import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function GenerateClockInQrModal({ isOpen, onClose, onGenerate, type }) {
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [lateUntil, setLateUntil] = useState("");
    const [expireAfter, setExpireAfter] = useState("");

    if (!isOpen) return null;

    const handleGenerate = () => {
        if (!date || !startTime || !lateUntil) {
            alert("Fill all fields first!");
            return;
        }

        // Parse date input safely
        const [year, month, day] = date.split("-").map(Number);
        const selectedDate = new Date(year, month - 1, day); // month is 0-indexed

        const today = new Date();
        today.setHours(0,0,0,0);
        selectedDate.setHours(0,0,0,0);

        if (selectedDate < today) {
            alert("You cannot generate a QR for a past date!");
            return;
        }

        onGenerate({
            type,
            date,
            startTime,
            lateUntil,
            expireAfter
        });
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-[420px] rounded-xl shadow-lg p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Generate {type === "clock_in" ? "Clock-In" : "Clock-Out"} QR
          </h2>
          <button onClick={onClose}>
            <XMarkIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Date</label>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Start Time */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Available Starting Time</label>
          <input
            type="time"
            className="w-full border rounded-lg px-3 py-2"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        {/* Late Until */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Mark Late After</label>
          <input
            type="time"
            className="w-full border rounded-lg px-3 py-2"
            value={lateUntil}
            onChange={(e) => setLateUntil(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Expire After</label>
          <input
            type="time"
            className="w-full border rounded-lg px-3 py-2"
            value={expireAfter}
            onChange={(e) => setExpireAfter(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleGenerate}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Generate QR
          </button>
        </div>

      </div>
    </div>
  );
}