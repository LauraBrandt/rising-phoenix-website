"use strict";

const News = require("../../models/news");

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
    News
      .find({})
      .sort({index: 1})
      .exec((err, newsStories) => {
        if (err) {
          console.log(err);
          const newError = new Error("An error occurred fetching the news stories.");
          res.status(err.status || 404).json({error: newError.message});
        } else {
          res.send(newsStories);
        }
      });
  },

  getArticle: (slug, res) => {
    News
      .findOne({ slug })
      .exec((err, article) => {
        if (err) {
          console.log(err);
          const newError = new Error("An error occurred fetching the article.");
          res.status(err.status || 500).json({error: newError.message});
        } else if (!article) {
          const newError = new Error("Could not find the article.");
          res.status(404).json({error: newError.message});
        } else {
          res.send(article);
        }
      });
  },

  put: (req, res, next) => {
    const sentNews = req.body;
    const totalDocs = sentNews.length;
    let docsUpdated = 0;
  
    for (let i=0; i<totalDocs; i++) {
      News.findByIdAndUpdate(sentNews[i]._id, {index: sentNews[i].index}, {new: true}, (err, updatedNews) => { // eslint-disable-line no-unused-vars
        if (err) {
          console.log(err);
          const newError = new Error("Could not update news stories.");
          newError.status = err.status;
          next(newError);
        }
        docsUpdated += 1;
        if (docsUpdated === totalDocs) {
          res.send({"message": "Success! News stories reordered."});
        }
      });
    }
  },

  post: (req, res, next) => {
    let sentNews = req.body;
    let sentFile = req.file;
    let image = sentFile ? sentFile.originalname : sentNews.image ? sentNews.image : "";
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

    if (sentNews.index !== "" && !validator.isInt(sentNews.index.toString())) {
      const newError = new Error("Index is not a valid number. Please try again.");
      valid = false;
      next(newError);
    }
    sentNews.title = validator.trim(xssFilters.inHTMLData(sentNews.title));
    sentNews.title = validator.isLength(sentNews.title, {min:0, max: 100}) ? sentNews.title : sentNews.title.substring(0,100);
    sentNews.alt = validator.trim(xssFilters.inDoubleQuotedAttr(sentNews.alt));
    sentNews.alt = validator.isLength(sentNews.alt, {min:0, max: 100}) ? sentNews.alt : sentNews.alt.substring(0,100);
      
    if (valid) {
      if (sentNews._id) {
        // already existing news story, need to update
        const updateObj = {
          title: sentNews.title,
          image: image,
          alt: sentNews.alt,
          article: sentNews.article
        };
        News.findByIdAndUpdate(sentNews._id, updateObj, {new: true}, (err, updatedNewsStory) => {
          console.log("updating news story...");
          if (err) {
            console.log(err);
            const newError = new Error("Could not update news story.");
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
              res.send({"message": `Success! ${updatedNewsStory.title} saved.`});
            });
          } else {
            res.send({"message": `Success! ${updatedNewsStory.title} saved.`});
          }
        });
      } else {
        // new news story, need to create
        let newNewsStory = new News({
          title: sentNews.title,
          image: image,
          alt: sentNews.alt,
          article: sentNews.article,
          index: sentNews.index
        });
        newNewsStory.save((err, createdNewsStory) => {
          console.log("creating news story...");
          if (err) {
            console.log(err);
            const newError = new Error("Could not create news story.");
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
              res.send({"message": `Success! ${createdNewsStory.title} saved.`});
            });
          } else {
            res.send({"message": `Success! ${createdNewsStory.title} saved.`});
          }
        });
      }
    }
  },

  delete: (req, res, next) => {
    News.findByIdAndRemove(req.body.id, (err, deletedNews) => {  
      if (err) {
        console.log(err);
        const newError = new Error("Could not delete news story.");
        newError.status = err.status;
        next(newError);
      }
      res.send({"message": `Success! ${deletedNews.title} removed.`});
    });
  }
};