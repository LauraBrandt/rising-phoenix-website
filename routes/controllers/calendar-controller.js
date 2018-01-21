"use strict";

const CalendarEvents = require("../../models/calendar");

const xssFilters = require("xss-filters");
const validator = require("validator");

module.exports = {
  get: (res) => {
    CalendarEvents
      .find({})
      .sort({index: 1})
      .exec((err, events) => {
        if (err) {
          console.log(err);
          const newError = new Error("An error occurred fetching the calendar events.");
          res.status(err.status || 404).json({error: newError.message});
        } else {
          res.send(events);
        }
      });
  }, 

  put: (req, res, next) => {
    const events = req.body;
    const totalDocs = events.length;
    let docsUpdated = 0;
  
    for (let i=0; i<totalDocs; i++) {
      CalendarEvents.findByIdAndUpdate(events[i]._id, {index: events[i].index}, {new: true}, (err, updatedEvent) => { // eslint-disable-line no-unused-vars
        if (err) {
          console.log(err);
          const newError = new Error("Could not update index.");
          newError.status = err.status;
          next(newError);
        }
        docsUpdated += 1;
        if (docsUpdated === totalDocs) {
          res.send({"message": "Success! Calendar events reordered."});
        }
      });
    }
  },

  post: (req, res, next) => {
    let sentEvent = req.body;
    let valid = true;
  
    if (!validator.isInt(sentEvent.index.toString()) && sentEvent.index !== "") {
      const newError = new Error("Index is not a valid number. Please try again.");
      valid = false;
      next(newError);
    }
    sentEvent.minutesLink = validator.trim(xssFilters.inDoubleQuotedAttr(sentEvent.minutesLink));
    if (!validator.isURL(sentEvent.minutesLink) && !validator.isEmpty(sentEvent.minutesLink)) {
      const newError = new Error("Not a valid URL. Please try again.");
      valid = false;
      next(newError);
    } else if (!validator.isLength(sentEvent.minutesLink, {min:0, max: 150})) {
      const newError = new Error("Link exceeds maximum length (150 characters)");
      valid = false;
      next(newError);
    }
    sentEvent.dateTime = validator.toDate(sentEvent.dateTime);
    if (!sentEvent.dateTime) {
      const newError = new Error("Not a valid date. Please try again.");
      valid = false;
      next(newError);
    }
    sentEvent.name = validator.trim(xssFilters.inHTMLData(sentEvent.name));
    sentEvent.name = validator.isLength(sentEvent.name, {min:0, max: 100}) ? sentEvent.name : sentEvent.name.substring(0,100);
    sentEvent.location = validator.trim(xssFilters.inHTMLData(sentEvent.location));
    sentEvent.location = validator.isLength(sentEvent.location, {min:0, max: 100}) ? sentEvent.location : sentEvent.location.substring(0,100);
    sentEvent.description = validator.trim(xssFilters.inHTMLData(sentEvent.description));
    sentEvent.description = validator.isLength(sentEvent.description, {min:0, max: 500}) ? sentEvent.description : sentEvent.description.substring(0,500);
  
    if (valid) {
      if (sentEvent._id) {
        // already existing event, need to update
        const updateObj = {
          name: sentEvent.name,
          dateTime: sentEvent.dateTime,
          location: sentEvent.location,
          description: sentEvent.description,
          minutesLink: sentEvent.minutesLink,
        };
        CalendarEvents.findByIdAndUpdate(sentEvent._id, updateObj, {new: true}, function(err, updatedEvent) {
          console.log("updating event...");
          if (err) {
            console.log(err);
            const newError = new Error("Could not update calendar event.");
            newError.status = err.status;
            next(newError);
          }
          res.send({"message": `Success! ${updatedEvent.name} saved.`});
        });
      } else {
        // new event, need to create
        let newEvent = new CalendarEvents({
          name: sentEvent.name,
          dateTime: sentEvent.dateTime,
          location: sentEvent.location,
          description: sentEvent.description,
          minutesLink: sentEvent.minutesLink,
          index: sentEvent.index
        });
        newEvent.save(function (err, createdEvent) {
          console.log("creating event...");
          if (err) {
            console.log(err);
            const newError = new Error("Could not create calendar event.");
            newError.status = err.status;
            next(newError);
          }
          res.send({"message": `Success! ${createdEvent.name} saved.`});
        });
      }
    }
  }, 

  delete: (req, res, next) => {
    CalendarEvents.findByIdAndRemove(req.body.id, (err, deletedEvent) => {  
      if (err) {
        console.log(err);
        const newError = new Error("Could not delete event.");
        newError.status = err.status;
        next(newError);
      }
      res.send({"message": `Success! ${deletedEvent.name} removed.`});
    });
  }
};