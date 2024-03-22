const pool = require('../config/db');

async function createHabit(title, description) {
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO habits (title, description) VALUES ($1, $2) RETURNING *', [title, description]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

async function getHabits() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM habits');
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

async function getHabitById(habitId) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM habits WHERE id = $1', [habitId]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

async function updateHabit(habitId, newData) {
  const { title, description } = newData;
  try {
    const client = await pool.connect();
    const result = await client.query('UPDATE habits SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, habitId]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

async function deleteHabit(habitId) {
  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM habits WHERE id = $1 RETURNING *', [habitId]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

module.exports = { createHabit, getHabits, getHabitById, updateHabit, deleteHabit };
