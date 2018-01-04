'use strict'

// dependencies
const express = require('express');
const bodyParser  = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

require('dotenv').load();

// routes
// const site = require('./routes/site');
const api = require('./routes/api');

// set up app
const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set up passport
app.use(session({
  secret: 'thisisitguys',
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// set up database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB).then(  
  () => { 
    console.log('Connected to database.');
    // Serve static assets
    app.use(express.static(path.resolve(__dirname, 'build')))

    app.use('/api', api);
    // app.use('/', site);

    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json('error', {
        message: err.message,
        error: {}
      });
    });
  },
  err => { 
    console.log('ERROR connecting to: database. ' + err); 
  }
);

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Running on port ${port}`);
});
