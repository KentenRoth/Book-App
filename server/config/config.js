var env = process.env.NODE_ENV || 'development'

if (env === 'development') {
    process.env.PORT = 3000
    process.env.MONGODB_URI = 'mongodb://localhost:27017/BookApp', { useNewUrlParser: true }
} else if (env === 'test') {
    process.env.PORT = 3000
    process.env.MONGODB_URI = 'mongodb://localhost:27017/BookAppTest', { useNewUrlParser: true }
}