"use strict";

const ByLaws = require("../../models/bylaws");

module.exports = {
  get: (res) => {
    ByLaws
      .findOne({})
      .exec((err, bylaws) => {
        if (err) {
          console.log(err);
          const newError = new Error("An error occurred fetching the by-laws.");
          res.status(err.status || 404).json({error: newError.message});
        } else {
          res.send(bylaws);
        }
      });
  },

  post: (req, res, next) => {
    let sentBylaws = req.body;
    
    ByLaws
      .findOne({})
      .exec((err, oldBylaws) => {
        if (err) {
          console.log(err);
          const newError = new Error("There was a problem with your request.");
          newError.status = err.status;
          next(newError);
        } else if (!oldBylaws) {
          console.log("No by-laws exist - creating new");
          const newBylaws = new ByLaws(sentBylaws);
          newBylaws.save((err, updatedBylaws) => { // eslint-disable-line no-unused-vars
            if (err) {
              console.log(err);
              const newError = new Error("By-laws were not saved.");
              newError.status = err.status;
              next(newError);
            }
            res.send({message: "By-laws saved successfully."});
          });
        } else {
          console.log("Updating by-laws...");
          oldBylaws.content = sentBylaws.content;
          oldBylaws.save((err, updatedBylaws) => { // eslint-disable-line no-unused-vars
            if (err) {
              console.log(err);
              const newError = new Error("By-laws were not saved.");
              newError.status = err.status;
              next(newError);
            }
            res.send({message: "By-laws saved successfully."});
          });
        }
      });
  }
};