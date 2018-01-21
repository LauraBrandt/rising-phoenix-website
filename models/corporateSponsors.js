"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const corporateSponsorSchema = new Schema({
  index: Number,
  name: {type: String, required: true},
  logo: String,
  link: String
});

module.exports = mongoose.model("CorporateSponsors", corporateSponsorSchema);
