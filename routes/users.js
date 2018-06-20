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

router.get('/profile', userController.profile_get);

router.get('/friends', userController.friends_get); 

module.exports = router;
