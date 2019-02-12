var express = require('express');
var router = express.Router();
var session;
const news = require('../models/notice')

/* GET home page. */
router.get('/', function(req, res, next) {});
router.get('/ab1', function(req, res, next) {
  res.render("aboutus1");
});
router.get('/ab2', function(req, res, next) {
  res.render('aboutus2');
});
router.get('/ab3', function(req, res, next) {
  res.render('aboutus3');
});
router.get('/ab4', function(req, res, next) {
  res.render('aboutus4');
});
router.get('/ab5', function(req, res, next) {
  res.render('aboutus5');
});
router.get('/products', function(req, res, next) {
  res.render('products');
});
router.get('/details/:title', function(req, res, next) {
  var content=req.params.title;
  var query= news.find({title:content});
  query.select('title body');
  query.exec((err,data) => {
  console.log(data);
  res.render('detail', {"datas": data[0]});
  })
  });
router.get('/login', function(req, res, next) {
  res.render('form', {
    title: 'form',
    success: false,
    errors: req.session.errors
  });
  req.session.errors = null;
});
router.post('/login', function(req, res, next) {
  session = req.session;
  console.log(req.body);
  if (req.body.email == 'admin' && req.body.pass == 'admin') {
    session.uniqueID = req.body.email;
  }
  res.redirect('redirect')
});
router.get('/redirect', function(req, res, next) {
  session = req.session;
  if (session.uniqueID) {
    res.render('add');
    console.log(session.uniqueID);
  } else {
    {
      res.end('kaun ho bhai');
    }
  }
});
router.post('/enter', function(req, res) {
  //console.log(req.body);
  let latestnews = new news(req.body);
  console.log(latestnews);
  latestnews.save()
    .then(res.redirect('/tst'))
    .catch((err) => console.log(err))
});
router.get('/tst', function(req, res, next) {
  var query = news.find({})
  query.select('title body');
  query.exec((err,data) => {
    console.log(data);
    res.render('test', {"datas": data});
  })
  });

module.exports = router;
