let games = [
]

module.exports = {
  insert,
  getAll,
  removeAll,
}

async function insert(game) {
  try {
    games.push(game);
    return games[games.length - 1];
  } catch (error) {
    throw new Error("insert game error");
  }
}

async function getAll() {
  try {
    return games;
  } catch (error) {
    throw new Error("getAll games error");
  }
}

async function removeAll() {
  try {
    games = [];
    return games;
  } catch (error) {
    
  }
}