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
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

reviewSchema.statics.getTop10Reviews = function() {
  return this.aggregate([
    {
      '$sort': {
        'rating': 1
      }
    }, {
      '$limit': 100
    }, {
      '$lookup': {
        'from': 'films', 
        'localField': 'filmId', 
        'foreignField': '_id', 
        'as': 'film'
      }
    }, {
      '$unwind': {
        'path': '$film'
      }
    }, {
      '$project': {
        'rating': true, 
        'review': true, 
        'film': {
          '_id': true, 
          'title': true
        }
      }
    }, {}
  ]);
};

module.exports = mongoose.model('Review', reviewSchema)
;
