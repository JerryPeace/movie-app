const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const movieRoutes = require('./routes/movie');
require('dotenv').config();

const app = express();
const port = 4000;
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.lek1tsx.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Failed to connect to MongoDB', err);
});

app.use(cors())
app.use(express.json());
app.use('/movies', movieRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
