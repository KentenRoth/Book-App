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
        default: 300,
        require: true
    },

    opinion: {
        type: String,
        require: true,
        minlength: 1,
        trim: true
    }

})

module.exports = {
    Book
}