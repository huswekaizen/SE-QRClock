// LoginPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseAuth } from "../utils/supabaseClient.js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  // LoginPage.jsx
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabaseAuth.auth.getSession();
      if (session) navigate("/admin", { replace: true }); // already logged in
    };
    checkSession();
  }, []);


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

    // fetch user role from table
    const { data: profile, error: profileError } = await supabaseAuth
      .from("users")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profileError) {
      console.error(profileError);
      setError("Failed to fetch user role");
      return;
    }

    if (profile.role === "admin") navigate("/admin");
    else navigate("/employee");
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
