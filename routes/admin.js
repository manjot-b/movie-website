var express = require('express');
var router = express.Router();

var adminController = require('../controllers/admin');

router.get('/media', adminController.media_get);

router.get('/users', adminController.users_get);

router.get('/media/add', adminController.media_add_get);

router.get('/media/edit', adminController.media_edit_get);

router.get('/media/delete', adminController.media_delete_get);

module.exports = router;