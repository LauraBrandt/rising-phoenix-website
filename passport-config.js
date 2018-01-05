const LocalStrategy   = require('passport-local').Strategy;
const User            = require('./models/user');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use('local-signin', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    User.authenticate(username, password, (err, user) => {
      if (err) {
        console.log("COULD NOT LOG IN");
        const err = new Error('Wrong user name or password.');
        err.status = 401;
        return done(err);
      } else if (!user) {
        console.log("COULD NOT LOG IN");
        return done(null, false);
      } else {
        console.log("LOGGED IN AS: " + user.username);
        return done(null, user);
      }
    });
  }));
};