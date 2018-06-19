var express = require('express');
var router = express.Router();

var userController = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', userController.login_post);

router.get('/dashboard', userController.dashboard_get);

module.exports = router;
