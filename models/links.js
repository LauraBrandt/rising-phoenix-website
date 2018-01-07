'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linksSchema = new Schema({
  facebook: String,
  twitter: String,
  goFundMe: String,
});

module.exports = mongoose.model('Links', linksSchema);
