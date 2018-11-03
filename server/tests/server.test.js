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