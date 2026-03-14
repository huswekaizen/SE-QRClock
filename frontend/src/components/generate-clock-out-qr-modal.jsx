import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function GenerateClockOutQrModal({ isOpen, onClose, onGenerate, type, shiftDate }) {
  const [endTime, setEndTime] = useState("");
  const [earlyLeaveBefore, setEarlyLeaveBefore] = useState("");
  const [expireAfter, setExpireAfter] = useState("");

  if (!isOpen) return null;

    const handleGenerate = () => {
        if (!shiftDate || !endTime) {
            alert("Clock-In must be generated first!");
            return;
        }

        onGenerate({
            type,
            date: shiftDate,
            endTime,
            earlyLeaveBefore,
            expireAfter
        });
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-[420px] rounded-xl shadow-lg p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Generate Clock-Out QR</h2>
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
            value={shiftDate || ""}
            readOnly
          />
        </div>

        {/* End Time */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Available Starting Time</label>
          <input
            type="time"
            className="w-full border rounded-lg px-3 py-2"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        {/* Early Leave Threshold */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Mark Early Leave Before</label>
          <input
            type="time"
            className="w-full border rounded-lg px-3 py-2"
            value={earlyLeaveBefore}
            onChange={(e) => setEarlyLeaveBefore(e.target.value)}
          />
        </div>


        {/* Expire After */}
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