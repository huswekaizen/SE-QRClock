import { createClient } from '@supabase/supabase-js';

import { supabaseAdmin } from '../supabaseClient.js';

export const createEmployee = async (req, res) => {

    try {
        const { firstName, lastName, email, password } = req.body;

        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true
        });

        if (authError) return res.status(400).json({ error: authError.message });

        const userId = authData.user.id;

        if (authError) {
            if (authError.message.toLowerCase().includes("already")) {
                return res.status(400).json({
                    error: "Email already exists",
                });
            }

            return res.status(400).json({ error: authError.message });
        }

        const { error: dbError } = await supabaseAdmin
        .from("users")
        .insert({
            id: userId,
            email,
            full_name: `${firstName} ${lastName}`,
            role: "employee",
        });

        if (dbError) return res.status(400).json({ error: dbError.message });

        res.json({ message: "Employee created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create employee" });
    }
  
};

export const editEmployee = async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, email, password } = req.body;

    if (!userId) return res.status(400).json({ error: "User ID is required" });

    // Step 1: Update Supabase Auth user
    const authUpdate = {};
    if (email) authUpdate.email = email;
    if (password) authUpdate.password = password;

    if (Object.keys(authUpdate).length > 0) {
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.updateUserById(
        userId,
        authUpdate
      );
      if (authError) return res.status(400).json({ error: authError.message });
    }

    // Step 2: Update users table
    const { data: dbData, error: dbError } = await supabaseAdmin
      .from("users")
      .update({
        full_name: `${firstName} ${lastName}`,
        email: email || undefined, // optional, only update if provided
      })
      .eq("id", userId);

    if (dbError) return res.status(400).json({ error: dbError.message });

    res.json({ message: "Employee updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update employee" });
  }
};

export const employeeList = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("users")
      .select("id, email, full_name, role")
      .eq("role", "employee")
      .order("full_name", { ascending: true });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};