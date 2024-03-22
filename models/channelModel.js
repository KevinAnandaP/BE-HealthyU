// channelModel.js

const pool = require('../config/db');

async function createChannel(title, message) {
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO channels (title, message) VALUES ($1, $2) RETURNING *', [title, message]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

async function getChannels() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM channels');
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

async function getChannelById(channelId) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM channels WHERE id = $1', [channelId]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

async function updateChannel(channelId, newData) {
  const { title, message } = newData;
  try {
    const client = await pool.connect();
    const result = await client.query('UPDATE channels SET title = $1, message = $2 WHERE id = $3 RETURNING *', [title, message, channelId]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

async function deleteChannel(channelId) {
  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM channels WHERE id = $1 RETURNING *', [channelId]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

module.exports = { createChannel, getChannels, getChannelById, updateChannel, deleteChannel };
