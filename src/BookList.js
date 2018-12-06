import React from 'react'
import Book from './Book'

const BookList = ({ books }) => {

    return (
        <div>
            { books.map((book) => {
                return(<Book
                    key={books._id} 
                    id={books._id}
                    title={books.title}
                    author={books.author}
                    />)
            })}
            {console.log(books.title)}
        </div>
    )
}

export default BookList
