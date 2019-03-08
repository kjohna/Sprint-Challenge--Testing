const Games = require('./gamesModel');

describe('games model', () => {
  const gameData = {
    title: 'Pacman', // required
    genre: 'Arcade', // required
    releaseYear: 1980 // not required
  };
  const gameData2 = {
    title: 'Pacman', // required
    genre: 'Arcade', // required
    releaseYear: 1980 // not required
  }

  afterEach(async () => {
    await Games.removeAll();
  });

  describe ('insert game', () => {
    // test add game functionality
    it('should insert, return provided game', async () => {
      let game = await Games.insert(gameData);
      expect(game.title).toBe(gameData.title);
      // insert another game, make sure correct game is returned
      game = await Games.insert(gameData2);
      expect(game.title).toBe(gameData2.title);
    });
  });

  describe('get games', () => {
    // test get game functionality
    it('should return all games', async () => {
      // first insert some games
      await Games.insert(gameData);
      await Games.insert(gameData2);
      const games = await Games.getAll();
      expect(games.length).toBe(2);
    })
  });
});