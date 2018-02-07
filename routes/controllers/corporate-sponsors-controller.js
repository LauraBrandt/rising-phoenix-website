"use strict";

const CorporateSponsors = require("../../models/corporateSponsors");

const aws = require("aws-sdk");
const xssFilters = require("xss-filters");
const validator = require("validator");

aws.config.update({
  accessKeyId: process.env.AWS_ACCESSKEYID,
  secretAccessKey: process.env.AWS_SECRETACCESSKEY,
  subregion: "us-east-2",
});
const s3 = new aws.S3();

module.exports = {
  get: (res) => {
    CorporateSponsors
      .find({})
      .sort({index: 1})
      .exec((err, corporateSponsors) => {
        if (err) {
          console.log(err);
          const newError = new Error("An error occurred fetching the sponsors.");
          res.status(err.status || 404).json({error: newError.message});
        } else {
          res.send(corporateSponsors);
        }
      });
  },

  put: (req, res, next) => {
    const corporateSponsors = req.body;
    const totalDocs = corporateSponsors.length;
    let docsUpdated = 0;
  
    for (let i=0; i<totalDocs; i++) {
      CorporateSponsors.findByIdAndUpdate(corporateSponsors[i]._id, {index: corporateSponsors[i].index}, {new: true}, (err, updatedCorporateSponsor) => { // eslint-disable-line no-unused-vars
        if (err) {
          console.log(err);
          const newError = new Error("Could not update index.");
          newError.status = err.status;
          next(newError);
        }
        docsUpdated += 1;
        if (docsUpdated === totalDocs) {
          res.send({"message": "Success! Corporate sponsors reordered."});
        }
      });
    }
  },

  post: (req, res, next) => {
    let sentSponsor = req.body;
    let sentFile = req.file;
    let logo = sentFile ? sentFile.originalname : sentSponsor.logo ? sentSponsor.logo : "";
    let valid = true;

    let awsParams;
    if (sentFile) {
      awsParams = {
        Bucket: "risingphoenix",
        Key: sentFile.originalname,
        Body: sentFile.buffer,
        Expires: 60,
        ACL: "public-read",
        ContentType: sentFile.mimetype,
      };
    }

    sentSponsor.name = validator.trim(xssFilters.inHTMLData(sentSponsor.name));
    sentSponsor.name = validator.isLength(sentSponsor.name, {min:0, max: 100}) ? sentSponsor.name : sentSponsor.name.substring(0,100);
    sentSponsor.link = validator.trim(xssFilters.inDoubleQuotedAttr(sentSponsor.link));
    if (!validator.isEmpty(sentSponsor.link) && !validator.isURL(sentSponsor.link)) {
      const newError = new Error("Not a valid URL. Please try again.");
      valid = false;
      next(newError);
    } else if (!validator.isLength(sentSponsor.link, {min:0, max: 150})) {
      const newError = new Error("Link exceeds maximum length (150 characters)");
      valid = false;
      next(newError);
    }
    if (sentSponsor.index !== "" && !validator.isInt(sentSponsor.index.toString())) {
      const newError = new Error("Index is not a valid number. Please try again.");
      valid = false;
      next(newError);
    }

    if (valid) {
      if (sentSponsor._id) {
        // already existing sponsor, need to update
        const updateObj = {
          name: sentSponsor.name,
          link: sentSponsor.link,
          logo: logo
        };
        CorporateSponsors.findByIdAndUpdate(sentSponsor._id, updateObj, {new: true}, (err, updatedCorporateSponsor) => {
          console.log("updating sponsor...");
          if (err) {
            console.log(err);
            const newError = new Error("Could not update sponsor.");
            newError.status = err.status;
            next(newError);
          }
          if (sentFile) {
            s3.putObject(awsParams, (err, data) => {  // eslint-disable-line no-unused-vars
              if (err) {
                console.log(err);
                const newError = new Error("Could not upload image.");
                newError.status = err.status;
                next(newError);
              }
              res.send({"message": `Success! ${updatedCorporateSponsor.name} saved.`});
            });
          } else {
            res.send({"message": `Success! ${updatedCorporateSponsor.name} saved.`});
          }
        });
      } else {
        // new sponsor, need to create
        let newCorporateSponsor = new CorporateSponsors({
          name: sentSponsor.name,
          link: sentSponsor.link,
          logo: logo,
          index: sentSponsor.index
        });
        newCorporateSponsor.save((err, createdCorporateSponsor) => {
          console.log("creating sponsor...");
          if (err) {
            console.log(err);
            const newError = new Error("Could not create sponsor.");
            newError.status = err.status;
            next(newError);
          }
          if (sentFile) {
            s3.putObject(awsParams, (err, data) => { // eslint-disable-line no-unused-vars
              if (err) {
                console.log(err);
                const newError = new Error("Could not upload image.");
                newError.status = err.status;
                next(newError);
              }
              res.send({"message": `Success! ${createdCorporateSponsor.name} saved.`});
            });
          } else {
            res.send({"message": `Success! ${createdCorporateSponsor.name} saved.`});
          }
        });
      }
    }
  },

  delete: (req, res, next) => {
    CorporateSponsors.findByIdAndRemove(req.body.id, (err, deletedCorporateSponsor) => {  
      if (err) {
        console.log(err);
        const newError = new Error("Could not delete sponsor.");
        newError.status = err.status;
        next(newError);
      }
      res.send({"message": `Success! ${deletedCorporateSponsor.name} removed.`});
    });
  }
};