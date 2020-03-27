const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
  },
  released: {
    type: Number,
    required: true, 
  },
  cast: [castSchema]
});

const castSchema = new mongoose.Schema({
  cast: [{
    role: {
      type: String,
      required: false
    },
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actor',
      required: true
    },
  }]
});

module.exports = mongoose.model('Film', filmSchema)
;
