const Movie = require('../models/Movie');


const generateObjectId = (data) => data.map((record) => ({ id: record._id,  ...record._doc }));
exports.addComment = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).send();
    }
    movie.comments.push({
      comment: req.body.comment,
      name: req.body.name
    });
    await movie.save();
    res.json({ id: movie._id , ...movie._doc });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(generateObjectId(movies));
  } catch (error) {
    res.status(500).send();
  }
};


exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.json({ id: movie._id , ...movie._doc });
  } catch (error) {
    res.status(500).send();
  }
};

