'use strict'

// dependencies
const express = require('express');
const bodyParser  = require('body-parser');
const morgan = require('morgan');
const path = require('path');
// const mongoose = require('mongoose');

require('dotenv').load();

// routes
// const site = require('./routes/site');
const api = require('./routes/api');

// set up app
const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB, {
//   useMongoClient: true
// }).then(  
//   () => { 
//     console.log('Connected to: ' + process.env.MONGODB);
//     app.use(express.static(path.join(__dirname, 'client', 'build')));
//   },
//   err => { 
//     console.log('ERROR connecting to: ' + process.env.MONGODB + '. ' + err); 
//   }
// );

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });

// Serve static assets
app.use(express.static(path.resolve(__dirname, 'build')))

app.use('/api', api);
// app.use('/', site);

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Running on port ${port}`);
});
