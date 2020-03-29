const { 
  getReviewer, 
  getReviews,
  getReviewers
} = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('reviewer routes', () => {
  it('creates an reviewer', async() => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Roger Siskal',
        company: 'Washington Movie Host'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Roger Siskal',
          company: 'Washington Movie Host',
          id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets all reivewers by name and company', async() => {
    const reviewers = await getReviewers();
    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toEqual(reviewers);
      });
  });

  it('gets a reviewer by id', async() => {
    const reviewer = await getReviewer();
    const reviews = await getReviews({ reviewer: reviewer._id });
    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer,
          reviews
        });
      });
  });

  it('updates a reviewer by id', async() => {
    const reviewer = await getReviewer();

    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({ name: 'Ebert Ernie', company: 'Oregon Movie Central' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Ebert Ernie',
          company: 'Oregon Movie Central',
          id: expect.any(String),
          __v:0
        });
      });
  });

  // it('throws error if trying to delete reviewer with active review', async() => {
  //   const review = await getReviewer();
  //   const reviewer = await getReviewer({ _id: review.reviewer });

  //   return request(app)
  //     .delete(`/api/v1/reviewers/${reviewer._id}`)
  //     .then (res => {
  //       expect(res.body).toEqual({ 
  //         message: 'Reviewer cannot be deleted with active reviews',
  //         status: 500 
  //       });
  //     });
  // });

  it('deletes a reviewer by Id', async() => {
    const reviewer = await getReviewer();

    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual(reviewer);
      });
  });

});

