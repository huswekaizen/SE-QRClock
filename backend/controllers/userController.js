import { supabaseAdmin, supabaseAuth } from "../supabaseClient.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Use anon client for authentication
    const { data: sessionData, error } =
      await supabaseAuth.auth.signInWithPassword({ email, password });

    if (error || !sessionData.user) {
      console.log("Auth error:", error);
      console.log("Session data:", sessionData);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("User UUID from Auth:", sessionData.user.id);

    // Use admin client for DB operations
    let { data: profile } = await supabaseAdmin
      .from("users")
      .select("role")
      .eq("email", sessionData.user.email)
      .single();

    if (!profile) {
      const { data: newProfile, error: insertError } =
        await supabaseAdmin
          .from("users")
          .insert([
            {
              id: sessionData.user.id,
              email: sessionData.user.email,
              role: "employee",
            },
          ])
          .select("role")
          .single();

      if (insertError) {
        console.error(insertError);
        return res.status(500).json({ message: "Failed to create user profile" });
      }

      profile = newProfile;
    }

    return res.json({
      message: "Login successful",
      user: sessionData.user,
      role: profile.role,
      access_token: sessionData.access_token || sessionData.session?.access_token,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const { access_token } = req.body;
    if (!access_token) return res.status(400).json({ error: "No token provided" });

    const { error } = await supabaseAuth.auth.signOut({ access_token });
    if (error) throw error;

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Logout failed" });
  }
};