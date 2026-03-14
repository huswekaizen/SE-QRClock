import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { supabaseAuth } from "../utils/supabaseClient.js"; // import your Supabase auth

export default function EmployeeDeviceRegistrationPage({ onSubmit }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDeviceConfirmed, setIsDeviceConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const submitVerification = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!isDeviceConfirmed) {
      setError("You must confirm this device to proceed");
      return;
    }

    setIsLoading(true);

    try {
      // 1️⃣ get logged in user
      const { data: { user }, error: userError } = await supabaseAuth.auth.getUser();
      if (userError || !user) {
        setError("Session expired. Please login again.");
        setIsLoading(false);
        return;
      }

      let deviceId = localStorage.getItem("device_id");
      if (!deviceId) {
        deviceId = crypto.randomUUID();
        localStorage.setItem("device_id", deviceId);
      }

      // 2️⃣ register device FIRST
      const { error: deviceError } = await supabaseAuth
        .from("registered_devices")
        .insert({
          user_id: user.id,
          device_identifier: deviceId,
          device_name: "Personal Device",
        });

      if (deviceError) {
        if (deviceError.code === "23505") {
          setError("This device is already registered to another employee.");
        } else {
          setError(deviceError.message);
        }
        setIsLoading(false);
        return;
      }

      // 3️⃣ now change password only if device registration succeeded
      const { error: passwordError } = await supabaseAuth.auth.updateUser({
        password: newPassword,
      });

      if (passwordError) {
        setError(passwordError.message);
        setIsLoading(false);
        return;
      }

      // 4️⃣ sign out & redirect
      await supabaseAuth.auth.signOut();
      navigate("/");

    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Account Verification
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Please set your password and confirm this device to complete account setup.
        </p>

        <form className="space-y-4" onSubmit={submitVerification}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={isDeviceConfirmed}
              onChange={(e) => setIsDeviceConfirmed(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-700 text-sm">This is my personal device</span>
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-lg text-white transition ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Registering..." : "Register Account"}
          </button>
        </form>
      </div>
    </div>
  );
}