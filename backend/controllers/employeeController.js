import { createClient } from '@supabase/supabase-js';

import { supabaseAdmin } from '../supabaseClient.js';
import { sendWelcomeEmail } from "../services/emailServices.js";

export const createEmployee = async (req, res) => {

    try {
        const { firstName, lastName, email, password } = req.body;

        const { data: authData, error: authError } = 
          await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true
          });

        if (authError) {
            if (authError.message.toLowerCase().includes("already")) {
                return res.status(400).json({
                    error: "Email already exists",
                });
            }

            return res.status(400).json({ error: authError.message });
        }

        const userId = authData.user.id;


        const { error: dbError } = await supabaseAdmin
        .from("users")
        .insert({
            id: userId,
            email,
            full_name: `${firstName} ${lastName}`,
            role: "employee",
        });

        if (dbError) return res.status(400).json({ error: dbError.message });
        
        try {
          await sendWelcomeEmail(email, password);
        } catch (emailError) {
          console.error("Email failed:", emailError);
          return res.json({
            message: "Employee created but email failed",
            emailSent: false,
          });
        }

        res.json({
          message: "Employee created successfully",
          emailSent: true,
        });

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

export const deleteEmployee = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Step 1: Delete from Supabase Auth
    const { error: authError } =
      await supabaseAdmin.auth.admin.deleteUser(userId);

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    // Step 2: Delete from users table
    const { error: dbError } = await supabaseAdmin
      .from("users")
      .delete()
      .eq("id", userId);

    if (dbError) {
      return res.status(400).json({ error: dbError.message });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete employee" });
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

export const changeEmployeePassword = async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    if (!userId || !newPassword)
      return res.status(400).json({ error: "Missing parameters" });

    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      userId,
      { password: newPassword }
    );

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update password" });
  }
};

export const registerDevice = async (req, res) => {
  try {
    const { userId, deviceIdentifier, deviceName } = req.body;

    if (!userId || !deviceIdentifier)
      return res.status(400).json({ error: "Missing parameters" });

    // Make sure they don’t already have a device
    const { data: existingDevice } = await supabaseAdmin
      .from("registered_devices")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (existingDevice)
      return res.status(400).json({ error: "Device already registered" });

    const { error } = await supabaseAdmin
      .from("registered_devices")
      .insert({
        user_id: userId,
        device_identifier: deviceIdentifier,
        device_name: deviceName || null,
        is_active: true,
      });

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Device registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register device" });
  }
};