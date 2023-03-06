const express = require('express');
const movieController = require('../controllers/movie');

const router = express.Router();

router.post('/:id/comments', movieController.addComment);
router.get('/:id', movieController.getMovie);
router.get('/', movieController.getMovies);

module.exports = router;