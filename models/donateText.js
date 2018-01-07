'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donateTextSchema = new Schema({
  donateTitle: String,
  donateText: String,
  rewardTitle: String,
  rewardText: String,
  check: {
      to: String, 
      name: String, 
      address1: String, 
      address2: String, 
      city: String, 
      state: String, 
      zip: String}
});

module.exports = mongoose.model('DonateText', donateTextSchema);
