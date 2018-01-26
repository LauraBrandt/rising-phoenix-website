"use strict";

const nodemailer = require("nodemailer");
const validator = require("validator");

module.exports = {
  post: (req, res, next) => {    
    
    if (!validator.isEmail(req.body.email)) {
      res.json({message: "Please enter a valid email address."});
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.REACT_APP_CONTACT_EMAIL,
        pass: process.env.REACT_APP_CONTACT_PASSWORD
      }
    });

    const from = req.body.name ? `"${req.body.name}" <${req.body.email}>` : req.body.email;
    const mailOptions = {
      from: from,
      to: process.env.REACT_APP_CONTACT_EMAIL,
      subject: req.body.subject,
      text: req.body.message
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.json({message: "Sorry, there was a problem sending your message. Please try again later."});
      } else {
        console.log(info);
        res.json({message: "Your message has been sent!"});
      }
    });
  }
};