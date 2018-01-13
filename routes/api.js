'use strict'

// dependencies
const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const xssFilters = require('xss-filters');
const validator = require('validator');

// models
const IndividualSponsors = require('../models/individualSponsors');
const DonateInfo = require('../models/donateInfo');
const Links = require('../models/links');
const CommitteeMembers = require('../models/committee');

/// AUTHENTICATION
const authCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

/// ROUTES - GET
router.get('/committee-members', (req, res) => {
  CommitteeMembers
    .find({})
    .sort({index: 1})
    .exec((err, committeeMembers) => {
      if (err) {
        console.log(err);
        const newError = new Error('An error occurred fetching the committee members.');
        res.status(err.status || 404).json({error: newError.message});
      } else {
        res.send(committeeMembers);
      }
    });
});

router.get('/individual-sponsors', (req, res) => {
  IndividualSponsors
    .find({})
    .sort({index: 1})
    .exec((err, sponsors) => {
      if (err) {
        console.log(err)
        const newError = new Error('An error occurred fetching the sponsors.');
        res.status(err.status || 404).json({error: newError.message});
      } else {
        res.send(sponsors);
      }
    });
});

router.get('/donate-info', (req, res) => {
  DonateInfo
    .findOne({})
    .exec((err, donateInfo) => {
      if (err) {
        console.log("in api", err)
        const newError = new Error('An error occurred fetching the donate info.');
        res.status(err.status || 404).json({error: newError.message});
      } else {
        res.send(donateInfo);
      }
    });
});

router.get('/links', (req, res) => {
  Links
    .findOne({})
    .exec((err, links) => {
      if (err) {
        console.log("in api", err)
        const newError = new Error('An error occurred fetching the links.');
        res.status(err.status || 404).json({error: newError.message});
      } else {
        res.send(links);
      }
    });
});

/// ROUTES - POST
router.post('/committee-members', authCheck, (req, res, next) => {  
  let sentCommitteeMember = req.body;
  let valid = true;

  sentCommitteeMember.name = validator.trim(xssFilters.inHTMLData(sentCommitteeMember.name));
  sentCommitteeMember.name = validator.isLength(sentCommitteeMember.name, {min:0, max: 100}) ? sentCommitteeMember.name : sentCommitteeMember.name.substring(0,100);
  sentCommitteeMember.affiliation = validator.trim(xssFilters.inHTMLData(sentCommitteeMember.affiliation));
  sentCommitteeMember.affiliation = validator.isLength(sentCommitteeMember.affiliation, {min:0, max: 100}) ? sentCommitteeMember.affiliation : sentCommitteeMember.affiliation.substring(0,100);
  sentCommitteeMember.link = validator.trim(xssFilters.inDoubleQuotedAttr(sentCommitteeMember.link));
  if (!validator.isURL(sentCommitteeMember.link) && !validator.isEmpty(sentCommitteeMember.link)) {
    const newError = new Error('Not a valid URL. Please fix it and try again.');
    valid = false;
    next(newError);
  } else if (!validator.isLength(sentCommitteeMember.link, {min:0, max: 150})) {
    const newError = new Error('Link exceeds maximum length (150 characters)');
    valid = false;
    next(newError);
  }
  if (!validator.isInt(sentCommitteeMember.index.toString()) && sentCommitteeMember.index !== '') {
    const newError = new Error('Index is not a valid number. Please try again.');
    valid = false;
    next(newError);
  }
  
  // check about reordering/index stuff????

  if (valid) {
    if (sentCommitteeMember._id) {
      // already existing member, need to update
      const updateObj = {
        name: sentCommitteeMember.name,
        affiliation: sentCommitteeMember.affiliation,
        link: sentCommitteeMember.link,
      }
      CommitteeMembers.findByIdAndUpdate(sentCommitteeMember._id, updateObj, {new: true}, function(err, updatedCommitteeMember) {
        console.log('updating committee member...');
        if (err) {
          console.log(err);
          const newError = new Error('Could not update committee member.');
          newError.status = err.status;
          next(newError);
        }
        res.send({'message': `Success! ${updatedCommitteeMember.name} saved.`});
      });
    } else {
      // new member, need to create
      var newCommitteeMember = new CommitteeMembers({
        name: sentCommitteeMember.name,
        affiliation: sentCommitteeMember.affiliation,
        link: sentCommitteeMember.link,
        index: sentCommitteeMember.index
      });
      newCommitteeMember.save(function (err, createdCommitteeMember) {
        console.log('creating committee member...');
        if (err) {
          console.log(err);
          const newError = new Error('Could not create committee member.');
          newError.status = err.status;
          next(newError);
        }
        res.send({'message': `Success! ${createdCommitteeMember.name} saved.`});
      });
    }
  }
});

