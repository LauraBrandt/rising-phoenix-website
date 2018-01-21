"use strict";

const IndividualSponsors = require("../../models/individualSponsors");

const xssFilters = require("xss-filters");
const validator = require("validator");

module.exports = {
  get: (res) => {
    IndividualSponsors
      .find({})
      .sort({index: 1})
      .exec((err, sponsors) => {
        if (err) {
          console.log(err);
          const newError = new Error("An error occurred fetching the sponsors.");
          res.status(err.status || 404).json({error: newError.message});
        } else {
          res.send(sponsors);
        }
      });
  },

  post: (req, res, next) => {
    let sponsors = req.body;
    let sanitizedIndex = "";
    let sanitizedName = "";
    sponsors = sponsors.map(sponsor => {
      sanitizedIndex = validator.isInt(sponsor.index.toString()) ? sponsor.index : -1;
      sanitizedName = validator.trim(xssFilters.inHTMLData(sponsor.name));
      sanitizedName = validator.isLength(sanitizedName, {min:0, max: 50}) ? sanitizedName : sanitizedName.substring(0,50);
      return ({index: sanitizedIndex, name: sanitizedName});
    });
    IndividualSponsors.remove({}, (err, docs) => { // eslint-disable-line no-unused-vars
      if (err) {
        console.log(err);
        const newError = new Error("There was a problem with your request.");
        newError.status = err.status;
        next(newError);
      }
      IndividualSponsors.create(sponsors, (err, docs) => {
        if (err) {
          console.log(err);
          const newError = new Error("There was a problem with your request.");
          newError.status = err.status;
          next(newError);
        }
        res.send({"message": `Success! ${docs.length} sponsors saved.`});
      });
    });
  }
};