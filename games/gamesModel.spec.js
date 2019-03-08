const Games = require('./gamesModel');

describe('games model', () => {
  const gameData = {
    title: 'Pacman', // required
    genre: 'Arcade', // required
    releaseYear: 1980 // not required
  };
  const gameData2 = {
    title: 'Pacman2', // required
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
    // game title must be unique
    it('should throw error when attempting to add duplicate title', async () => {
      await Games.insert(gameData);
      console.log("getAll: ", await Games.getAll());
      // UGH weird syntax required:
      expect(Games.insert(gameData)).rejects.toEqual(new Error("Duplicate titles not allowed."));
      // see link:
      // https://github.com/facebook/jest/issues/1700
      // syntax below does not work..
      // console.log(await Games.insert(gameData));
      // expect(() => {
      //   Games.insert(gameData);
      // }).toThrow();
      // expect(async () => {
      //   try {
      //     await Games.insert(gameData);
      //   } catch (error) {
      //     console.log("ERROR: ", error.message)
      //     throw new Error(error);
      //   }
      // }).toThrow();
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
    });
  });
});