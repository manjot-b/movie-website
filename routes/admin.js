var express = require('express');
var router = express.Router();

var adminController = require('../controllers/admin');

router.get('/media', adminController.media_get);

router.get('/users', adminController.users_get);

router.get('/media/movie', adminController.media_get);

router.get('/media/add', adminController.media_add_get);

router.post('/media/add', adminController.media_add_post);

router.get('/media/edit', adminController.media_edit_get);

router.post('/media/edit', adminController.media_edit_post);

router.get('/media/delete', adminController.media_delete_get);

router.post('/media/delete', adminController.media_delete_post);

module.exports = router;