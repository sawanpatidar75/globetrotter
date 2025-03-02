const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
  name: String,
  clues: [String],
  funFacts: [String],
  trivia: [String],
});

module.exports = mongoose.model('Destination', DestinationSchema);
