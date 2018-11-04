var mongoose = require('mongoose')

var Book = mongoose.model('Book', {
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },

    author: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },

    pages: {
        type: Number,
        default: 300,
    },

    snippet: [{
        snip: {
            type: String,
            required: true,
            minlength: 1,
            trim: true,
        },

        page: {
            type: Number,
            required: true,
            trim: true
        }
    }],

    opinion: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }

})

module.exports = {
    Book
}