const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  pob: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) =>{
      delete ret.id;
    }
  }
});

actorSchema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'actor'
});

module.exports = mongoose.model('Actor', actorSchema);

