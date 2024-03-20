const userModel = require('../models/userModel');

async function registerUser(req, res) {
  const { username, email, password } = req.body; // Tambahkan email dari body permintaan
  try {
    const newUser = await userModel.createUser(username, email, password); // Ubah pemanggilan createUser
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getUsers(req, res) {
  try {
    const users = await userModel.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getUserById(req, res) {
  const userId = req.params.id; // Ambil ID pengguna dari parameter permintaan
  try {
    const user = await userModel.getUserById(userId); // Panggil fungsi getUserById
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const newData = req.body;
  try {
    const updatedUser = await userModel.updateUser(userId, newData);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteUser(req, res) {
  const userId = req.params.id;
  try {
    const deletedUser = await userModel.deleteUser(userId);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  try {
    const user = await userModel.getUserByUsernameAndPassword(username, password);
    if (user) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { registerUser, getUsers, getUserById, updateUser, deleteUser, loginUser };
