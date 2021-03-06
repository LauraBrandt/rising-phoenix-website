"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calendarEventsSchema = new Schema({
  index: Number,
  name: {type: String, required: true},
  dateTime: {type: Date, required: true},
  location: String,
  description: String,
  minutesLink: String
});

module.exports = mongoose.model("CalendarEvents", calendarEventsSchema);
