const Studio = require('../lib/models/Studio');
const chance = require('chance').Chance();
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');

// specifying the number of things to create with our seed function

module.exports = async({ studiosToCreate, actorToCreate, reviewerToCreate, filmToCreate } = {}) => {
  // creating  things
  // creating an array of things length
  // map through the array
  // -> for each item in the array we create an object with { title, pages }
  // for each author in the mapped array we create a author in our mongodb
  const name = ['WarnerSisters', 'MiraMin', '30Th Century Faux'];
  
  const studio = await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: chance.pickone(name),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));
  
  const actor = await Actor.create([...Array(actorToCreate)].map(() => ({
    name: chance.name(),
    dob: chance.birthday({ string: true }),
    pob: chance.city()
  })));

  await Reviewer.create([...Array(reviewerToCreate)].map(() => ({
    name: chance.name(),
    company: chance.name()
  })));

  const year = [1998, 2001, 1987, 1951, 2015, 2016];
  await Film.create([...Array(filmToCreate)]
    .map(() => ({
      title: chance.animal({ type: 'ocean' } + 'IV'),
      studioId: chance.pickone(studio)._id,
      released: chance.pickone(year),
      cast: [...Array(10)].map(() => ({ role: chance.name({ prefix: true }), actorId: chance.pickone(actor)._id }))    
    })));

};


