import { useState } from "react";
import GenerateClockInQrModal from "../components/generate-clock-in-qr-modal";
import GenerateClockOutQrModal from "../components/generate-clock-out-qr-modal";
import { QrCodeIcon, ClockIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function AdminPageGenerateQR() {
  const [isClockInModalOpen, setIsClockInModalOpen] = useState(false);
  const [isClockOutModalOpen, setIsClockOutModalOpen] = useState(false);
  const [qrType, setQrType] = useState("time_in");
  const [lastQr, setLastQr] = useState({ time_in: null, time_out: null });

  const [shiftDate, setShiftDate] = useState(null);

  const handleOpenClockInModal = (type) => {
    setQrType(type);
    setIsClockInModalOpen(true);
  };

  const handleOpenClockOutModal = (type) => {
    setQrType(type);
    setIsClockOutModalOpen(true);
  };

  const handleGenerate = (data) => {
    setLastQr((prev) => ({
      ...prev,
      [data.type]: data
    }));

    if (data.type === "time_in") {
      setShiftDate(data.date);
    }

    isClockInModalOpen && setIsClockInModalOpen(false);
    isClockOutModalOpen && setIsClockOutModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6 sm:p-10 space-y-10">

        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Generate QR Codes</h1>
          <p className="text-gray-500 text-sm">
            Generate QR codes for Clock-In and Clock-Out. Preview generated QR below.
          </p>
        </div>

        {/* QR Generate Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Clock-In Card */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center text-center">
            <ClockIcon className="w-10 h-10 text-green-500 mb-4" />
            <h2 className="font-semibold text-gray-900 mb-2">Clock-In QR</h2>
            <p className="text-gray-500 text-sm mb-4">
              {lastQr.time_in ? "Generated" : "Not Generated"}
            </p>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-green-700 transition"
              onClick={() => handleOpenClockInModal("time_in")}
            >
              Generate
            </button>
          </div>

          {/* Clock-Out Card */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center text-center">
            <ArrowRightOnRectangleIcon className="w-10 h-10 text-red-500 mb-4" />
            <h2 className="font-semibold text-gray-900 mb-2">Clock-Out QR</h2>
            <p className="text-gray-500 text-sm mb-4">
              {lastQr.time_out ? "Generated" : "Not Generated"}
            </p>
            <button
              className="bg-red-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-700 transition"
              onClick={() => handleOpenClockOutModal("time_out")}
            >
              Generate
            </button>
          </div>
        </div>

        {/* QR Previews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Clock-In Preview */}
          <div className="bg-white rounded-2xl shadow border p-6 flex flex-col items-center text-center">
            <h3 className="font-semibold text-gray-900 mb-4">Clock-In QR Preview</h3>
            <div className="bg-gray-100 w-44 h-44 rounded-xl flex items-center justify-center">
              {lastQr.time_in ? (
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=${lastQr.time_in.token}&size=150x150`}
                  alt="Clock-In QR"
                  className="w-36 h-36"
                />
              ) : (
                <span className="text-gray-400 text-sm">No QR Generated</span>
              )}
            </div>
          </div>

          {/* Clock-Out Preview */}
          <div className="bg-white rounded-2xl shadow border p-6 flex flex-col items-center text-center">
            <h3 className="font-semibold text-gray-900 mb-4">Clock-Out QR Preview</h3>
            <div className="bg-gray-100 w-44 h-44 rounded-xl flex items-center justify-center">
              {lastQr.time_out ? (
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=${lastQr.time_out.token}&size=150x150`}
                  alt="Clock-Out QR"
                  className="w-36 h-36"
                />
              ) : (
                <span className="text-gray-400 text-sm">No QR Generated</span>
              )}
            </div>
          </div>
        </div>

        
      </div>
        <GenerateClockInQrModal
          isOpen={isClockInModalOpen}
          onClose={() => setIsClockInModalOpen(false)}
          onGenerate={handleGenerate}
          type={qrType}
        />
        <GenerateClockOutQrModal
          isOpen={isClockOutModalOpen}
          onClose={() => setIsClockOutModalOpen(false)}
          onGenerate={handleGenerate}
          type={qrType}
          shiftDate={shiftDate}
        />
      </>
  );
}