var express = require('express');
var router = express.Router();

var adminController = require('../controllers/admin');

router.get('/media', adminController.media_get);

router.get('/users', adminController.users_get);

router.get('/media/movie', adminController.media_movie_get);

router.get('/media/movie/add', adminController.media_movie_add_get);

router.get('/media/tv_show', adminController.media_tvshow_get);

router.get('/media/tv_show/add', adminController.media_tvshow_add_get);

module.exports = router;