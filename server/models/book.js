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

    snippet: [{
        snip: {
            type: String,
            require: true,
            minlength: 1,
            trim: true,
            default: 'Hello',
        },

        page: {
            type: Number,
            require: true,
            trim: true
        }
    }],

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