'use strict'

const express = require('express');
const bodyParser  = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.send("hello world");
    // res.sendFile('index.html');
})

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Running on port ${port}`);
});
