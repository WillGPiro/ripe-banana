const { getStudio, getStudios, getActor, getActors } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('actor routes', () => {
  it('creates a actor', async() => {
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
          dob: '3-25-87',
          pob: 'Rome, Italy',
          __v: 0
        });
      });
  });

});
