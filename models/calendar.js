'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendarEventsSchema = new Schema({
  index: Number,
  dateTime: Date,
  name: {type: String, required: true},
  location: String,
  description: String,
  minutesLink: String
});

module.exports = mongoose.model('CalendarEvents', calendarEventsSchema);
