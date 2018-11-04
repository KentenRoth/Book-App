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
        opinion: req.body.opinion,
        snippet: req.body.snippet,
        snip: req.body.snippet.snip,
        page: req.body.snippet.page
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
    var id = req.params.id

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Book.findById(id).then((book) => {
        if (!book) {
            return res.status(404).send()
        } else {
            res.send({book})
        }
    }, (e) => {
        res.status(400).send()
    })
})

app.delete('/books/:id', (req, res) => {
    var id = req.params.id

    if(!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Book.findByIdAndRemove(id).then((book) => {
        if (!book) {
            return res.status(404).send()
        } else {
            res.send({book})
        }
    }, (e) => {
        res.status(400).send()
    })
})


app.patch('/books/:id', (req, res) => {
    var id = req.params.id
    const {title, author, pages, opinion, snippet} = req.body
    const {snip, page} = req.body.snippet

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

        Book.findByIdAndUpdate(id, {$set: 
            {title: title, author: author, opinion: opinion, pages: pages, snippet: snippet}}, {new: true} ).then((book) => {
            if(!book) {
                return res.status(404).send()
            }

            res.send({book})
        }).catch((e) => {
            res.status().send()
        })

        Book.findByIdAndUpdate(id, {$push: {snip: snip, page: page}}, {new: true}).then((book) => {
            if(!book) {
                return res.status(404).send()
            }

            res.send({book})
        }).catch((e) => {
            res.status().send()
        })
})

app.listen(port, () => {
    console.log(`Started up at port ${port}`)
});

module.exports = { app }