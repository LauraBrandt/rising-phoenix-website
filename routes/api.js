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
const Links = require('../models/links');

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
router.get('/individual-sponsors', (req, res) => {
  IndividualSponsors
    .find({})
    .sort({index: 1})
    .exec((err, sponsors) => {
      if (err) {
        console.log(err)
        const newError = new Error('An error occurred fetching the sponsors.');
        res.status(err.status || 404).json({message: newError.message});
      } else {
        res.send(sponsors);
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
        res.status(err.status || 404).json({message: newError.message});
      } else {
        res.send(links);
      }
    });
});

/// ROUTES - POST
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

router.post('/links', authCheck, (req, res) => {
  let linksSent = req.body;
  let linksValid = true

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

module.exports = router;
