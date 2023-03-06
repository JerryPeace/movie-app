const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({ name: String, comment: String });
const movieSchema = new mongoose.Schema({
  film: String,
  genre: String,
  lead_studio: String,
  audience_score: Number,
  profitability: Number,
  rotten_tomatoes: Number,
  worldwide_gross: String,
  year: Number,
  comments: [commentSchema]
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
