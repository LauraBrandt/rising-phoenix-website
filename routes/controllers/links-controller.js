"use strict";

const Links = require("../../models/links");

const xssFilters = require("xss-filters");
const validator = require("validator");

module.exports = {
  get: (res) => {
    Links
      .findOne({})
      .exec((err, links) => {
        if (err) {
          console.log(err);
          const newError = new Error("An error occurred fetching the links.");
          res.status(err.status || 404).json({error: newError.message});
        } else {
          res.send(links);
        }
      });
  },

  post: (req, res, next) => {
    let linksSent = req.body;
    let linksValid = true;
  
    for (let linkKey in linksSent) {
      if (!linksSent.hasOwnProperty(linkKey)) {
        continue;
      }
  
      let sanitizedLink = xssFilters.inDoubleQuotedAttr(linksSent[linkKey]);
  
      if (!validator.isURL(sanitizedLink) && sanitizedLink !== "") {
        linksValid = false;
        const uppercaseLinkKey = linkKey.charAt(0).toUpperCase() + linkKey.slice(1);
        const message = `${uppercaseLinkKey} URL is not valid. Links not saved, please try again.`;
        res.json({message: message});
        break;
      }
      linksSent[linkKey] = sanitizedLink;
    }
  
    if (linksValid) {
      Links
        .findOne({})
        .exec((err, currLinks) => {
          if (err) {
            console.log(err);
            const newError = new Error("An error occured fetching the links.");
            newError.status = err.status;
            next(newError);
          } else if (!currLinks) {
            console.log("No links exist - creating new");
            const newLinks = new Links(linksSent);
            newLinks.save((err, updatedLinks) => { // eslint-disable-line no-unused-vars
              if (err) {
                console.log(err);
                const newError = new Error("Links were not saved.");
                newError.status = err.status;
                next(newError);
              }
              res.send({message: "Links saved successfully."});
            });
          } else {
            currLinks.facebook = linksSent.facebook;
            currLinks.twitter = linksSent.twitter;
            currLinks.instagram = linksSent.instagram;
            currLinks.donate = linksSent.donate;
            currLinks.save((err, updatedLinks) => { // eslint-disable-line no-unused-vars
              if (err) {
                console.log(err);
                const newError = new Error("Links were not saved.");
                newError.status = err.status;
                next(newError);
              }
              res.send({message: "Links saved successfully."});
            });
          }
        });
    }
  }
};