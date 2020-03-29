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
  released: {
    type: Number,
    required: true, 
  },
  studioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
  },
  cast: [castSchema]
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

filmSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'review'
});

module.exports = mongoose.model('Film', filmSchema)
;
