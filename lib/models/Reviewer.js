const mongoose = require('mongoose');

const reviewerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
  }
}); 

reviewerSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'reviewer'
});

// reviewerSchema.statics.deleteIfNoReviews = function(id) {
//   return this.model('Review.').find({ reviewer: id })
//     .then(reviews => {
//       if(reviews.length === 0) {
//         return this.findByIdAndDelete(id);
//       } else {
//         throw Error('Reviewer cannot be deleted with active reviews');
//       }
//     });
// };

module.exports = mongoose.model('Reviewer', reviewerSchema);
