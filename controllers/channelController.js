const channelModel = require('../models/channelModel');

async function createChannel(req, res) {
  const { title, message } = req.body;
  try {
    const newChannel = await channelModel.createChannel(title, message);
    res.status(201).json(newChannel);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getChannels(req, res) {
  try {
    const channels = await channelModel.getChannels();
    res.json(channels);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getChannelById(req, res) {
  const channelId = req.params.id;
  try {
    const channel = await channelModel.getChannelById(channelId);
    if (channel) {
      res.json(channel);
    } else {
      res.status(404).json({ message: 'Channel not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateChannel(req, res) {
  const channelId = req.params.id;
  const newData = req.body;
  try {
    const updatedChannel = await channelModel.updateChannel(channelId, newData);
    res.json(updatedChannel);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteChannel(req, res) {
  const channelId = req.params.id;
  try {
    const deletedChannel = await channelModel.deleteChannel(channelId);
    res.json(deletedChannel);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { createChannel, getChannels, getChannelById, updateChannel, deleteChannel };