router.post('/individual-sponsors', authCheck, (req, res) => {
  let sponsors = req.body;
  let sanitizedIndex = "";
  let sanitizedName = "";
  sponsors = sponsors.map(sponsor => {
    sanitizedIndex = validator.isInt(sponsor.index.toString()) ? sponsor.index : -1;
    sanitizedName = validator.trim(xssFilters.inHTMLData(sponsor.name));
    sanitizedName = validator.isLength(sanitizedName, {min:0, max: 50}) ? sanitizedName : sanitizedName.substring(0,50);
    return ({index: sanitizedIndex, name: sanitizedName})
  });
  IndividualSponsors.remove({}, (err, docs) => {
    if (err) {
      console.log(err)
      const newError = new Error('There was a problem with your request.');
      res.status(err.status || 404).json({message: newError.message});
    }
    IndividualSponsors.create(sponsors, (err, docs) => {
      if (err) {
        console.log(err)
        const newError = new Error('There was a problem with your request.');
        res.status(err.status || 404).json({message: newError.message});
      }
      res.send({'message': `Success! ${docs.length} sponsors saved.`})
    });
  });
});

router.post('/donate-info', authCheck, (req, res) => {
  let sentDonateInfo = req.body;
  let valid = true;
  const states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"]

  sentDonateInfo.donateTitle = xssFilters.inHTMLData(sentDonateInfo.donateTitle);
  if (!validator.isLength(sentDonateInfo.donateTitle, {min:0, max: 100})) {
    if (valid) {res.json({message: "Subtitle 1 too long - must be no more than 100 characters. Please fix and try again."});}
    valid = false;
  }
  sentDonateInfo.donateText = xssFilters.inHTMLData(sentDonateInfo.donateText);
  if (!validator.isLength(sentDonateInfo.donateText, {min:0, max: 500})) {
    if (valid) {res.json({message: "Donate text too long - must be no more than 500 characters. Please fix and try again."});}
    valid = false;
  }
  sentDonateInfo.rewardTitle = xssFilters.inHTMLData(sentDonateInfo.rewardTitle);
  if (!validator.isLength(sentDonateInfo.rewardTitle, {min:0, max: 100})) {
    if (valid) {res.json({message: "Subtitle 2 too long - must be no more than 100 characters. Please fix and try again."});}
    valid = false;
  }
  sentDonateInfo.rewardText = xssFilters.inHTMLData(sentDonateInfo.rewardText);
  if (!validator.isLength(sentDonateInfo.rewardText, {min:0, max: 500})) {
    if (valid) {res.json({message: "Reward text too long - must be no more than 500 characters. Please fix and try again."});}
    valid = false;
  }
  sentDonateInfo.check.to = xssFilters.inHTMLData(sentDonateInfo.check.to);
  if (!validator.isLength(sentDonateInfo.check.to, {min:0, max: 100})) {
    
    if (valid) {res.json({message: "'Make checks out to' field too long - must be no more than 100 characters. Please fix and try again."});}
    valid = false;
  }
  sentDonateInfo.check.name = xssFilters.inHTMLData(sentDonateInfo.check.name);
  if (!validator.isLength(sentDonateInfo.check.name, {min:0, max: 100})) {
    if (valid) {res.json({message: "Name too long - must be no more than 100 characters. Please fix and try again."});}
    valid = false;
  }
  sentDonateInfo.check.address1 = xssFilters.inHTMLData(sentDonateInfo.check.address1);
  if (!validator.isLength(sentDonateInfo.check.address1, {min:0, max: 100})) {
    if (valid) {res.json({message: "Address too long - must be no more than 100 characters each line. Please fix and try again."});}
    valid = false;
  }
  sentDonateInfo.check.address2 = xssFilters.inHTMLData(sentDonateInfo.check.address2);
  if (!validator.isLength(sentDonateInfo.check.address2, {min:0, max: 100})) {
    if (valid) {res.json({message: "Address too long - must be no more than 100 characters each line. Please fix and try again."});}
    valid = false;
  }
  sentDonateInfo.check.city = xssFilters.inHTMLData(sentDonateInfo.check.city);
  if (!validator.isLength(sentDonateInfo.check.city, {min:0, max: 50})) {
    if (valid) {res.json({message: "City too long - must be no more than 50 characters each line. Please fix and try again."});}
    valid = false;
  }
  sentDonateInfo.check.state = xssFilters.inHTMLData(sentDonateInfo.check.state);
  if (!validator.isIn(sentDonateInfo.check.state, states) && !validator.isEmpty(sentDonateInfo.check.state)) {
    if (valid) {res.json({message: "Invalid state - must be 2-letter state code. Please fix and try again."});}
    valid = false;
  }
  sentDonateInfo.check.zip = xssFilters.inHTMLData(sentDonateInfo.check.zip);
  if (!validator.isPostalCode(sentDonateInfo.check.zip, 'US')  && !validator.isEmpty(sentDonateInfo.check.state)) {
    if (valid) {res.json({message: "Invalid zip code - must be valid US postal code. Please fix and try again."});}
    valid = false;
  }

  if (valid) {
    DonateInfo
    .findOne({})
    .exec((err, currDonateInfo) => {
      if (err) {
        console.log(err)
        const newError = new Error('An error occured fetching the donate info.');
        res.status(err.status || 404).json({message: newError.message});
      } else if (!currDonateInfo) {
        console.log('No donate info exists - creating new')
        const newDonateInfo = new DonateInfo(sentDonateInfo);
        newDonateInfo.save(function (err, updatedDonateInfo) {
          if (err) {
            console.log(err)
            const newError = new Error('Donate info was not saved.');
            res.status(err.status || 404).json({message: newError.message});
          }
          res.send({message: 'Donate info saved successfully.'});
        });
      } else {
        currDonateInfo.donateTitle = sentDonateInfo.donateTitle;
        currDonateInfo.donateText = sentDonateInfo.donateText;
        currDonateInfo.rewardTitle = sentDonateInfo.rewardTitle;
        currDonateInfo.rewardText = sentDonateInfo.rewardText;
        currDonateInfo.check = sentDonateInfo.check;

        currDonateInfo.save(function (err, updatedDonateInfo) {
          if (err) {
            console.log(err)
            const newError = new Error('Donate info was not saved.');
            res.status(err.status || 404).json({message: newError.message});
          }
          res.send({message: 'Donate info saved successfully.'});
        });
      }
    });
  }
});

