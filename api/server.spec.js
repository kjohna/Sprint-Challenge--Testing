const request = require('supertest');
const server = require('./server.js');

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
    it('should return { message: "server listening!"', async () => {
      const res = await request(server).get('/');
      expect(res.body).toEqual({ message: 'server listening!' });
    });
  }); // end GET / tests

  describe('POST /games', () => {
    // check that server responds with 201 for successful POST
    it('should return status 201 for good post', async () => {
      const gameData = {
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
      };
      const res = await request(server)
        .post('/games')
        .send(gameData);
      expect(res.status).toBe(201);
    })
  });
});