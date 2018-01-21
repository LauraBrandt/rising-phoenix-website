"use strict";

const CommitteeMembers = require("../../models/committee");

const xssFilters = require("xss-filters");
const validator = require("validator");

module.exports = {
  get: (res) => {
    CommitteeMembers
      .find({})
      .sort({index: 1})
      .exec((err, committeeMembers) => {
        if (err) {
          console.log(err);
          const newError = new Error("An error occurred fetching the committee members.");
          res.status(err.status || 404).json({error: newError.message});
        } else {
          res.send(committeeMembers);
        }
      });
  },

  put: (req, res, next) => {
    const committeeMembers = req.body;
    const totalDocs = committeeMembers.length;
    let docsUpdated = 0;
  
    for (let i=0; i<totalDocs; i++) {
      CommitteeMembers.findByIdAndUpdate(committeeMembers[i]._id, {index: committeeMembers[i].index}, {new: true}, (err, updatedCommitteeMember) => { // eslint-disable-line no-unused-vars
        if (err) {
          console.log(err);
          const newError = new Error("Could not update index.");
          newError.status = err.status;
          next(newError);
        }
        docsUpdated += 1;
        if (docsUpdated === totalDocs) {
          res.send({"message": "Success! Committee members reordered."});
        }
      });
    }
  },

  post: (req, res, next) => {
    let sentCommitteeMember = req.body;
    let valid = true;
  
    sentCommitteeMember.name = validator.trim(xssFilters.inHTMLData(sentCommitteeMember.name));
    sentCommitteeMember.name = validator.isLength(sentCommitteeMember.name, {min:0, max: 100}) ? sentCommitteeMember.name : sentCommitteeMember.name.substring(0,100);
    sentCommitteeMember.affiliation = validator.trim(xssFilters.inHTMLData(sentCommitteeMember.affiliation));
    sentCommitteeMember.affiliation = validator.isLength(sentCommitteeMember.affiliation, {min:0, max: 100}) ? sentCommitteeMember.affiliation : sentCommitteeMember.affiliation.substring(0,100);
    sentCommitteeMember.link = validator.trim(xssFilters.inDoubleQuotedAttr(sentCommitteeMember.link));
    if (!validator.isURL(sentCommitteeMember.link) && !validator.isEmpty(sentCommitteeMember.link)) {
      const newError = new Error("Not a valid URL. Please try again.");
      valid = false;
      next(newError);
    } else if (!validator.isLength(sentCommitteeMember.link, {min:0, max: 150})) {
      const newError = new Error("Link exceeds maximum length (150 characters)");
      valid = false;
      next(newError);
    }
    if (!validator.isInt(sentCommitteeMember.index.toString()) && sentCommitteeMember.index !== "") {
      const newError = new Error("Index is not a valid number. Please try again.");
      valid = false;
      next(newError);
    }
  
    if (valid) {
      if (sentCommitteeMember._id) {
        // already existing member, need to update
        const updateObj = {
          name: sentCommitteeMember.name,
          affiliation: sentCommitteeMember.affiliation,
          link: sentCommitteeMember.link,
        };
        CommitteeMembers.findByIdAndUpdate(sentCommitteeMember._id, updateObj, {new: true}, function(err, updatedCommitteeMember) {
          console.log("updating committee member...");
          if (err) {
            console.log(err);
            const newError = new Error("Could not update committee member.");
            newError.status = err.status;
            next(newError);
          }
          res.send({"message": `Success! ${updatedCommitteeMember.name} saved.`});
        });
      } else {
        // new member, need to create
        let newCommitteeMember = new CommitteeMembers({
          name: sentCommitteeMember.name,
          affiliation: sentCommitteeMember.affiliation,
          link: sentCommitteeMember.link,
          index: sentCommitteeMember.index
        });
        newCommitteeMember.save(function (err, createdCommitteeMember) {
          console.log("creating committee member...");
          if (err) {
            console.log(err);
            const newError = new Error("Could not create committee member.");
            newError.status = err.status;
            next(newError);
          }
          res.send({"message": `Success! ${createdCommitteeMember.name} saved.`});
        });
      }
    }
  },

  delete: (req, res, next) => {
    CommitteeMembers.findByIdAndRemove(req.body.id, (err, deletedCommitteeMember) => {  
      if (err) {
        console.log(err);
        const newError = new Error("Could not delete committee member.");
        newError.status = err.status;
        next(newError);
      }
      res.send({"message": `Success! ${deletedCommitteeMember.name} removed.`});
    });
  }
};