router.post('/links', authCheck, (req, res) => {
  let linksSent = req.body;
  let linksValid = true;

  for (var linkKey in linksSent) {
    if (!linksSent.hasOwnProperty(linkKey)) {
      continue;
    }

    let sanitizedLink = xssFilters.inDoubleQuotedAttr(linksSent[linkKey]);

    if (!validator.isURL(sanitizedLink) && sanitizedLink !== '') {
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
          console.log(err)
          const newError = new Error('An error occured fetching the links.');
          res.status(err.status || 404).json({message: newError.message});
        } else if (!currLinks) {
          console.log('No links exist - creating new')
          const newLinks = new Links(linksSent);
          newLinks.save(function (err, updatedLinks) {
            if (err) {
              console.log(err)
              const newError = new Error('Links were not saved.');
              res.status(err.status || 404).json({message: newError.message});
            }
            res.send({message: 'Links saved successfully.'});
          });
        } else {
          currLinks.facebook = linksSent.facebook;
          currLinks.twitter = linksSent.twitter;
          currLinks.donate = linksSent.donate;
          currLinks.save(function (err, updatedLinks) {
            if (err) {
              console.log(err)
              const newError = new Error('Links were not saved.');
              res.status(err.status || 404).json({message: newError.message});
            }
            res.send({message: 'Links saved successfully.'});
          });
        }
      });
    }
});


/// ROUTES - DELETE
router.delete('/committee-members', (req, res) => {
  CommitteeMembers.findByIdAndRemove(req.body.id, (err, deletedCommitteeMember) => {  
    if (err) {
      console.log(err);
      const newError = new Error('Could not delete committee member');
      newError.status = err.status;
      next(newError);
    }
    res.send({'message': `Success! ${deletedCommitteeMember.name} removed.`});
});

});


module.exports = router;
