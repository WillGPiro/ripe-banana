const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    max: 5,
    min:1
  },
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer',
    required: false
  },
  review: {
    type: String,
    maxlength: 140,
    required: true
  },
  filmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
    required: false
  }
});

module.exports = mongoose.model('Review', reviewSchema)
;
