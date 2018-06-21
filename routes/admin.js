var express = require('express');
var router = express.Router();

var adminController = require('../controllers/admin');

router.get('/media', adminController.media_get);

router.get('/users', adminController.users_get);

router.get('/media/movie', adminController.media_movie_get);

router.get('/media/movie/add', adminController.media_movie_add_get);

router.post('/media/movie/add', adminController.media_movie_add_post);

router.get('/media/movie/edit', adminController.media_movie_edit_get);

router.post('/media/movie/edit', adminController.media_movie_edit_post);

router.get('/media/movie/delete', adminController.media_movie_delete_get);

router.post('/media/movie/delete', adminController.media_movie_delete_post);

router.get('/media/tv_show', adminController.media_tvshow_get);

router.get('/media/tv_show/add', adminController.media_tvshow_add_get);

module.exports = router;