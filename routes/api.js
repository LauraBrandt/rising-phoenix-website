const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.use(passport.initialize());
router.use(passport.session()); // persistent login sessions

const passportConfig = require('../passport-config')(passport);

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// temporary, delete after development
router.get('/', (req, res, next) => {
  console.log(req.user)
  res.send("api route");
});

router.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/admin/dashboard',
  failureRedirect: '/admin'
  })
);

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out.";
});


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  req.session.error = 'Please sign in!';
  res.redirect('/admin');
}

module.exports = router;
