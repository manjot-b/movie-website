var express = require('express');
var router = express.Router();

var userController = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', userController.login_post);

router.get('/login', userController.login_get);

router.get('/dashboard', userController.dashboard_get);

router.get('/signup', userController.signup_get);

router.post('/signup', userController.signup_post);

router.get('/friends', userController.friends_get); 

router.post('/friends', userController.friends_post);

router.get('/my-media', userController.my_media_get);

router.post('/my-media', userController.my_media_post);

router.get('/search', userController.search_get);

router.post('/search', userController.search_post);

router.get('/editprofile', userController.editprofile_get);

router.post('/editprofile', userController.editprofile_post);

router.post('/profile/:username', userController.profile_post);

router.get('/profile/:username', userController.profile_get);



module.exports = router;
