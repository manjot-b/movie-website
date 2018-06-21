var express = require('express');
var router = express.Router();

var catalogController = require('../controllers/catalog')

router.get('/search', catalogController.search_get);

router.post('/search', catalogController.search_post);

router.get('/:name', catalogController.movie_get);

module.exports = router;