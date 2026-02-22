export default function AdminPageAttendance() {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Attendance Records</h1>

      <div className="flex items-center gap-4 mb-6">
        <input
          type="date"
          className="p-2 border border-gray-300 rounded-lg h-[40px]"
        />
        <input
          type="search"
          placeholder="Search employee..."
          className="p-2 border border-gray-300 rounded-lg w-[300px] h-[40px]"
        />
        <button className="bg-gray-800 text-white px-4 h-[40px] rounded-lg">
          Export CSV
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        Attendance table goes here
      </div>
    </>
  );
}