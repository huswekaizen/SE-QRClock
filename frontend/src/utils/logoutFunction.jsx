import { supabaseAuth } from "./supabaseClient";

export default async function logoutFunction() {
    const { error } = await supabaseAuth.auth.signOut();
    if (error) console.error("Logout failed:", error);
}
