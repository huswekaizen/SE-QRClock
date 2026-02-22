export default function AdminPageGenerateQR() {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Generate QR Code</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Clock In</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Generate Clock-In QR
          </button>
          <div className="mt-4 bg-gray-100 h-48 rounded-lg flex items-center justify-center">
            QR Preview Here
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Clock Out</h2>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
            Generate Clock-Out QR
          </button>
          <div className="mt-4 bg-gray-100 h-48 rounded-lg flex items-center justify-center">
            QR Preview Here
          </div>
        </div>
      </div>
    </>
  );
}