const Games = require('./gamesModel');

describe('games model', () => {
  const gameData = {
    title: 'NewGame',
    genre: 'Other',
    releaseYear: 1983
  };
  describe ('insert game', () => {
    // test add game functionality
    it('should insert, return provided game', async () => {
      const gameData2 = {
        title: 'othergame',
        genre: 'console',
        releaseYear: 1985
      }
      let game = await Games.insert(gameData);
      expect(game.title).toBe(gameData.title);
      // insert another game, make sure correct game is returned
      game = await Games.insert(gameData2);
      expect(game.title).toBe(gameData2.title);
    });
  });
});