const request = require('supertest')
const expect = require('expect')
const { ObjectID } = require('mongodb')

const { app } = require('./../server')
const { Book } = require('./../models/book')

const books = [{
    _id: new ObjectID(),
    title: 'Book 1',
    author: 'Author 1',
    pages: 100,
    opinion: 'great',
    snippet: [{
        snip: 'great job',
        page: 5
    }]
}, {
    _id: new ObjectID(),
    title: 'Book 2',
    author: 'Author 2',
    pages: 200,
    opinion: 'terrible',
    snippet: [{
        snip: 'bad job',
        page: 10
    }]
}]

beforeEach((done) => {
    Book.deleteMany({}).then(() => {
        return Book.insertMany(books)
    }).then(() => done())
})

describe('POST /books', () => {
    it('should create a new book',(done) => {
        var title = 'New Book'
        var author = 'New Author'
        var opinion = 'Meh'
        var snippet = []

        request(app)
            .post('/books')
            .send({title, author, opinion, snippet})
            .expect(200)
            .expect((res) => {
                expect(res.body.title).toBe(title)
                expect(res.body.author).toBe(author)
                expect(res.body.opinion).toBe(opinion)
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                Book.find({title}).then((books) => {
                    expect(books.length).toBe(1)
                    expect(books[0].title).toBe(title)
                    done()
                }).catch((e) => done(e))
            })
    })

    it('should not create book with invalid data', (done) => {
        var snippet = []
        request(app)
            .post('/books')
            .send({snippet})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                Book.find().then((books) => {
                    expect(books.length).toBe(2)
                    done()
                }).catch((e) => done(e))
            })

    })
})

describe('GET /books', () => {
    it('should get all books', (done) => {
        request(app)
            .get('/books')
            .expect(200)
            .expect((res) => {
                expect(res.body.books.length).toBe(2)
            })
            .end(done)
    })
}) 

describe('GET /books/:id', () => {
    it('should return todo doc', (done) => {
        var hexID = books[0]._id.toHexString()
        request(app)
            .get(`/books/${hexID}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.book.title).toBe(books[0].title)
            })
            .end(done)
    })

    it('should return 404 if book is not found', (done) => {
        var hexID = new ObjectID().toHexString()

        request(app) 
            .get(`/books/${hexID}`)
            .expect(404)
            .end(done)
    })

    it('should return 404 if invalid ID', (done) => {
        request(app)
            .get('/books/123')
            .expect(404)
            .end(done)
    })
})

describe('DELETE /books/:id', () => {
    it('should remove a book', (done) => {
        var hexID = books[0]._id.toHexString()

        request(app)
            .delete(`/books/${hexID}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.book._id).toBe(hexID)
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                Book.findById(hexID).then((book) => {
                    expect(book).toNotExist()
                    done()
                }).catch((e) => done(e))
            })
    })

    it('should return 404 if book is not found', (done) => {
        var hexID = new ObjectID().toHexString()

        request(app)
            .delete(`/books/${hexID}`)
            .expect(404)
            .end(done)
    })

    it('should return 404 if ID is not valid', (done) => {
        request(app)
            .delete(`/books/123`)
            .expect(404)
            .end(done)
    })
})

describe('PATCH /books/:id', () => {
    it('should update the book', (done) => {
        var hexID = books[0]._id.toHexString()
        var title = "Book 3"
        var author = "Author 3"
        var pages = 300
        var opinion = "Great 3"
        var snippet = []

        request(app)
            .patch(`/books/${hexID}`)
            .send({
                title,
                author,
                pages,
                opinion,
                snippet
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.book.title).toBe(title)
                expect(res.body.book.author).toBe(author)
                expect(res.body.book.pages).toBe(pages)
                expect(res.body.book.opinion).toBe(opinion)
            })
            .end(done)
    })
})