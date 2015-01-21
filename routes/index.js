var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Address book' });
});

/* GET register page */
router.register = function(req,res){
    res.render('registerUser', {});
}

/* GET adda page */
router.adda = function(req,res){
res.render("addaddress",{});
}

module.exports = router;
