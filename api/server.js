require('dotenv').config();

const express = require('express');
const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  try {
    res.status(200).json({ message: 'server listening!' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = server;