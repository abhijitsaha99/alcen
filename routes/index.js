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

router.get('/aboutus', function(req, res, next) {
  res.render("aboutus1");
});
router.get('/product', function(req, res, next) {
  res.render('product');
});
router.get('/f', function(req, res, next) {
  res.render('form');
});
router.get('/project', function(req, res, next) {
  res.render('project');
});
router.get('/details/:title', function(req, res, next) {
  var d=req.params.title;
  var temp;
  var query= news.find({title:d});
  query.select('title body');
  query.exec((err,data) => {
  // console.log("printing");
  temp=data;
  })
  var query2 = news.find({})
  query2.select('title body');
  query2.exec((err2,fulldata) => {
    console.log(err2);
    // console.log(fulldata);
    res.render('detail', {"datas": temp[0],"fulldata":fulldata});
  })
});
  router.get('/login', function(req, res, next) {
  var flag=0;
  res.render('login', {
    title: 'form',
    success: false,
    errors: req.session.errors,
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
  if (session.uniqueID) {
    res.render('add');
    console.log(session.uniqueID);
  } else {
    {
      res.render('form');
    }
  }
});
router.post('/enter', function(req, res) {
  //console.log(req.body);
  let latestnews = new news(req.body);
  // console.log(latestnews);
  latestnews.save()
    .then(res.redirect('/'))
    .catch((err) => console.log(err))
});


module.exports = router;
