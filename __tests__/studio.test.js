const { getStudios } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');


describe('studio routes', () => {
  it('creates a studio', async() => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Warner Sisters',
        address: {
          city: 'Wenatchee',
          state: 'WA',
          country: 'United States'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Warner Sisters',
          address: {
            city: 'Wenatchee',
            state: 'WA',
            country: 'United States'
          },
          __v: 0
        });
      });
  });

  
});



