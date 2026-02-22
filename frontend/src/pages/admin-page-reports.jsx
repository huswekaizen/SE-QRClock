export default function AdminPageReports() {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Reports</h1>

      <div className="flex gap-4 mb-6">
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">
          Daily Report
        </button>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">
          Weekly Report
        </button>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">
          Monthly Report
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        Report data goes here
      </div>
    </>
  );
}