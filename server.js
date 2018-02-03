"use strict";

// dependencies
const express = require("express");
const bodyParser  = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
// var helmet = require('helmet');

require("dotenv").config();

// set up app
const app = express();

app.use(morgan("common"));

// app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: "5mb"}));

app.use(cors());

// routes
const api = require("./routes/api");

// set up database
const dbpw = encodeURIComponent(process.env.MONGODB_COSMODB_PW)
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.MONGODB_COSMODB_NAME}:${dbpw}@${process.env.MONGODB_COSMODB_NAME}.documents.azure.com:10250/mean?ssl=true&sslverifycertificate=false`).then(  
  () => { 
    console.log("Connected to database.");
    // Serve static assets
    app.use(express.static(path.resolve(__dirname, "build")));

    app.use("/api", api);

    app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
      res.status(err.status || 500).json({
        message: err.message,
        error: err
      });
    });
  },
  err => { 
    console.log("ERROR connecting to database. " + err); 
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
