// LoginPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseAuth } from "../utils/supabaseClient.js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  console.log("local device_id:", localStorage.getItem("device_id"));

  const navigate = useNavigate();

  // top of your file or inside useEffect/checkSession
  function getDeviceId() {
    let id = localStorage.getItem("device_id");

    if (!id) {
      if (crypto.randomUUID) {
        id = crypto.randomUUID();
      } else {
        // fallback UUID generator
        id = "xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      }

      localStorage.setItem("device_id", id);
    }

    return id;
  }

  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabaseAuth.auth.getSession();
      if (!session) {
        setCheckingSession(false);
        return;
      }

      const { data: profile } = await supabaseAuth
        .from("users")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (!profile) {
        setCheckingSession(false);
        return;
      }

      if (profile.role === "admin") {
        setCheckingSession(false);
        navigate("/admin", { replace: true });
        return;
      }

      // employees: show login
      setCheckingSession(false);
    };

    checkSession();
  }, []);

  if (checkingSession) return <p>Loading...</p>; // loader instead of null

  async function handleUserLogin(e) {
    e.preventDefault();

    const { data, error } = await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    const userId = data.user.id;

    // get user role
    const { data: profile, error: profileError } = await supabaseAuth
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error(profileError);
      setError("Failed to fetch user role");
      return;
    }

    // admins skip device check
    if (profile.role === "admin") {
      navigate("/admin");
      return;
    }

    if (profile.role === "employee") {
      const deviceId = getDeviceId();

      const { data: registeredDevice, error: deviceError } = await supabaseAuth
        .from("registered_devices")
        .select("device_identifier")
        .eq("user_id", userId)
        .maybeSingle();

      if (deviceError) {
        console.error(deviceError);
        setError("Device check failed");
        return;
      }

      console.log("Registered device:", registeredDevice);
      console.log("Current device:", deviceId);

      // No device registered yet
      if (!registeredDevice) {
        navigate("/employee-device-registration");
        return;
      }

      // Same device
      if (registeredDevice.device_identifier === deviceId) {
        navigate("/employee");
        return;
      }

      // Different device
      navigate("/employee-device-already-registered");
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b  px-4">
      <div className="bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">
          QRClock Login
        </h1>
        <form onSubmit={handleUserLogin} className="space-y-6">
          <div>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
            />
          </div>
          <div>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-md"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <p className="mt-6 text-center text-gray-500 text-sm">
          Welcome back to QRClock. Securely access your account.
        </p>
      </div>
    </div>
  );
}
