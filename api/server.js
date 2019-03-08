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

server.get('/games', async (req, res) => {
  try {
    const games = await db.getAll();
    console.log("games: ", games);
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: "error getting games" });
  }
});

module.exports = server;