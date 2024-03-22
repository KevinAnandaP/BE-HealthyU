const pool = require('../config/db');

async function createUser(username, email, password) {
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

async function getUsers() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

async function getUserByUsernameAndPassword(username, password) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

async function updateUser(userId, newData) {
  const { username, email, password } = newData;
  try {
    const client = await pool.connect();
    const result = await client.query('UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *', [username, email, password, userId]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

async function deleteUser(userId) {
  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

module.exports = { createUser, getUsers, getUserById, getUserByUsernameAndPassword, updateUser, deleteUser };
