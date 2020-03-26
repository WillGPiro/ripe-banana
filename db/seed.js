const Studio = require('../lib/models/Studio');
const chance = require('chance').Chance();

// specifying the number of things to create with our seed function

module.exports = async({ studiosToCreate } = {}) => {
  // creating  things
  // creating an array of things length
  // map through the array
  // -> for each item in the array we create an object with { title, pages }
  // for each author in the mapped array we create a author in our mongodb
  const name = ['WarnerSisters', 'MiraMin', '30Th Century Faux'];
  await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: chance.pickone(name),
    address: {
      city: chance.sentence(),
      state: chance.sentence(),
      country: chance.sentence()
    }
  })));
};
