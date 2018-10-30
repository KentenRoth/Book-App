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

app.post('/books', (req, res) => {
    var book = new Book({
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
        opinion: req.body.opinion
    })

    book.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e)
    })
})

app.get('/books', (req, res) => {
    Book.find().then((books) => {
        res.send({books})
    }, (e) => {
        res.status(400).send(e)
    })
})

app.get('/books/:id', (req, res) => {

})

app.delete('/books/:id', (req, res) => {
    
})

app.listen(port, () => {
    console.log(`Started up at port ${port}`)
});

module.exports = { app }