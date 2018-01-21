"use strict";

const AboutContent = require("../../models/about");

module.exports = {
  get: (res) => {
    AboutContent
      .findOne({})
      .exec((err, aboutContent) => {
        if (err) {
          console.log(err);
          const newError = new Error("An error occurred fetching the about page content.");
          res.status(err.status || 404).json({error: newError.message});
        } else {
          res.send(aboutContent);
        }
      });
  },

  post: (req, res, next) => {
    let sentAbout = req.body;
    
    AboutContent
      .findOne({})
      .exec((err, oldAbout) => {
        if (err) {
          console.log(err);
          const newError = new Error("There was a problem with your request.");
          newError.status = err.status;
          next(newError);
        } else if (!oldAbout) {
          console.log("No about content exists - creating new");
          const newAbout = new AboutContent(sentAbout);
          newAbout.save((err, updatedAbout) => { // eslint-disable-line no-unused-vars
            if (err) {
              console.log(err);
              const newError = new Error("About content was not saved.");
              newError.status = err.status;
              next(newError);
            }
            res.send({message: "About content saved successfully."});
          });
        } else {
          console.log("Updating about content...");
          oldAbout.content = sentAbout.content;
          oldAbout.save((err, updatedAbout) => { // eslint-disable-line no-unused-vars
            if (err) {
              console.log(err);
              const newError = new Error("About content was not saved.");
              newError.status = err.status;
              next(newError);
            }
            res.send({message: "About content saved successfully."});
          });
        }
      });
  }
};