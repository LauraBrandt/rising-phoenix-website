'use strict';

const DonateLevels = require('../../models/donateLevels');

const xssFilters = require('xss-filters');
const validator = require('validator');

module.exports = {
  get: (res) => {
    DonateLevels
      .find({})
      .sort({index: 1})
      .exec((err, donateLevels) => {
        if (err) {
          console.log(err);
          const newError = new Error('An error occurred fetching the donate levels.');
          res.status(err.status || 404).json({error: newError.message});
        } else {
          res.send(donateLevels);
        }
      });
  },

  put: (req, res, next) => {
    const donateLevels = req.body;
    const totalDocs = donateLevels.length;
    let docsUpdated = 0;
  
    for (let i=0; i<totalDocs; i++) {
      DonateLevels.findByIdAndUpdate(donateLevels[i]._id, {index: donateLevels[i].index}, {new: true}, (err, updatedLevel) => {
        if (err) {
          console.log(err);
          const newError = new Error('Could not update index.');
          newError.status = err.status;
          next(newError);
        }
        docsUpdated += 1;
        if (docsUpdated === totalDocs) {
          res.send({'message': `Success! Donate levels reordered.`});
        }
      });
    }
  },

  post: (req, res, next) => {
    let sentDonateLevel = req.body;
    let valid = true;

    sentDonateLevel.amountStart = xssFilters.inHTMLData(sentDonateLevel.amountStart);
    if (sentDonateLevel.amountStart !== "" && !validator.isFloat(sentDonateLevel.amountStart.toString())) {
      const newError = new Error('Start amount must be a valid number. Please try again.');
      valid = false;
      next(newError);
    }
    sentDonateLevel.amountEnd = xssFilters.inHTMLData(sentDonateLevel.amountEnd)
    if (sentDonateLevel.amountEnd!== "" && !validator.isFloat(sentDonateLevel.amountEnd.toString())) {
      const newError = new Error('End amount must be a valid number. Please try again.');
      valid = false;
      next(newError);
    }
    if (sentDonateLevel.index !== '' && !validator.isInt(sentDonateLevel.index.toString())) {
      const newError = new Error('Index is not a valid number. Please try again.');
      valid = false;
      next(newError);
    }
    sentDonateLevel.name = validator.trim(xssFilters.inHTMLData(sentDonateLevel.name));
    sentDonateLevel.name = validator.isLength(sentDonateLevel.name, {min:0, max: 100}) ? sentDonateLevel.name : sentDonateLevel.name.substring(0,100);
    sentDonateLevel.reward = validator.trim(xssFilters.inHTMLData(sentDonateLevel.reward));
    sentDonateLevel.reward = validator.isLength(sentDonateLevel.reward, {min:0, max: 100}) ? sentDonateLevel.reward : sentDonateLevel.reward.substring(0,100);
  
    if (valid) {
      if (sentDonateLevel._id) {
        // already existing level, need to update
        const updateObj = {
          amountStart: sentDonateLevel.amountStart,
          amountEnd: sentDonateLevel.amountEnd,
          name: sentDonateLevel.name,
          reward: sentDonateLevel.reward,
        }
        DonateLevels.findByIdAndUpdate(sentDonateLevel._id, updateObj, {new: true}, function(err, updatedLevel) {
          console.log('updating donate level...');
          if (err) {
            console.log(err);
            const newError = new Error('Could not update donate level.');
            newError.status = err.status;
            next(newError);
          }
          res.send({'message': `Success! ${updatedLevel.name} saved.`});
        });
      } else {
        // new level, need to create
        let newDonateLevel = new DonateLevels({
          amountStart: sentDonateLevel.amountStart,
          amountEnd: sentDonateLevel.amountEnd,
          name: sentDonateLevel.name,
          reward: sentDonateLevel.reward,
          index: sentDonateLevel.index
        });
        newDonateLevel.save(function (err, createdLevel) {
          console.log('creating donate level...');
          if (err) {
            console.log(err);
            const newError = new Error('Could not create donate level.');
            newError.status = err.status;
            next(newError);
          }
          res.send({'message': `Success! ${createdLevel.name} saved.`});
        });
      }
    }
  },

  delete: (req, res, next) => {
    DonateLevels.findByIdAndRemove(req.body.id, (err, deletedLevel) => {  
      if (err) {
        console.log(err);
        const newError = new Error('Could not delete donate level.');
        newError.status = err.status;
        next(newError);
      }
      res.send({'message': `Success! ${deletedLevel.name} removed.`});
    });
  }
};