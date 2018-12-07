import React from 'react'
import Book from './Book'

const BookList = ({ books }) => {

    return (
        <div>
            { books.map((book, i) => {
                return(<Book
                    key={books[i]._id} 
                    id={books[i]._id}
                    title={books[i].title}
                    author={books[i].author}
                    />)
            })}
        </div>
    )
}

export default BookList
