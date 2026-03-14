export default function EmployeeDeviceAlreadyRegistered() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">
          Device Already Registered
        </h1>

        <p className="text-gray-600">
          This account is already registered to another device.
          Please contact your administrator if you need to change devices.
        </p>
      </div>
    </div>
  );
}