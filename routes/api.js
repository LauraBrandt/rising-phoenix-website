'use strict'

const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

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

// temporary, delete after development
router.get('/', authCheck, (req, res) => {
  res.send("api route");
});

module.exports = router;
