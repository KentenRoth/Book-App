var mongoose = require('mongoose')

var Book = mongoose.model('Book', {
    title: {
        type: String,
        require: true,
        minlength: 1,
        trim: true
    },

    author: {
        type: String,
        require: true,
        minlength: 1,
        trim: true
    },

    pages: {
        type: Number,
        defualt: 300
    },

    opinion: {
        type: String,
        require: true,
        minlength: 1,
        trim: true
    }

})

model.exports = {
    Book
}