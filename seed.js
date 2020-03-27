require('dotenv').config();
require('./lib/utils/connect')();

const seedData = require('./db/seed');

seedData({ studiosToCreate: 10, actorsToCreate: 8, reviewerToCreate: 5 })
  .then(() => console.log('done'));

  
