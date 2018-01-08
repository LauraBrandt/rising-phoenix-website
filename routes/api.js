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

/// ROUTES
router.get('/individual-sponsors', (req, res) => {
  IndividualSponsors.find((err, sponsors) => {
    if (err) {
      res.send({ 'error': 'An error has occured' });
    } else {
      res.send(sponsors);
    }
  });
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
      console.log(err);
      res.send({'message': 'There was a problem with your request.'});
    }
    IndividualSponsors.create(sponsors, (err, docs) => {
      if (err) {
        console.log(err);
        res.send({'message': 'There was a problem with your request.'});
      }
      res.send({'message': `Success! ${docs.length} sponsors saved.`})
    });
  });
});

module.exports = router;
