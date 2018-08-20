"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeSchema = new Schema({
  tagline: String,
  blurbTitle: String,
  blurb: String,
  // goalAmount: Number,
  donatedAmount: Number,
});

module.exports = mongoose.model("Home", homeSchema);
