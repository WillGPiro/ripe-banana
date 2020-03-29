const { 
  getFilm, 
  getFilms,  
  getReviews 
} = require('../db/data-helpers');

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

describe('film routes', () => {
  it('creates a film', async() => {
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

  it('gets all films', async() => {
    const films = await getFilms();
    // const studios = await getStudios({ films: films._id });
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        // studios;
        films.forEach(film => {
          delete film.__v;
          delete film.cast;
          expect(res.body).toContainEqual(film);
        });
      });
  });

  it('gets a film by id', async() => {
    const film = await getFilm();
    const reviews = await getReviews({ film: film._id });
    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...film,
          reviews 
        });
      }); 
  });

});



