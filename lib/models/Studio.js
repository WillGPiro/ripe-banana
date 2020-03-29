const mongoose = require('mongoose');

const studioSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  address: {
    city: {
      type: String,
      required: false
    },
    state: {
      type: String,
      required: false
    },
    country: {
      type: String,
      required: false
    }
  }
}, {
  toJSON: {
    virtuals: true
  } 
});

studioSchema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'studio'
});

module.exports = mongoose.model('Studio', studioSchema);
