const { getFilms, getActor, getActors } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('actor routes', () => {
  it('creates an actor', async() => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Guisseppi Garibaldi',
        dob: '3-25-87',
        pob: 'Rome, Italy'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Guisseppi Garibaldi',
          dob: expect.any(String),
          pob: 'Rome, Italy',
          __v: 0
        });
      });
  });

  it('gets all actors', async() => {
    const actors = await getActors();

    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        actors.forEach(actor => {
          delete actor.__v;
          delete actor.dob;
          delete actor.pob;
          expect(res.body).toContainEqual(actor);
        });
      });
  });

  it('gets an actor by id', async() => {
    const actor = await getActor();
    const films = await getFilms({ actorId: actor._id });
    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        console.log('===========', res.body);
        expect(res.body).toEqual({
          ...actor,
          films
        });
      });
  });

});
