"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linksSchema = new Schema({
  facebook: String,
  twitter: String,
  instagram: String,
  donate: String,
});

module.exports = mongoose.model("Links", linksSchema);
