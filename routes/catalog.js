var express = require('express');
var router = express.Router();

var catalogController = require('../controllers/catalog')

router.get('/movie/:name', catalogController.movie_get);

module.exports = router;