const pool = require('../config/db');

async function createArticle(title, description) {
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO articles (title, description) VALUES ($1, $2) RETURNING *', [title, description]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

async function getArticles() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM articles');
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

async function getArticleById(articleId) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM articles WHERE id = $1', [articleId]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

async function updateArticle(articleId, newData) {
  const { title, description } = newData;
  try {
    const client = await pool.connect();
    const result = await client.query('UPDATE articles SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, articleId]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

async function deleteArticle(articleId) {
  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM articles WHERE id = $1 RETURNING *', [articleId]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
}

module.exports = { createArticle, getArticles, getArticleById, updateArticle, deleteArticle };
