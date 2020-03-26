const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  pob: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Actor', actorSchema);

