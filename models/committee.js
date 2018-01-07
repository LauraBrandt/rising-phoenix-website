'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const committeeMembersSchema = new Schema({
  index: Number,
  name: {type: String, required: true},
  organization: String,
  link: String,
});

module.exports = mongoose.model('CommitteeMembers', committeeMembersSchema);
