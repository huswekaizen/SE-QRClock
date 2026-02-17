import dotenv from "dotenv";
dotenv.config(); // must be first

import supabase from './supabaseClient.js';

async function testConnection() {
  try {
    const { data, error } = await supabase.from('users').select('*'); // remove "public."
    if (error) {
      console.log('Connection OK, but table issue or permissions:');
      console.log('Error:', error.message);
    } else {
      console.log('Connection successful! Data from "users" table:');
      console.log('Data:', data);
    }
  } catch (err) {
    console.error(err);
  }
}

testConnection();
