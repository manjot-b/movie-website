var express = require('express');
var router = express.Router();

var catalogController = require('../controllers/catalog')

router.get('/movie/:name', catalogController.movie_get);

router.get('/search', catalogController.search_get);

router.post('/search', catalogController.search_post);


module.exports = router;