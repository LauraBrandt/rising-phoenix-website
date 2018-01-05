'use strict'

// dependencies
const express = require('express');
const bodyParser  = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('dotenv').load();

// routes
const api = require('./routes/api');

// set up app
const app = express();

app.use(morgan('dev'));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'thisisitguys',
  resave: true,
  saveUninitialized: false
}));

// set up database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB).then(  
  () => { 
    console.log('Connected to database.');
    // Serve static assets
    app.use(express.static(path.resolve(__dirname, 'build')))

    app.use('/api', api);

    app.use(function(err, req, res, next) {
      res.status(err.status || 500).json({
        message: err.message,
        error: {}
      });
    });
  },
  err => { 
    console.log('ERROR connecting to database. ' + err); 
  }
);

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Running on port ${port}`);
});
