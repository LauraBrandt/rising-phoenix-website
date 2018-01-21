"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const individualSponsorSchema = new Schema({
  index: Number,
  name: {type: String, required: true},
});

module.exports = mongoose.model("IndividualSponsors", individualSponsorSchema);
