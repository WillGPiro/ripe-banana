const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
  role: {
    type: String,
    required: false
  },
  actorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actor',
    required: true
  },
});

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

module.exports = mongoose.model('Film', filmSchema)
;
