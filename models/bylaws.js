"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bylawsSchema = new Schema({
  content: String,
});

module.exports = mongoose.model("ByLaws", bylawsSchema);
