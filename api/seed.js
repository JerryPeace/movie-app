const mongoose = require('mongoose');
const MovieComment = require('./models/Movie');
const data = require('./movies.json');
require('dotenv').config();

const movies = data.map((item) => ({ ...item, comments: [] }));

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.lek1tsx.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');

  MovieComment.insertMany(movies, (err, docs) => {
    console.log(err || 'Initial data inserted into MongoDB');
    mongoose.connection.close();
  });

}).catch((err) => {
  console.log('Failed to connect to MongoDB', err);
});
