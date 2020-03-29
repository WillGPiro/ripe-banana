require('dotenv').config();
require('./lib/utils/connect')();

const seedData = require('./db/seed');

seedData({ studiosToCreate: 10, actorsToCreate: 8, reviewerToCreate: 5, filmsToCreate: 10, reviewsToCreate:100 })
  .then(() => console.log('done'));

  
