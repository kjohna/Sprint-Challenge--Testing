const request = require('supertest');
const server = require('./server.js');
const Games = require('../games/gamesModel'); // only needed to clean up after tests

afterEach(async () => {
  await Games.removeAll();
});

describe('server.js', () => {
  it('should set testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('GET /', () => {
    // check that server starts and is listening
    it('should return status 200', async () => {
      const res = await request(server).get('/');
      expect(res.status).toBe(200);
    });
    // test response data type is JSON
    it('should return JSON', async () => {
      const res = await request(server).get('/');
      expect(res.type).toBe('application/json');
    });
    // test response data shape
    it('should return { message: "server listening!" }', async () => {
      const res = await request(server).get('/');
      expect(res.body).toEqual({ message: 'server listening!' });
    });
  }); // end GET / tests

  describe('POST /games', () => {
    const gameData = {
      title: 'Pacman', // required
      genre: 'Arcade', // required
      releaseYear: 1980 // not required
    };
    // check that server responds with 201 for successful POST
    it('should return status 201 for good post', async () => {
      const res = await request(server)
        .post('/games')
        .send(gameData);
      expect(res.status).toBe(201);
    });
    // check that the server responds with 400 for no data sent
    it('should return status 400 when no data is sent', async ()=> {
      const res = await request(server)
        .post('/games')
        .send();
      expect(res.status).toBe(400);
    });
    // check that server responds with 422 if missing required data
    it('should return 422 when required data is missing', async () => {
      let res = await request(server)
        .post('/games')
        .send({
          ...gameData,
          title: ''
        });
      expect(res.status).toBe(422);
      res = await request(server)
        .post('/games')
        .send({
          ...gameData,
          genre: ''
        })
      expect(res.status).toBe(422);
    });
    // check that server responds with JSON
    it('should return JSON', async () => {
      const res = await request(server)
        .post('/games')
        .send(gameData);
      expect(res.type).toBe('application/json');
    });
    // check that server returns inserted gameData
    it('should return inserted gameData', async () => {
      const res = await request(server)
        .post('/games')
        .send(gameData);
      expect(res.body).toEqual(gameData);
    });
  }); // end POST /games tests

  describe('GET /games', () => {
    // check response status
    it('should return status 200', async () => {
      const res = await request(server).get('/games');
      expect(res.status).toBe(200);
    });
    // test response data type is JSON
    it('should return JSON', async () => {
      const res = await request(server).get('/games');
      expect(res.type).toBe('application/json');
    });
    // test response data shape
    it('should return data in proper format', async () => {
      const gameData = {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
      };
      await request(server)
        .post('/games')
        .send(gameData);
      const res = await request(server).get('/games');
      expect(res.body).toEqual([gameData]);
    });
    // test all games are returned
    it('should return all games', async () => {
      const gameData = {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
      };
      // add 3 games
      await request(server)
        .post('/games')
        .send(gameData);
      await request(server)
        .post('/games')
        .send({
          ...gameData,
          title: 'new title'
        });
      await request(server)
        .post('/games')
        .send({
          ...gameData,
          title: 'new title2'
        });
      const res = await request(server).get('/games');
      expect(res.body.length).toEqual(3);
    });
  }); // end GET /games
});