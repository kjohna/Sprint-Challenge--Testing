require('dotenv').config();

const express = require('express');
const server = express();
const db = require('../games/gamesModel');

server.use(express.json());

server.get('/', async (req, res) => {
  try {
    res.status(200).json({ message: 'server listening!' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

server.post('/games', async (req, res) => {
  // console.log("here!");
  gameData = req.body;
  // console.log("gameData: ", gameData)
  if (Object.keys(gameData).length) {
    if (gameData.title && gameData.genre) {
      try {
        const inserted = await db.insert(gameData);
        res.status(201).json(inserted);
      } catch (error) {
        res.status(500).json({ error });
      }
    } else {
      res.status(422).json({ message: "title and genre are required!" });
    }
  } else {
    res.status(400).json({ message: "Please provide game data!" });
  }
});

module.exports = server;