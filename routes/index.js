var express = require('express');
var router = express.Router();

var indexController = require('../controllers/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', indexController.logout_post);

module.exports = router;
