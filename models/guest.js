const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Msg: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Guest = mongoose.model('Guest', GuestSchema);

module.exports = Guest;