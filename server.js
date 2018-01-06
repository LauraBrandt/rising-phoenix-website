'use strict'

// dependencies
const express = require('express');
const bodyParser  = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

// set up app
const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// routes
const api = require('./routes/api');

// set up database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL).then(  
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
