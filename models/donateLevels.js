'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donateLevelsSchema = new Schema({
  index: Number,
  amountStart: Number,
  amountEnd: Number,
  name: String,
  reward: String
});

module.exports = mongoose.model('DonateLevels', donateLevelsSchema);
