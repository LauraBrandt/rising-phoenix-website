"use strict";

const Home = require("../../models/home");

const xssFilters = require("xss-filters");
const validator = require("validator");

module.exports = {
  get: (res) => {
    Home
      .findOne({})
      .exec((err, homeInfo) => {
        if (err) {
          console.log(err);
          const newError = new Error("An error occurred fetching the homepage info.");
          res.status(err.status || 404).json({error: newError.message});
        } else {
          res.send(homeInfo);
        }
      });
  }, 

  post: (req, res, next) => {
    let sentHomeInfo = req.body;
    let valid = true;

    sentHomeInfo.goalAmount = xssFilters.inHTMLData(sentHomeInfo.goalAmount);
    if (sentHomeInfo.goalAmount !== "" && !validator.isFloat(sentHomeInfo.goalAmount.toString())) {
      const newError = new Error("Goal amount must be a valid number. Please try again.");
      valid = false;
      next(newError);
    }
    sentHomeInfo.donatedAmount = xssFilters.inHTMLData(sentHomeInfo.donatedAmount);
    if (sentHomeInfo.donatedAmount !== "" && !validator.isFloat(sentHomeInfo.donatedAmount.toString())) {
      const newError = new Error("Donated amount must be a valid number. Please try again.");
      valid = false;
      next(newError);
    }
    
    sentHomeInfo.tagline = validator.trim(xssFilters.inHTMLData(sentHomeInfo.tagline));
    sentHomeInfo.tagline = validator.isLength(sentHomeInfo.tagline, {min:0, max: 100}) ? sentHomeInfo.tagline : sentHomeInfo.tagline.substring(0,100);
    sentHomeInfo.blurbTitle = validator.trim(xssFilters.inHTMLData(sentHomeInfo.blurbTitle));
    sentHomeInfo.blurbTitle = validator.isLength(sentHomeInfo.blurbTitle, {min:0, max: 100}) ? sentHomeInfo.blurbTitle : sentHomeInfo.blurbTitle.substring(0,100);
    sentHomeInfo.blurb = validator.trim(xssFilters.inHTMLData(sentHomeInfo.blurb));
    sentHomeInfo.blurb = validator.isLength(sentHomeInfo.blurb, {min:0, max: 750}) ? sentHomeInfo.blurb : sentHomeInfo.blurb.substring(0,100);

    if (valid) {
      Home
        .findOne({})
        .exec((err, currHomeInfo) => {
          if (err) {
            console.log(err);
            const newError = new Error("An error occured fetching the homepage info.");
            newError.status = err.status;
            next(newError);
          } else if (!currHomeInfo) {
            console.log("No homepage info exists - creating new");
            const newHomeInfo = new Home(sentHomeInfo);
            newHomeInfo.save((err, updatedHomeInfo) => { // eslint-disable-line no-unused-vars
              if (err) {
                console.log(err);
                const newError = new Error("Homepage info was not saved.");
                newError.status = err.status;
                next(newError);
              }
              res.send({message: "Homepage info saved successfully."});
            });
          } else {
            currHomeInfo.tagline = sentHomeInfo.tagline;
            currHomeInfo.blurbTitle = sentHomeInfo.blurbTitle;
            currHomeInfo.blurb = sentHomeInfo.blurb;
            currHomeInfo.goalAmount = sentHomeInfo.goalAmount;
            currHomeInfo.donatedAmount = sentHomeInfo.donatedAmount;

            currHomeInfo.save((err, updatedHomeInfo) => { // eslint-disable-line no-unused-vars
              if (err) {
                console.log(err);
                const newError = new Error("Homepage info was not saved.");
                newError.status = err.status;
                next(newError);
              }
              res.send({message: "Homepage info saved successfully."});
            });
          }
        });
    }
  }
};