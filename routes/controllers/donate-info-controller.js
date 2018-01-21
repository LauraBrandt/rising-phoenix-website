"use strict";

const DonateInfo = require("../../models/donateInfo");

const xssFilters = require("xss-filters");
const validator = require("validator");

module.exports = {
  get: (res) => {
    DonateInfo
      .findOne({})
      .exec((err, donateInfo) => {
        if (err) {
          console.log(err);
          const newError = new Error("An error occurred fetching the donate info.");
          res.status(err.status || 404).json({error: newError.message});
        } else {
          res.send(donateInfo);
        }
      });
  }, 

  post: (req, res, next) => {
    let sentDonateInfo = req.body;
    let valid = true;
    const states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"];

    sentDonateInfo.donateText = xssFilters.inHTMLData(sentDonateInfo.donateText);
    if (!validator.isLength(sentDonateInfo.donateText, {min:0, max: 500})) {
      if (valid) {res.json({message: "Donate text too long - must be no more than 500 characters. Please try again."});}
      valid = false;
    }
    sentDonateInfo.rewardText = xssFilters.inHTMLData(sentDonateInfo.rewardText);
    if (!validator.isLength(sentDonateInfo.rewardText, {min:0, max: 500})) {
      if (valid) {res.json({message: "Reward text too long - must be no more than 500 characters. Please try again."});}
      valid = false;
    }
    sentDonateInfo.check.to = xssFilters.inHTMLData(sentDonateInfo.check.to);
    if (!validator.isLength(sentDonateInfo.check.to, {min:0, max: 100})) {
      
      if (valid) {res.json({message: "'Make checks out to' field too long - must be no more than 100 characters. Please try again."});}
      valid = false;
    }
    sentDonateInfo.check.name = xssFilters.inHTMLData(sentDonateInfo.check.name);
    if (!validator.isLength(sentDonateInfo.check.name, {min:0, max: 100})) {
      if (valid) {res.json({message: "Name too long - must be no more than 100 characters. Please try again."});}
      valid = false;
    }
    sentDonateInfo.check.address1 = xssFilters.inHTMLData(sentDonateInfo.check.address1);
    if (!validator.isLength(sentDonateInfo.check.address1, {min:0, max: 100})) {
      if (valid) {res.json({message: "Address too long - must be no more than 100 characters each line. Please try again."});}
      valid = false;
    }
    sentDonateInfo.check.address2 = xssFilters.inHTMLData(sentDonateInfo.check.address2);
    if (!validator.isLength(sentDonateInfo.check.address2, {min:0, max: 100})) {
      if (valid) {res.json({message: "Address too long - must be no more than 100 characters each line. Please try again."});}
      valid = false;
    }
    sentDonateInfo.check.city = xssFilters.inHTMLData(sentDonateInfo.check.city);
    if (!validator.isLength(sentDonateInfo.check.city, {min:0, max: 50})) {
      if (valid) {res.json({message: "City too long - must be no more than 50 characters each line. Please try again."});}
      valid = false;
    }
    sentDonateInfo.check.state = xssFilters.inHTMLData(sentDonateInfo.check.state);
    if (!validator.isIn(sentDonateInfo.check.state, states) && !validator.isEmpty(sentDonateInfo.check.state)) {
      if (valid) {res.json({message: "Invalid state - must be 2-letter state code. Please try again."});}
      valid = false;
    }
    sentDonateInfo.check.zip = xssFilters.inHTMLData(sentDonateInfo.check.zip);
    if (!validator.isPostalCode(sentDonateInfo.check.zip, "US")  && !validator.isEmpty(sentDonateInfo.check.state)) {
      if (valid) {res.json({message: "Invalid zip code - must be valid US postal code. Please try again."});}
      valid = false;
    }

    if (valid) {
      DonateInfo
        .findOne({})
        .exec((err, currDonateInfo) => {
          if (err) {
            console.log(err);
            const newError = new Error("An error occured fetching the donate info.");
            newError.status = err.status;
            next(newError);
          } else if (!currDonateInfo) {
            console.log("No donate info exists - creating new");
            const newDonateInfo = new DonateInfo(sentDonateInfo);
            newDonateInfo.save((err, updatedDonateInfo) => { // eslint-disable-line no-unused-vars
              if (err) {
                console.log(err);
                const newError = new Error("Donate info was not saved.");
                newError.status = err.status;
                next(newError);
              }
              res.send({message: "Donate info saved successfully."});
            });
          } else {
            currDonateInfo.donateText = sentDonateInfo.donateText;
            currDonateInfo.rewardText = sentDonateInfo.rewardText;
            currDonateInfo.check = sentDonateInfo.check;

            currDonateInfo.save((err, updatedDonateInfo) => { // eslint-disable-line no-unused-vars
              if (err) {
                console.log(err);
                const newError = new Error("Donate info was not saved.");
                newError.status = err.status;
                next(newError);
              }
              res.send({message: "Donate info saved successfully."});
            });
          }
        });
    }
  }
};