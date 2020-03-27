const { getFilm, getFilms, getActor, getStudio } = require('../db/data-helpers');
const mongoose = require('mongoose');

const request = require('supertest');
const app = require('../lib/app');

describe('film routes', () => {
  it('creates a film', async() => {
    const cast = await getFilm();
    return request(app)
      .post('/api/v1/films')
      .send({
        title: '24 Monkies',
        studioId: new mongoose.Types.ObjectId(), 
        released: 1998,
        cast: [{
          role: 'Lead',
          actorId: new mongoose.Types.ObjectId(),
        }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: '24 Monkies',
          studioId: expect.any(String),
          released: 1998,
          cast: [{
            _id: expect.any(String),
            role: 'Lead',
            actorId: expect.any(String)
          }],
          __v: 0
        });
      });
  });
});



