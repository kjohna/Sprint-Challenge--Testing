let games = [
  {
    title: 'Pacman', // required
    genre: 'Arcade', // required
    releaseYear: 1980 // not required
  },
  {
    title: 'Another', 
    genre: 'PC', 
    releaseYear: 1990 
  }
]

module.exports = {
  insert,
}

async function insert(game) {
  try {
    games.push(game);
    return games[games.length - 1];
  } catch (error) {
    throw new Error("insert game error");
  }
}