const express = require('express');
const path = require('path');
var cors = require('cors')
const app = express();
const movies = require('./movies.json');
const PORT = 3000;

app.use(cors())
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/movies/get", (req, res) => {
  res.json(movies);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});