'use strict'

// dependencies
const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const multer  = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// route controllers
const committeeMembersHandler = require('./controllers/committee-members-controller.js');
const calendarHandler = require('./controllers/calendar-controller.js');
const corporateSponsorsHandler = require('./controllers/corporate-sponsors-controller.js');
const individualSponsorsHandler = require('./controllers/individual-sponsors-controller.js');
const donateInfoHandler = require('./controllers/donate-info-controller.js');
const donateLevelsHandler = require('./controllers/donate-levels-controller.js');
const linksHandler = require('./controllers/links-controller.js');

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
  committeeMembersHandler.get(res);
});

router.get('/calendar', (req, res) => {
  calendarHandler.get(res);
});

router.get('/corporate-sponsors', (req, res) => {
  corporateSponsorsHandler.get(res);
});

router.get('/individual-sponsors', (req, res) => {
  individualSponsorsHandler.get(res);
});

router.get('/donate-info', (req, res) => {
  donateInfoHandler.get(res);
});

router.get('/donate-levels', (req, res) => {
  donateLevelsHandler.get(res);
});

router.get('/links', (req, res) => {
  linksHandler.get(res);
});


/// ROUTES - POST
router.post('/committee-members', authCheck, (req, res, next) => {  
  committeeMembersHandler.post(req, res, next);
});

router.post('/calendar', authCheck, (req, res, next) => {  
  calendarHandler.post(req, res, next);
});

router.post('/corporate-sponsors', authCheck, upload.single('logoFile'), (req, res, next) => {
  corporateSponsorsHandler.post(req, res, next);
});

router.post('/individual-sponsors', authCheck, (req, res, next) => {
  individualSponsorsHandler.post(req, res, next);
});

router.post('/donate-info', authCheck, (req, res, next) => {
  donateInfoHandler.post(req, res, next);
});

router.post('/donate-levels', (req, res, next) => {
  donateLevelsHandler.post(req, res, next);
});

router.post('/links', authCheck, (req, res, next) => {
  linksHandler.post(req, res, next);
});


/// ROUTES - DELETE
router.delete('/committee-members', authCheck, (req, res, next) => {
  committeeMembersHandler.delete(req, res, next);
});

router.delete('/calendar', authCheck, (req, res, next) => {
  calendarHandler.delete(req, res, next);
});

router.delete('/corporate-sponsors', authCheck, (req, res, next) => {
  corporateSponsorsHandler.delete(req, res, next);
});

  donateLevelsHandler.delete(req, res, next);
});


/// ROUTES - PUT
router.put('/committee-members', authCheck, (req, res, next) => {
  committeeMembersHandler.put(req, res, next);
});

router.put('/calendar', authCheck, (req, res, next) => {
  calendarHandler.put(req, res, next);
});

router.put('/corporate-sponsors', authCheck, (req, res, next) => {
  corporateSponsorsHandler.put(req, res, next);
});

  donateLevelsHandler.put(req, res, next);
});


module.exports = router;
