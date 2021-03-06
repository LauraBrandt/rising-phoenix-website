"use strict";

// dependencies
const express = require("express");
const router = express.Router();
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const multer  = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// route controllers
const homeController = require("./controllers/home-controller.js");
const newsController = require("./controllers/news-controller.js");
const aboutController = require("./controllers/about-controller.js");
const committeeMembersController = require("./controllers/committee-members-controller.js");
const bylawsController = require("./controllers/bylaws-controller.js");
const calendarController = require("./controllers/calendar-controller.js");
const corporateSponsorsController = require("./controllers/corporate-sponsors-controller.js");
const individualSponsorsController = require("./controllers/individual-sponsors-controller.js");
const donateInfoController = require("./controllers/donate-info-controller.js");
const donateLevelsController = require("./controllers/donate-levels-controller.js");
const linksController = require("./controllers/links-controller.js");
const contactController = require("./controllers/contact-controller.js");

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
  algorithms: ["RS256"]
});


/// ROUTES - GET
router.get("/home", (req, res) => {
  homeController.get(res);
});

router.get("/news", (req, res) => {
  newsController.get(res);
});

router.get("/news/:slug", (req, res) => {
  newsController.getArticle(req.params.slug, res);
});

router.get("/about", (req, res) => {
  aboutController.get(res);
});

router.get("/committee-members", (req, res) => {
  committeeMembersController.get(res);
});

router.get("/bylaws", (req, res) => {
  bylawsController.get(res);
});

router.get("/calendar", (req, res) => {
  calendarController.get(res);
});

router.get("/corporate-sponsors", (req, res) => {
  corporateSponsorsController.get(res);
});

router.get("/individual-sponsors", (req, res) => {
  individualSponsorsController.get(res);
});

router.get("/donate-info", (req, res) => {
  donateInfoController.get(res);
});

router.get("/donate-levels", (req, res) => {
  donateLevelsController.get(res);
});

router.get("/links", (req, res) => {
  linksController.get(res);
});


/// ROUTES - POST
router.post("/home", authCheck, (req, res, next) => {
  homeController.post(req, res, next);
});

router.post("/news", authCheck, upload.single("imageFile"), (req, res, next) => {
  newsController.post(req, res, next);
});

router.post("/about", authCheck, (req, res, next) => {
  aboutController.post(req, res, next);
});

router.post("/committee-members", authCheck, (req, res, next) => {  
  committeeMembersController.post(req, res, next);
});

router.post("/bylaws", authCheck, (req, res, next) => {
  bylawsController.post(req, res, next);
});

router.post("/calendar", authCheck, (req, res, next) => {  
  calendarController.post(req, res, next);
});

router.post("/corporate-sponsors", authCheck, upload.single("logoFile"), (req, res, next) => {
  corporateSponsorsController.post(req, res, next);
});

router.post("/individual-sponsors", authCheck, (req, res, next) => {
  individualSponsorsController.post(req, res, next);
});

router.post("/donate-info", authCheck, (req, res, next) => {
  donateInfoController.post(req, res, next);
});

router.post("/donate-levels", authCheck, (req, res, next) => {
  donateLevelsController.post(req, res, next);
});

router.post("/links", authCheck, (req, res, next) => {
  linksController.post(req, res, next);
});

router.post("/contact", (req, res, next) => {
  contactController.post(req, res, next);
});


/// ROUTES - DELETE
router.delete("/news", authCheck, (req, res, next) => {
  newsController.delete(req, res, next);
});

router.delete("/committee-members", authCheck, (req, res, next) => {
  committeeMembersController.delete(req, res, next);
});

router.delete("/calendar", authCheck, (req, res, next) => {
  calendarController.delete(req, res, next);
});

router.delete("/corporate-sponsors", authCheck, (req, res, next) => {
  corporateSponsorsController.delete(req, res, next);
});

router.delete("/donate-levels", authCheck, (req, res, next) => {
  donateLevelsController.delete(req, res, next);
});


/// ROUTES - PUT
router.put("/news", authCheck, (req, res, next) => {
  newsController.put(req, res, next);
});

router.put("/committee-members", authCheck, (req, res, next) => {
  committeeMembersController.put(req, res, next);
});

router.put("/calendar", authCheck, (req, res, next) => {
  calendarController.put(req, res, next);
});

router.put("/corporate-sponsors", authCheck, (req, res, next) => {
  corporateSponsorsController.put(req, res, next);
});

router.put("/donate-levels", authCheck, (req, res, next) => {
  donateLevelsController.put(req, res, next);
});


module.exports = router;
