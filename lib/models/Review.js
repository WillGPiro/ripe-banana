const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer.js',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    max: 5,
    min:1
  },
  review: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Reviewer', reviewSchema)
;
