const habitModel = require('../models/habitModel');

async function createHabit(req, res) {
  const { title, description } = req.body;
  try {
    const newHabit = await habitModel.createHabit(title, description);
    res.status(201).json(newHabit);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getHabits(req, res) {
  try {
    const habits = await habitModel.getHabits();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getHabitById(req, res) {
  const habitId = req.params.id;
  try {
    const habit = await habitModel.getHabitById(habitId);
    if (habit) {
      res.json(habit);
    } else {
      res.status(404).json({ message: 'Habit not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateHabit(req, res) {
  const habitId = req.params.id;
  const newData = req.body;
  try {
    const updatedHabit = await habitModel.updateHabit(habitId, newData);
    res.json(updatedHabit);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteHabit(req, res) {
  const habitId = req.params.id;
  try {
    const deletedHabit = await habitModel.deleteHabit(habitId);
    res.json(deletedHabit);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { createHabit, getHabits, getHabitById, updateHabit, deleteHabit };
