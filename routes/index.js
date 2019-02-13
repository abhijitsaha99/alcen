var express = require('express');
var router = express.Router();
var session;
const news = require('../models/notice')

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = news.find({})
  query.select('title body');
  query.exec((err,data) => {
    console.log(data);
    res.render('index', {"datas": data});
  })
  });

router.get('/ab1', function(req, res, next) {
  res.render("aboutus1");
});
router.get('/products', function(req, res, next) {
  res.render('products');
});
router.get('/details/:title', function(req, res, next) {
  var d=req.params.title;
  var query= news.find({title:d});
  query.select('title body');
  query.exec((err,data) => {
  console.log(data);
  res.render('detail', {"datas": data[0]});
  })
  });
  router.get('/login', function(req, res, next) {
  var flag=0;
  res.render('login', {
    title: 'form',
    success: false,
    errors: req.session.errors,
    "flag":flag
  });
  req.session.errors = null;
});
router.post('/login', function(req, res, next) {
  session = req.session;
  console.log(req.body);
  if (req.body.email == 'admin@xyz.com' && req.body.pass == 'admin') {
    session.uniqueID = req.body.email;
  }
  res.redirect('redirect');
});
router.get('/redirect', function(req, res, next) {
  session = req.session;
  var flag=0;
  if (session.uniqueID) {
    res.render('add');
    console.log(session.uniqueID);
  } else {
    {
      var flag=1;
      //res.end('kaun ho bhai');
     res.render('form',{"flag":flag});
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
