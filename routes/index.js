var express = require('express');
var router = express.Router();
var session;
var flag=false;
const news = require('../models/notice');
const career = require('../models/careerSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = news.find({})
  query.select('title body');
  query.exec((err, data) => {
    //console.log(data);
    res.render('index', {
      "datas": data
    });
  })
});
router.get('/option',function (req,res,next) {
    session = req.session;
    if (session.uniqueID) {
      res.render('option');
      console.log(session.uniqueID);
    } else {
      {
        res.render('form');
      }
    }
  });
router.get('/delete/:title', function(req, res, next) {
  console.log("inside");
  var deleteTitle = req.params.title;
  news.deleteOne({
    title: deleteTitle
  }, function(err) {
    res.redirect('/');
  });
  });
router.get('/career', function(req, res, next) {
  var query = career.find({})
  query.select('careerTitle careerBody');
  query.exec((err, data) => {
    console.log(data);
    res.render('career', {
      "datas": data
    });
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
router.get('/details/:title', async function(req, res, next) {
 let title = req.params.title
 let datas = await news.find({title: title}, 'title body')
 let fulldata = await news.find({}, 'title body')
 console.log(flag);
 res.render('detail', {
   "datas": datas[0], "fulldata": fulldata , "flag":flag
 })
});
router.get('/login', function(req, res, next) {
//  var flag = 0;
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
    flag=true;
  }
  else{
    flag=false;
  }
  res.redirect('redirect');
});
router.get('/redirect', function(req, res, next) {
  session = req.session;
  if (session.uniqueID) {
    res.redirect('option');
    console.log(session.uniqueID);
  } else {
    {
      res.render('form');
    }
  }
});
router.get('/optdssdsdssd', function(req, res, next) {
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
router.get('/addcareer', function(req, res, next) {
    session = req.session;
    if (session.uniqueID) {
      res.render('careeradd');
      console.log(session.uniqueID);
    } else {
      {
        res.render('form');
      }
    }
  });
router.post('/addcareer', function(req, res) {
  let newCareer = new career(req.body);
  console.log(newCareer);
  newCareer.save()
    .then(res.redirect('/career'))
    .catch((err) => console.log(err))
});
module.exports = router;
