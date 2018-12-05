import React from 'react'
import Book from './Book'

const BookList = ({ books }) => {
    const readBooks = () => {
        Object.values(books).map((readingList, i) => {
            console.log(books)
            return(<Book
                    key={books[i]._id}
                    id={books[i]._id}
                    title={books[i].title}
                    pages={books[i].pages}
                />)
        })
        
    }
    return (
        <div>
            {readBooks()}
            
        </div>
        

        // <div>

        //     {Object.keys(books).map((readingLists, i) => {
        //         return (<Book 
        //             key={books[i]._id}
        //             id={books[i]._id}
        //             title={books[i].title}
        //             pages={books[i].pages} />)
        //     })}
        // </div>
    )
}

export default BookList
