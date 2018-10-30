require('./config/config')

const _ = require('lodash')
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb')

var { mongoose } = require('./db/mongoose');
var { Book } = require('./models/book');

var app = express();
const port = process.env.PORT

app.use(bodyParser.json());


app.listen(port, () => {
    console.log(`Started up at port ${port}`)
});

module.exports = { app }