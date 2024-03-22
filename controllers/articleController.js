const articleModel = require('../models/articleModel');

async function createArticle(req, res) {
  const { title, description } = req.body;
  try {
    const newArticle = await articleModel.createArticle(title, description);
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getArticles(req, res) {
  try {
    const articles = await articleModel.getArticles();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getArticleById(req, res) {
  const articleId = req.params.id;
  try {
    const article = await articleModel.getArticleById(articleId);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateArticle(req, res) {
  const articleId = req.params.id;
  const newData = req.body;
  try {
    const updatedArticle = await articleModel.updateArticle(articleId, newData);
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteArticle(req, res) {
  const articleId = req.params.id;
  try {
    const deletedArticle = await articleModel.deleteArticle(articleId);
    res.json(deletedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { createArticle, getArticles, getArticleById, updateArticle, deleteArticle };
