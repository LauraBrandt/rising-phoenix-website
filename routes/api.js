var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// router.get('/', (req, res, next) => {
//   console.log(req);
//   res.send("api route");
// });

router.post('/login', (req, res, next) => {
  if (req.body.username && req.body.password) {
    User.authenticate(req.body.username, req.body.password, (err, user) => {
      if (err || !user) {
        const err = new Error('Wrong user name or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.status(200).json({
          message: "login ok",
        });
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;
