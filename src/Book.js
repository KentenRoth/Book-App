import React from 'react'
import './Book.css'

const Book = ({title, author, snippet}) => {
    return(
            <div className='card grow'>
                <div>
                    <h2>{title}</h2>
                    <h3>{author}</h3>
                </div>
                <div>
                    <p> Snippets: {snippet} </p>
                </div>
            </div>
    )
}

export default Book