require('dotenv').config();
const supabase = require('./supabaseClient');

async function testConnection() {
  try {
    const { data, error } = await supabase.from('dummy_table').select('*');
    if (error) {
      console.log('Connection OK! No tables exist yet.');
      console.log('Error:', error.message); // shows table not found
    } else {
      console.log('Data:', data);
    }
  } catch (err) {
    console.error(err);
  }
}

testConnection();
